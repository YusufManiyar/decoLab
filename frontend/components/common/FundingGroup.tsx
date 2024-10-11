import React from "react";
import { TagBadge } from "./TagBadge";

export type FundingItem = {
    name: string;
    badgeName: string;
    key: string;
}

interface FundingProps {
    items: FundingItem[];
}

export const FundingGroup: React.FC<FundingProps> = ({items}) => {
    return (
        <>
            { items.map((item, index) => (
                <div className="flex justify-between mt-4" key={index}>
                    <span className="text-sm font-poppins font-medium">{item.name}</span>
                    <TagBadge name={item.badgeName} />
                </div>
            ))}
        </>
    );
}