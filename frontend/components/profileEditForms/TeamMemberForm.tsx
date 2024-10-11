import React from "react";
import { AvatarUpload, InputGroup } from "../common";
import { InputItem } from "../common/inputGroup";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { FaTrash } from "react-icons/fa";
import { deleteTeamAvatar } from "@/lib/api";
import {clearFileUrl  } from "@/store/slices/tempSlice";

interface TeamMemberFormProps {
    setLoading: (loading: boolean) => void; 
    items: InputItem[];
}


export const TeamMemberForm: React.FC<TeamMemberFormProps> = ({setLoading, items}) => {

    const dispatch = useDispatch();
    const temp = useSelector((state: RootState) => state.temp);    
    const handleRemoveAvatar = async () => {
        try {
            const splitedFileName = temp.fileUrl?.split('/');
            if(splitedFileName) {
                setLoading(true);
                const filename = splitedFileName[splitedFileName.length - 1];
                const response = await deleteTeamAvatar(filename);
                if(response.ok) {
                    dispatch(clearFileUrl());
                }
            }
        }catch (err) {

        }finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col">
                <div 
                    className="flex flex-col items-center justify-center w-32 h-32 bg-gray-300 rounded-full group bg-no-repeat bg-cover bg-center"
                    style={{
                        backgroundImage: temp.fileUrl ? `url(${temp.fileUrl})` : 'none'
                    }}        
                >
                    {!temp.fileUrl && <AvatarUpload setLoading={setLoading} flag="addteam" />}
                </div>
                {temp.fileUrl && 
                        <div className="w-full text-right">
                            <button className="p-2 bg-[#1E1E1E] text-white rounded-full hover:bg-black" onClick={handleRemoveAvatar}><FaTrash size={10} /></button>
                        </div>
                }
            </div>
            <div className="w-full px-8 flex flex-col items-center justify-center">
                <InputGroup items={items} />
            </div>
        </div>
    );
}