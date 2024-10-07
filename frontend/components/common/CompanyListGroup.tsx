import React from "react";
import Image, {StaticImageData} from "next/image";

export type CompanyItem = {
    name: string;
    avatar: StaticImageData | null;
}

export type CompanyItemGroup = {
    groupName: string;
    companies: CompanyItem[];
}

interface CompanyListGroupProps {
    items: CompanyItemGroup[];
}

export const CompanyListGroup: React.FC<CompanyListGroupProps> = ({items}) => {
    return (
        <>
            {items.map((item, index) => (
                <div className="mt-10" key={index}>
                    <span className={`px-5 py-2 tag-border-${item.groupName} rounded-md`}>#{item.groupName}</span>
                    {item.companies.map((company, index) => (
                        <div className="flex items-center mt-4 first:mt-8 cursor-pointer hover:bg-[#fff7f7] rounded-lg p-2" key={index}>
                            {company.avatar ? 
                                <span className="flex flex-col items-center justify-center w-12 h-12 bg-[#0A0B1A] rounded-full">
                                    <Image src={company.avatar} alt={company.name} />
                                </span>
                                :
                                <span className="flex flex-col items-center justify-center w-12 h-12 bg-[#D9D9D9] rounded-full"></span>
                            }
                            <span className="font-poppins font-light text-md ml-4">{company.name}</span>
                        </div>
                    ))}
                </div>
            ))}
        </>
    );
} 