import React from "react";
import { InputGroup, InputItem } from "../common/inputGroup";

interface SocialFormProps {
    items: InputItem[];
}

export const SocialForm: React.FC<SocialFormProps> = ({items}) => {
    return (
        <div className="flex flex-col justify-center">
            <InputGroup items={items} />
        </div>
    );
}