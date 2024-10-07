import React, { ChangeEvent, useState } from "react";
import { NextPage } from "next";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { MultiSelect, SearchBar, CompanyItemGroup, CompanyListGroup } from "@/components/common";
import { PostGroup, PostItem } from "@/components/collaborationPost";
import Logo from "../public/assets/Screenshot_2023-03-28_at_5.04 1.png";
import {FaHome} from "react-icons/fa";
import {MdMessage, MdNotifications} from "react-icons/md";

const styles = {
    container: "flex flex-col p-20",
    menuContainer: "flex items-center gap-4 group", 
    menuText: "font-poppins font-light text-xl text-gray-400 group-hover:text-black transition-colors duration-200",
    menuIcon: "text-gray-400 w-6 h-6 group-hover:text-black transition-colors duration-200",
};

const tags = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

const posts: PostItem[] = [
    {
        companyName: "GotBit", 
        companyAvatar: Logo, 
        followers: "10.2k", 
        views: "18,000", 
        content: "We are working on a project which lets companies collaborate with each other, would love to collaborate on the marketing",
        tags: ["#Marketing", "#Web3", "#DeFi"],
        isClosed: true,
        timeframe: "2 months"
    },
    {
        companyName: "GotBit", 
        companyAvatar: Logo, 
        followers: "10.2k", 
        views: "18,000", 
        content: "We are working on a project which lets companies collaborate with each other, would love to collaborate on the marketing",
        tags: ["#Marketing", "#Web3", "#DeFi"],
        isClosed: false,
        timeframe: "2 months"
    }
];

const companyListGroup: CompanyItemGroup[] = [
    {
        groupName: "defi",
        companies: [
            {name: "Zerodha Inc.", avatar: null},
            {name: "Superset Ltd.", avatar: null},
            {name: "PrimeXBT", avatar: null},
        ]
    },
    {
        groupName: "Marketing",
        companies: [
            {name: "BoAt", avatar: null},
            {name: "BoAt", avatar: null},
            {name: "Zerodha Inc.", avatar: null},
        ]
    },
    {
        groupName: "DeFi",
        companies: [
            {name: "BoAt", avatar: null},
            {name: "BoAt", avatar: null},
            {name: "Zerodha Inc.", avatar: null},
        ]
    },
];

const Dashboard: NextPage = () => {
    
    const [search, setSearch] = useState<string>('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [timeframe, setTimeframe] = useState<string>('');

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;
        setSearch(value);
    }

    const handleSelectionChange = (selected: string[]) => {
        setSelectedTags(selected);
        console.log('Selected options:', selected);
    };

    const handleTimeframeChange = (e: ChangeEvent<HTMLInputElement>) => setTimeframe(e.target.value);

    return (
        <div className={styles.container}>
            <div className="flex flex-row gap-10 items-center">
                <div className="basis-1/6 flex flex-col">
                    <h1 className="font-poppins font-medium text-4xl text-right">DeCollab</h1>
                </div>
                <div className="basis-2/3">
                    <SearchBar value={search} onChange={handleSearchChange} />
                </div>
                <div className="basis-1/6">
                    <Link href="/profile">
                        <div className="flex items-center justify-center gap-4">
                            <span className="flex flex-col items-center justify-center font-poppins font-light text-xl">Profile</span>
                            <span className="flex flex-col items-center justify-center w-16 h-16 bg-[#0A0B1A] rounded-full">
                                <Image src={Logo} alt="logo" />
                            </span>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="flex flex-row gap-10 mt-10 h-[100vh]">
                <div className="basis-1/6 flex flex-col border-dashboard px-4 py-10 rounded-md">
                    <Link href="/dashboard" className={styles.menuContainer}>
                        <FaHome className={styles.menuIcon} />
                        <span className={styles.menuText}>Home</span>
                    </Link>
                    <Link href="/chats" className={`${styles.menuContainer} mt-8`}>
                        <MdMessage className={styles.menuIcon} />
                        <span className={styles.menuText}>Chats</span>
                    </Link>
                    <Link href="/notification" className={`${styles.menuContainer} mt-8`}>
                        <MdNotifications className={styles.menuIcon} />
                        <span className={styles.menuText}>Notification</span>
                    </Link>
                </div>
                <div className="basis-2/3 flex flex-col gap-10 overflow-hidden overflow-y-auto">
                    <div className="flex flex-col border-dashboard rounded-md p-4 gap-4 sticky top-0 bg-white">
                        <textarea 
                            name="post" 
                            id="post" 
                            className="w-full border-dashboard rounded-md font-poppins font-light p-2 h-20 outline-none" 
                            placeholder="What's cookin..."
                            style={{resize: "none"}}
                        />
                        <div className="flex w-full items-center justify-between gap-4">
                            <div className="flex flex-col w-[50%]">
                                <div className="">
                                    <MultiSelect options={tags} onChange={handleSelectionChange} />
                                </div>
                                <div className="mt-2">
                                    <input 
                                        type="text" 
                                        name="timeframe" 
                                        placeholder="Enter time frame"  
                                        className="outline-none border-dashboard rounded-md font-poppins font-light p-2"
                                        value={timeframe}
                                        onChange={handleTimeframeChange}
                                    />
                                </div>
                            </div>
                            <button className="w-[50%] flex bg-green-700 font-poppins font-light text-2xl items-center h-20 justify-center text-white rounded-md hover:bg-green-900">
                                Create Collaboration Post
                            </button>
                        </div>
                    </div>
                    <PostGroup items={posts} />
                </div>
                <div className="basis-1/6 flex flex-col rounded-md py-2 px-4 border-dashboard overflow-hidden overflow-y-auto">
                    <h1 className="font-poppins font-light text-xl">New Companies</h1>
                    <CompanyListGroup items={companyListGroup} />
                </div>
            </div>
        </div>

    );
}

export default Dashboard;