const WebSocket = require('ws');
const jwt = require('jsonwebtoken');
const {addNewPost} = require('./postSocket');
const {addNewPending, acceptCollaboration, denyCollaboration} = require('./collaborationSocket');
const {addNewNotification, acceptNotification, denyNotification} = require('./notificationSocket');
const {requestFollower, getMe} = require('./userSocket');

const setupWebSocketServer = () => {
    const wss = new WebSocket.Server({ port: 5001 });
    wss.on('connection', (ws, req) => {
        const token = req.url.split('token=')[1].split('%20')[1];
            if (token) {
                jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                    if (err) {
                        console.log('Token verification failed:', err);
                        ws.close();
                        return;
                    }
                ws.userId = decoded.id;
            });
        }
        console.log('Client connected');
        ws.on('message', async (message) => {
            const request = JSON.parse(message);
            const {type, data} = request;
            switch(type) {
                case 'new-post':
                    const newPost = await addNewPost({...data, authorId: ws.userId});
                    if(newPost) {
                        boardCast(wss, type, newPost);
                    }
                    break;
                case 'collaborate-pending':
                    const newPending = await addNewPending({...data, senderId: ws.userId});
                    const notification = {
                        senderId: newPending.senderId,
                        receiverId: newPending.receiverId,
                        type: "CollaborationRequest",
                        isRead: false,
                        message: newPending.message,
                        createdAt: newPending.createdAt,
                        collaborationId: newPending._id
                    };
                    const newNotification = await addNewNotification(notification);
                    if(newPending && newNotification) {
                        broadCastToMe(ws, "collaborate-pending", newPending);
                        broadCastToOther(wss, "receive-notification", newNotification, newNotification.notification.receiverId);
                    }
                    break;
                case 'collaboration-accept':
                    const updatedCollaboration = await acceptCollaboration(data);
                    const updatedNotificationForMe = await acceptNotification(data);
                    const notificationCollaborationAccept = {
                        senderId: updatedCollaboration.receiverId,
                        receiverId: updatedCollaboration.senderId,
                        type: "CollaborationRequest",
                        isRead: false,
                        message: updatedNotificationForMe.message,
                        createdAt: updatedNotificationForMe.createdAt,
                        collaborationId: updatedNotificationForMe.collaborationId,
                        status: "Accepted",
                        isReturened: true,
                    };
                    
                    const newNotificationToYou = await addNewNotification(notificationCollaborationAccept);
                    console.log('newNotificationToYou', newNotificationToYou)
                    if(updatedCollaboration && updatedNotificationForMe && newNotificationToYou) {
                        broadCastToOther(wss, 'receive-notification', newNotificationToYou, newNotificationToYou.notification.receiverId);
                        broadCastToMe(ws, 'collaboration-accept', {updatedCollaboration, updatedNotificationId: updatedNotificationForMe._id});
                    }
                    break;
                case 'collaboration-deny':
                    const updatedCollaborationDeny = await denyCollaboration(data);
                    const updatedNotificationDenyForMe = await denyNotification(data);
                    const notificationCollaborationDeny = {
                        senderId: updatedNotificationDenyForMe.receiverId,
                        receiverId: updatedNotificationDenyForMe.senderId,
                        type: "CollaborationRequest",
                        isRead: false,
                        message: updatedNotificationDenyForMe.message,
                        createdAt: updatedNotificationDenyForMe.createdAt,
                        collaborationId: updatedNotificationDenyForMe.collaborationId,
                        status: "Declined",
                        isReturened: true,
                    };
                    const newNotificationDenyToYou = await addNewNotification(notificationCollaborationDeny);
                    if(updatedCollaborationDeny && updatedNotificationDenyForMe && newNotificationDenyToYou) {
                        broadCastToOther(wss, 'receive-notification', newNotificationDenyToYou, newNotificationDenyToYou.notification.receiverId);
                        broadCastToMe(ws, 'collaboration-declined', {updatedCollaborationDeny, updatedNotificationId: updatedNotificationDenyForMe._id});
                    }
                    break;
                case 'request-followers':
                    const updatedOtherUserByRequestFollower = await requestFollower(data.otherId, ws.userId);
                    const notificationForRequestFollower = {
                        senderId: ws.userId,
                        receiverId: updatedOtherUserByRequestFollower._id,
                        type: "NewMessage",
                        message: `${data.myName} became your follower`,
                        isRead: false,
                    };
                    const newNotificationForRequestFollower = await addNewNotification(notificationForRequestFollower);
                    if(updatedOtherUserByRequestFollower && newNotificationForRequestFollower) {
                        broadCastToOther(wss, "get-followers-request", {notification: newNotificationForRequestFollower, updatedUser: updatedOtherUserByRequestFollower}, updatedOtherUserByRequestFollower._id);
                        broadCastToMe(ws, "request-followers", updatedOtherUserByRequestFollower);
                    }
                    break;
                default:
                    return;
            }
        });

        ws.on('close', () => {
            console.log('Client disconnected');
        });
    });
};

const boardCast = (wss, type, data) => {
    wss.clients.forEach(socket => {
        socket.send(JSON.stringify({type, data}));
    });
};

const broadCastToMe = (ws, type, data) => {
    ws.send(JSON.stringify({type, data}));
}

const broadCastToOther = (wss, type, data, receiverId) => {
    const receiverIdString= receiverId.toString();
    console.log();
    wss.clients.forEach(socket => {
        if(socket.userId === receiverIdString) {
            socket.send(JSON.stringify({type, data}));
        }
    });
}

module.exports = setupWebSocketServer;