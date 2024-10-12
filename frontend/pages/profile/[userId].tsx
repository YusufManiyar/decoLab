import React, {useState, useEffect, useCallback} from "react";
import {NextPage} from "next";
import Image from "next/image";
import Link from "next/link";
import { Spinner, TagBadge } from "@/components/common";
import type {Avatar} from "@/types/index";
import { FundingGroup, FundingItem } from "@/components/common";
import {FaLinkedin, FaTwitter, FaGithub, FaTelegram} from "react-icons/fa";
import Member1 from "@/public/assets/teams/Ellipse 9.png";
import Member2 from "@/public/assets/teams/Ellipse 10.png";
import Member3 from "@/public/assets/teams/Ellipse 11.png";
import Brand1 from "@/public/assets/brands/Ellipse 2.png";
import Brand2 from "@/public/assets/brands/Ellipse 3.png";
import Brand3 from "@/public/assets/brands/Ellipse 4.png";
import Brand4 from "@/public/assets/brands/Ellipse 5.png";
import { Navbar } from "@/components/layouts";
import { useRouter } from "next/router";
import { fetchUserById } from "@/lib/api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setOtherUser } from "@/store/slices/tempSlice";
import { calFollowersWithUnit } from "@/utils/cal";
import { useWebSocket } from "@/hooks/useWebSocket";
import { toast } from "react-toastify";

const styles = {
    container: "flex flex-col w-full p-20",
    mContainer: "flex w-full",
    mainContainer: "flex flex-col justify-center p-2 w-[40%] items-center",
    deContainer: "flex flex-col w-[60%] p-2",
    nameSection: "flex flex-col items-center justify-between",
    logo: "flex items-center bg-no-repeat bg-cover bg-center justify-center w-32 h-32 bg-[#0A0B1A] rounded-full",
    directInfo: "flex flex-col mt-8",
    name: "font-poppins",
    teamContainer: "flex flex-col items-center justify-center mt-16",
    teamTitle: "font-poppins text-center font-normal text-md",
    tagContainer: "flex flex-col items-center justify-center mt-16",
    tagTitle: "font-poppins text-center font-normal text-md",
    deTitle: "font-poppins font-light text-xl",
    iconWrapper: "flex flex-col items-center justify-center p-2 cursor-pointer",
    buttonContainer: "flex flex-col items-center justify-center mt-2",
    button: "mt-5 bg-[#1E1E1E] flex justify-center items-center text-white rounded-md px-20 py-2 text-sm hover:bg-black"
}

const brandsCollaborated: Avatar[] = [
    {src: Brand1, alt: "brand1"},
    {src: Brand2, alt: "brand2"},
    {src: Brand3, alt: "brand3"},
    {src: Brand4, alt: "brand4"},
];

const tags = ["#AI", "#Marketing", "#Web3", "#DeFi", "#ChatGPT"];

const fundingItems: FundingItem [] = [
    {name: "Seed Round", badgeName: "$1M raised", key: "Seed Round"},
    {name: "Series A", badgeName: "$2.5M raised", key: "Series A"},
    {name: "Series B", badgeName: "not raised", key: "Series B"},
];

const Profile: NextPage = () => {

    const router = useRouter();
    const {userId} = router.query;
    const [loading, setLoading] = useState(true);
    const [followerDisabled, setFollowerDisabled] = useState<boolean>(false);

    const dispatch = useDispatch();
    const otherUser = useSelector((state: RootState) => state.temp.otherUser);
    const {userData} = useSelector((state: RootState) => state.user);

    const {sendMessage} = useWebSocket();
    
    const fetchUserProfile = useCallback(async () => {
        if(!userId) return;
        setLoading(true);
        try {
            const response = await fetchUserById(userId as string);
            if(response.ok) {
                dispatch(setOtherUser(response.user));
                if(response.user.profile.followers.some((fo: string, index: number) => fo === userData?._id)) {
                    setFollowerDisabled(true);
                }
            }
        }catch(err) {  
            console.error("Server error", err);
        }finally {
            setLoading(false);
        }
    }, [userId]);

    const handleFollowClick = () => {
        try {
            sendMessage({type: "request-followers", data: {otherId: otherUser?._id, myName: userData?.name}});
            toast.success("Follower request is sent successfully");
        }catch (err) {
            console.log("Server error:", err);
        }
    }

    useEffect(() => {
        fetchUserProfile();
    }, [fetchUserProfile]);

    useEffect(() => {
        if(otherUser?.profile.followers) {
            if(otherUser.profile.followers.some((fo: string, index: number) => fo === userData?._id)) {
                setFollowerDisabled(true);
            }
        }
    }, [otherUser]);

    if (loading) {
        return (
            <div className="fixed inset-0 bg-white opacity-70 z-50 flex items-center justify-center">
                <Spinner />
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className="flex flex-row gap-10">
                <div className="basis-1/6">
                    <h1 className="font-poppins font-light text-3xl text-right">Profile</h1>
                </div>
            </div>
            <div className="flex flex-row gap-10 mt-10">
                <Navbar />
                <div className="basis-5/6 border-dashboard rounded-md p-5">
                <div className={styles.mContainer}>
                <div className={styles.mainContainer}>
                    <div className={styles.nameSection}>
                        <div 
                                className={styles.logo}
                                style={{
                                    backgroundImage: otherUser?.profile.additionalInfo.logo ? `url(${otherUser.profile.additionalInfo.logo})` : 'none'
                                }}
                            >
                        </div>
                        <div className={styles.directInfo}>
                            <div className="flex justify-between items-center">
                                <h1 className={`${styles.name} font-bold text-2xl mr-2`}>{otherUser?.name}</h1>
                                {!followerDisabled ? <button className="px-2 py-1 rounded-md bg-[#1E1E1E] text-xs cursor-pointer text-white hover:bg-black" onClick={handleFollowClick}>Follow +</button>
                                    : <span className="font-poppins font-light text-xs text-gray-700">Followed</span>}
                            </div>
                            <div className="flex flex-col justify-center items-center mt-2">
                                <span className="text-xs text-gray-700 font-poppins">{otherUser?.profile.followers && calFollowersWithUnit(otherUser?.profile.followers.length)} followers</span>
                            </div>
                        </div>
                        <div className={styles.teamContainer}>
                            <h1 className={styles.teamTitle}>Team / Advisors</h1>
                            <div className="grid grid-cols-4 gap-4 mt-4">
                                {otherUser?.profile.teamMembers && otherUser.profile.teamMembers.map((team, index) => (
                                    <div 
                                        className="flex flex-col items-center justify-cente p-2" 
                                        key={index}
                                    >
                                        <img src={team.avatar} alt={team.name} className="w-20 h-20 border-dashboard rounded-full" />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={styles.tagContainer}>
                            <h1 className={styles.tagTitle}>Tags</h1>
                            <div className="grid grid-cols-2 gap-4 mt-4 text-center">
                                { otherUser?.profile.industry && otherUser.profile.industry.map((tag, index) => (
                                    <span key={index}>
                                        <TagBadge name={tag} />
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.deContainer}>
                    <div className="flex flex-col">
                        <h1 className={styles.deTitle}>About Us</h1>
                        <p className="font-poppins bio-text font-normal text-sm p-2 mt-4 leading-9">
                            {otherUser?.profile.additionalInfo.bio}
                        </p>
                    </div>
                    <div className="flex flex-col mt-8">
                        <div className="w-full grid grid-cols-2 gap-4">
                            <div className="">
                                <h2 className={styles.deTitle}>Fundings</h2>
                                <div className="flex flex-col p-2">
                                    <FundingGroup items={fundingItems} />
                                </div>
                            </div>
                            <div className="">
                                <h2 className={styles.deTitle}>Flex Posts</h2>
                                
                            </div>
                            <div className="mt-8">
                                <h1 className={styles.deTitle}>Brands Collaborated</h1>
                                <div className="grid grid-cols-6 gap-4 mt-2">
                                    {brandsCollaborated.map((brand, index) => (
                                        <div className={styles.iconWrapper} key={index}>
                                            <Image src={brand.src} alt={brand.alt} className="cursor-pointer" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="grid grid-cols-6 gap-4 mt-2">
                                    {otherUser?.profile.socialLinks.twitterHandle && 
                                        <Link href={otherUser.profile.socialLinks.twitterHandle} className={styles.iconWrapper}>
                                            <FaTwitter color="#03A9F4" size={50} className="cursor-pointer" />
                                        </Link>
                                    }
                                    {otherUser?.profile.socialLinks.telegram &&
                                        <Link href={otherUser.profile.socialLinks.telegram} className={styles.iconWrapper}>
                                            <FaTelegram color="#0288D1" size={50} className="cursor-pointer" />
                                        </Link>
                                    }
                                    {otherUser?.profile.socialLinks.github && 
                                        <Link href={otherUser.profile.socialLinks.telegram} className={styles.iconWrapper}>
                                            <FaGithub color="#030303" size={50} className="cursor-pointer" />
                                        </Link>
                                    }
                                </div>
                        </div>
                    </div>
                </div>
            </div>
                </div>
            </div>
        </div>
        
    );
}

export default Profile;