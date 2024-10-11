import React from "react";

export type InputItem = {
    label: string;
    type: string;
    name: string;
    value: string;
    isValid: boolean;
    validation: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export interface InputGroupItems {
    items: InputItem[];
};


export const InputGroup: React.FC<InputGroupItems> = ({items}) => {
    return (
       <>
            { 
                items.map((item, index) => (
                    <div key={index} className="flex flex-col mt-2 w-full">
                        <label className="text-black text-sm mb-1 font-poppins font-light">{item.label}</label>
                        <input 
                            type={item.type} 
                            name={item.name} 
                            value={item.value} 
                            onChange={item.handleChange}
                            className={`p-2 rounded-md outline-none ${item.isValid === true ? 'border-invalid' : 'border-primary'}`} 
                        />
                        {item.isValid ? <div className="text-red-500 text-sm">{item.validation}</div>: <></>}
                    </div>
                ))
            }
           
            </>
    );
};