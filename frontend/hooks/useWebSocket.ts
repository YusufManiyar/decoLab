import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { pushPost, updatePostToCollaboration } from '@/store/slices/postSlice';
import { RootState } from '@/store/store';
import { addUnreadAllNotificationCount, addUnreadCollaborationNotificationCount, pushNotification } from '@/store/slices/notificatonSlice';

export const useWebSocket = () => {
    const dispatch = useDispatch();
    const userData = useSelector((state: RootState) => state.user.userData);
    const socketRef = useRef<WebSocket | null>(null);
    useEffect(() => {
        const token = localStorage.getItem("token");
        socketRef.current = new WebSocket(`ws://localhost:5001/token=${token}`);

        const handleMessage = (event: MessageEvent) => {
            try {
                const { type, data } = JSON.parse(event.data);
                switch(type) {
                    case "new-post":
                        dispatch(pushPost(data));
                        break;
                    case "collaborate-pending":
                        dispatch(updatePostToCollaboration(data.postId));
                        break;
                    case "receive-collaboration-request":
                        dispatch(pushNotification(data));
                        dispatch(addUnreadAllNotificationCount());
                        dispatch(addUnreadCollaborationNotificationCount());
                        break;
                    default:
                        return;
                }
            } catch (error) {
                console.error('Error parsing message:', error);
            }
        };

        socketRef.current.onmessage = handleMessage;

        return () => {
            if (socketRef.current) {
                socketRef.current.close();
                socketRef.current = null;
            }
        };
    }, []);

    const sendMessage = (message: object) => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify(message));
        }
    };

    return { sendMessage };
};