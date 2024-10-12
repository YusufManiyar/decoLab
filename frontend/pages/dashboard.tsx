import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { MultiSelect, SearchBar, CompanyListGroup, Spinner } from "@/components/common";
import { PostGroup, PostItem } from "@/components/collaborationPost";
import Logo from "../public/assets/Screenshot_2023-03-28_at_5.04 1.png";
import { Navbar } from "@/components/layouts";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Tags } from "@/constant";
import { fetchCompanyList } from "@/lib/api";
import { setCompany } from "@/store/slices/companySlice";
import type { Company } from "@/store/slices/companySlice";
import { NewPostType } from "@/types";
import { getAllPosts } from "@/lib/api/post";
import { pushPost, setPost } from "@/store/slices/postSlice";
import { toast } from "react-toastify";
import { useWebSocketContext } from "@/context/WebSocketContext";

const styles = {
    container: "flex flex-col p-20",
};

const Dashboard: NextPage = () => {
    
    const [search, setSearch] = useState<string>('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [newTimeFrame, setNewTimeFrame] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [newContent, setNewContent] = useState('');
    const [newTimeUnit, setNewTimeUnit] = useState('day');
    const [disabled, setDisabled] = useState<boolean>(false);
    const [sposts, setSposts] = useState<PostItem[]>([]);
    const [isRemovedTags, setIsRemovedTags] = useState<boolean>(false);

    const dispatch = useDispatch();
    const companyList = useSelector((state: RootState) => state.company.lists);
    const posts = useSelector((state: RootState) => state.post.posts);
    const userData = useSelector((state: RootState) => state.user.userData);
    const {sendMessage} = useWebSocketContext();

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;
        setSearch(value);
    };

    const handleTagsChange = (selected: string[]) => setSelectedTags(selected);

    const fetchCompanies = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetchCompanyList();
            if(response.ok) {
                const companies = response.companies as Company[];
                const groupedCompanies = Tags.map(tag => {
                    const filteredCompanies = companies.filter(company => company.tag === tag);
                    return {
                        group: tag,
                        companies: filteredCompanies,
                    };
                }).filter(group => group.companies.length > 0);
                dispatch(setCompany(groupedCompanies));
            }
        }catch(err) {
            console.error("Server error", err);
        }finally {
            setLoading(false);
        }
    }, []);

    const fetchAllPosts = useCallback(async () => {
        setLoading(true);
        try {
            const response = await getAllPosts();
            if(response.ok) {
                dispatch(setPost(response.posts));
            }
        }catch(err) {
            console.error("Server error", err);
        }finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCompanies();
        fetchAllPosts();
    }, []);

    const handleTimeframeChange = (e: ChangeEvent<HTMLInputElement>) => setNewTimeFrame(e.target.value);

    const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => setNewContent(e.target.value);

    const handleTimeUnitChange = (e: ChangeEvent<HTMLSelectElement>) => setNewTimeUnit(e.target.value);

    const handleCreatePost = async () => {
        try {
            if(validate()) {
                setLoading(true);
                const newPost: NewPostType = {
                    content: newContent,
                    tags: selectedTags,
                    timeFrame: newTimeFrame,
                    timeUnit: newTimeUnit,
                    createdAt: new Date(),
                };
                sendMessage({type: 'new-post', data: newPost});
                setNewContent("");
                setSelectedTags([]);
                setNewTimeFrame("");
                setNewTimeUnit("min");
                setIsRemovedTags(true);
                toast.success("Created successfully");
            }else {
                toast.error("Please enter all valid values.");
            }
        }catch(err) {
            console.log(err);
        }finally{
            setLoading(false);
        }
    };

    const validate = () => {
        if(selectedTags.length === 0 || newContent === "" || newTimeFrame === "" || newTimeUnit === "") {
            return false;
        }
        return true;
    };

    useEffect(() => {
        if(validate()) {
            setDisabled(true);
        }else {
            setDisabled(false);
        }
    }, [newContent, newTimeFrame, newTimeUnit, selectedTags]);

    useEffect(() => {
        setSposts(posts.slice().reverse());
    }, [posts]);

    if (loading) {
        return (
            <div className="fixed inset-0 bg-white opacity-70 z-50 flex items-center justify-center">
                <Spinner />
            </div>
        );
    }

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
                    <Link href="/profile/me">
                        <div className="flex items-center justify-center gap-4">
                            <span className="flex flex-col items-center justify-center font-poppins font-light text-xl">Profile</span>
                            <span 
                                className="flex flex-col items-center justify-center w-16 h-16 bg-[#0A0B1A] rounded-full bg-no-repeat bg-cover bg-center"
                                style={{backgroundImage: `url(${userData?.profile.additionalInfo.logo})`}}
                            >
                            </span>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="flex flex-row gap-10 mt-10 h-[100vh]">
                <Navbar />
                <div className="basis-2/3 flex flex-col gap-10 overflow-hidden overflow-y-auto">
                    <div className="flex flex-col border-dashboard rounded-md p-4 gap-4 sticky top-0 bg-white">
                        <textarea 
                            name="post" 
                            id="post" 
                            className="w-full border-dashboard rounded-md font-poppins font-light p-2 h-20 outline-none" 
                            placeholder="What's cookin..."
                            value={newContent}
                            style={{resize: "none"}}
                            onChange={handleContentChange}
                        />
                        <div className="flex w-full items-center justify-between gap-4">
                            <div className="flex flex-col w-[50%]">
                                <div className="">
                                    <MultiSelect options={Tags} onChange={handleTagsChange} isRemoved={isRemovedTags} />
                                </div>
                                <div className="mt-2 flex items-center justify-between">
                                    <div className="basis-2/3">
                                        <input 
                                            type="number" 
                                            name="timeframe" 
                                            placeholder="Enter time frame"  
                                            className="outline-none w-full border-primary rounded-md font-poppins font-light p-2"
                                            value={newTimeFrame}
                                            step={1}
                                            min={1}
                                            onChange={handleTimeframeChange}
                                        />
                                        
                                    </div>
                                    <div className="relative">
                                        <select 
                                            name="timeUnit" 
                                            className="notification-transition w-full outline-none border cursor-pointer border-gray-300 rounded-md p-2 bg-white text-gray-700 font-poppins font-light transition duration-200 ease-in-out focus:border-green-500 focus:ring-2 focus:ring-green-500"
                                            id=""
                                            onChange={handleTimeUnitChange}
                                        >
                                            <option value="day">Day</option>
                                            <option value="week">Week</option>
                                            <option value="month">Month</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <button 
                                className={`w-[50%] flex font-poppins font-light text-2xl items-center h-24 justify-center 
                                rounded-md ${!disabled ? "bg-gray-300 text-gray-500" : "bg-green-700 text-white hover:bg-green-900"}`}
                                onClick={handleCreatePost}
                                disabled={!disabled}
                            >
                                Create Collaboration Post
                            </button>
                        </div>
                    </div>
                    <PostGroup items={sposts} />
                </div>
                <div className="basis-1/6 flex flex-col rounded-md py-2 px-4 border-dashboard overflow-hidden overflow-y-auto">
                    <h1 className="font-poppins font-light text-xl">New Companies</h1>
                    <CompanyListGroup items={companyList} />
                </div>
            </div>
        </div>

    );
}

export default Dashboard;