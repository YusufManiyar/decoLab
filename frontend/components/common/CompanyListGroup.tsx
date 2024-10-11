import React from "react";
import type { CompaniesGroup } from "@/store/slices/companySlice";
import Link from "next/link";

interface CompanyListGroupProps {
    items: CompaniesGroup[];
}

export const CompanyListGroup: React.FC<CompanyListGroupProps> = ({items}) => {
    return (
        <>
            {items.length > 0 && items.map((item, index) => (
                <div className="mt-10" key={index}>
                    <span className={`px-5 py-2 tag-border-${item.group.split('#')[1]} rounded-md`}>{item.group}</span>
                    {item.companies.map((company, index) => (
                        <Link href={`/profile/${company._id}`} className="flex items-center mt-4 first:mt-8 cursor-pointer notification-transition hover:bg-[#b9b9b9] rounded-lg p-2" key={index}>
                            {company.logo ? 
                                <span 
                                    className="flex flex-col items-center justify-center w-12 bg-no-repeat bg-center bg-cover h-12 rounded-full"
                                    style={{backgroundImage: `url(${company.logo})`}}
                                >
                                </span>
                                :
                                <span className="flex flex-col items-center justify-center w-12 h-12 bg-[#D9D9D9] rounded-full"></span>
                            }
                            <span className="font-poppins font-light text-md ml-4">{company.name}</span>
                        </Link>
                    ))}
                </div>
            ))}
        </>
    );
} 