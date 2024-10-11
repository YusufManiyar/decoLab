import React, {useRef } from 'react';
import axios from 'axios';
import { FaPen } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { updateLogo } from '@/store/slices/userSlice';
import { setFileUrl } from '@/store/slices/tempSlice';


export const AvatarUpload: React.FC<{setLoading: (loading: boolean) => void, flag: string}> = ({setLoading, flag}) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const dispatch = useDispatch();

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            setLoading(true);
            const formData = new FormData();
            try {
                const token = localStorage.getItem("token");
                if(flag === "me") {
                    formData.append('logo', file);
                    const response = await axios.post(`http://localhost:5000/api/user/upload-avatar`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: token,
                        },
                    });
                    if(response.data.ok) {
                        dispatch(updateLogo(response.data.logoUrl));
                    }
                }
                if(flag === "addteam") {
                    formData.append('team', file);
                    const response = await axios.post(`http://localhost:5000/api/user/upload-team-avatar`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: token,
                        },
                    });
                    if(response.data.ok) {
                        dispatch(setFileUrl(response.data.url));
                    }
                }
                
            } catch (error) {
                console.error("Error uploading file:", error);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleIconClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className='w-full flex items-center justify-center'>
            <input 
                type="file" 
                accept="image/*" 
                className="hidden"
                onChange={handleFileChange} 
                ref={fileInputRef}
            />
            <span className='cursor-pointer' onClick={handleIconClick}>
                <FaPen size={15} />
            </span>
        </div>
    );
};