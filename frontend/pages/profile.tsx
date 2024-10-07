import React from "react";
import {NextPage} from "next";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { TagBadge } from "@/components/common";
import type {Avatar} from "@/types/index";
import { FundingGroup, FundingItem } from "@/components/common";
import {FaLinkedin, FaTwitter, FaGithub} from "react-icons/fa";
import Member1 from "../public/assets/teams/Ellipse 9.png";
import Member2 from "../public/assets/teams/Ellipse 10.png";
import Member3 from "../public/assets/teams/Ellipse 11.png";
import Brand1 from "../public/assets/brands/Ellipse 2.png";
import Brand2 from "../public/assets/brands/Ellipse 3.png";
import Brand3 from "../public/assets/brands/Ellipse 4.png";
import Brand4 from "../public/assets/brands/Ellipse 5.png";
import Logo from "../public/assets/Screenshot_2023-03-28_at_5.04 1.png";

const styles = {
    container: "flex flex-col w-full p-20",
    mContainer: "flex w-full",
    mainContainer: "flex flex-col justify-center p-2 w-[40%] items-center",
    deContainer: "flex flex-col w-[60%] p-2",
    nameSection: "flex flex-col items-center justify-between",
    logo: "flex items-center justify-center w-32 h-32 bg-[#0A0B1A] rounded-full",
    directInfo: "flex flex-col mt-8",
    name: "font-poppins",
    teamContainer: "flex flex-col items-center justify-center mt-16",
    teamTitle: "font-poppins text-center font-normal text-md",
    tagContainer: "flex flex-col items-center justify-center mt-16",
    tagTitle: "font-poppins text-center font-normal text-md",
    deTitle: "font-poppins font-light text-xl",
    iconWrapper: "flex flex-col items-center justify-center p-2",
    buttonContainer: "flex flex-col items-center justify-center mt-2",
    button: "mt-5 bg-[#1E1E1E] flex justify-center items-center text-white rounded-md px-20 py-2 text-sm hover:bg-black"
}

const teamAvatars: Avatar[] = [
    {src: Member1, alt: "member1"},
    {src: Member2, alt: "member2"},
    {src: Member3, alt: "member3"},
];

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

    const {user, loading} = useUser();
    
    return (
        <div className={styles.container}>
                <div className={styles.mContainer}>
                <div className={styles.mainContainer}>
                    <div className={styles.nameSection}>
                        <div className={styles.logo}>
                            <Image src={Logo} alt="logo" />
                        </div>
                        <div className={styles.directInfo}>
                            <div className="flex justify-between">
                                <h1 className={`${styles.name} font-bold text-2xl mr-2`}>{user?.name}GotBit</h1>
                                <div className="flex flex-col items-center justify-center">
                                    <TagBadge key="follow" name="Follow +" />
                                </div>
                            </div>
                            <div className="flex flex-col justify-center items-center mt-2">
                                <span className="text-xs text-gray-700 font-poppins">10.2k followers</span>
                            </div>
                        </div>
                        <div className={styles.teamContainer}>
                            <h1 className={styles.teamTitle}>Team / Advisors</h1>
                            <div className="grid grid-cols-4 gap-4 mt-4">
                                {teamAvatars.map((ta, index) => (
                                    <div className="flex flex-col items-center justify-cente p-2" key={index}>
                                        <Image src={ta.src} alt={ta.alt} className="" />
                                    </div>
                                ))}
                                <div className="flex flex-col items-center justify-center">
                                    <TagBadge name="Add +" key="add" />
                                </div>
                            </div>
                        </div>
                        <div className={styles.tagContainer}>
                            <h1 className={styles.tagTitle}>Tags</h1>
                            <div className="grid grid-cols-2 gap-4 mt-4 text-center">
                                { tags.map((tag, index) => (
                                    <TagBadge key={index.toString()} name={tag} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.deContainer}>
                    <div className="flex flex-col">
                        <h1 className={styles.deTitle}>About Us</h1>
                        <p className="font-poppins bio-text font-normal text-sm p-2 mt-4 leading-9">
                            {/* {user?.profile.additionalInfo.bio} */}
                            GotBit was founded in 2017, when BTC was just a $1000. 
                            We lived through the ICO boom, blockchain regulation and Binance launch. 
                            In the time since we went from two traders to a big company, spanning multiple branches of the crypto market: from market-making to startup incubation and consulting. 
                            Today, in 2022 we have an experienced team of over 100 highly educated specialists - the most important asset we gained over the years.
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
                            <div className="mt-8">
                                <h1 className={styles.deTitle}>Socials</h1>
                                <div className="grid grid-cols-6 gap-4 mt-2">
                                    <Link href="https://twitter.com/" className={styles.iconWrapper}>
                                        <FaTwitter color="#03A9F4" size={50} className="cursor-pointer" />
                                    </Link>
                                    <Link href="https://linkedin.com/" className={styles.iconWrapper}>
                                        <FaLinkedin color="#0288D1" size={50} className="cursor-pointer" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
            </div>
             <div className={styles.buttonContainer}>
                <button className={styles.button}>Register</button>
            </div>
        </div>
        
    );
}

export default Profile;