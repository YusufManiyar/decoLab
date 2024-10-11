import React, { ChangeEvent, useEffect, useState } from "react";
import {NextPage} from "next";
import Image from "next/image";
import Link from "next/link";
import { AvatarUpload, MultiSelect, Spinner, TagBadge } from "@/components/common";
import type {Avatar} from "@/types/index";
import { FundingGroup, FundingItem } from "@/components/common";
import {FaLinkedin, FaTwitter, FaGithub, FaPen, FaTrash, FaTelegram} from "react-icons/fa";
import Member1 from "@/public/assets/teams/Ellipse 9.png";
import Member2 from "@/public/assets/teams/Ellipse 10.png";
import Member3 from "@/public/assets/teams/Ellipse 11.png";
import Brand1 from "@/public/assets/brands/Ellipse 2.png";
import Brand2 from "@/public/assets/brands/Ellipse 3.png";
import Brand3 from "@/public/assets/brands/Ellipse 4.png";
import Brand4 from "@/public/assets/brands/Ellipse 5.png";
import Logo from "@/public/assets/Screenshot_2023-03-28_at_5.04 1.png";
import { Navbar } from "@/components/layouts";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { addTeamMember, deleteAvatar, updateMe } from "@/lib/api/user";
import { setUser, updateLogo, pushTeamMember } from "@/store/slices/userSlice";
import type { TeamMember, User } from "@/store/slices/userSlice";
import Modal from "@/components/common/Modal";
import { toast } from "react-toastify";
import { SocialForm, TeamMemberForm } from "@/components/profileEditForms";
import { clearFileUrl } from "@/store/slices/tempSlice";
import { Tags } from "@/constant";

const styles = {
    container: "flex flex-col w-full p-20",
    mContainer: "flex w-full",
    mainContainer: "flex flex-col justify-center p-2 w-[40%] items-center",
    deContainer: "flex flex-col w-[60%] p-2",
    nameSection: "flex flex-col items-center justify-between",
    logo: "flex flex-col items-center justify-center w-32 h-32 bg-gray-300 rounded-full group bg-no-repeat bg-cover bg-center",
    directInfo: "flex flex-col mt-2",
    name: "font-poppins",
    teamContainer: "flex flex-col items-center justify-center mt-16",
    teamTitle: "font-poppins text-center font-normal text-md",
    tagContainer: "flex flex-col items-center justify-center mt-16",
    tagTitle: "font-poppins text-center font-normal text-md",
    deTitle: "font-poppins font-light text-xl",
    iconWrapper: "flex flex-col items-center justify-center p-2",
    buttonContainer: "flex flex-col items-center justify-center mt-2",
    button: "mt-5 bg-[#1E1E1E] flex justify-center items-center text-white rounded-md px-20 py-2 text-sm hover:bg-black",
    iconButton: "p-2 bg-[#1E1E1E] text-white rounded-full hover:bg-black"
}

const brandsCollaborated: Avatar[] = [
    {src: Brand1, alt: "brand1"},
    {src: Brand2, alt: "brand2"},
    {src: Brand3, alt: "brand3"},
    {src: Brand4, alt: "brand4"},
];

const fundingItems: FundingItem [] = [
    {name: "Seed Round", badgeName: "$1M raised", key: "Seed Round"},
    {name: "Series A", badgeName: "$2.5M raised", key: "Series A"},
    {name: "Series B", badgeName: "not raised", key: "Series B"},
];


const teamInitialInputs = [
    { label: "Name", type: "text", name: "name", value: "", validation: "", isValid: false },
    { label: "Role", type: "text", name: "role", value: "", validation: "", isValid: false },
    { label: "Email", type: "text", name: "contactEmail", value: "", validation: "", isValid: false },
    { label: "Linkedin URL", type: "text", name: "linkedin", value: "", validation: "", isValid: false },
];

const socialInitialInputs = [
    { label: "Twitter", type: "text", name: "twitterHandle", value: "", validation: "", isValid: false },
    { label: "Telegram", type: "text", name: "telegram", value: "", validation: "", isValid: false },
    { label: "Github", type: "text", name: "github", value: "", validation: "", isValid: false },
];

const Profile: NextPage = () => {
    
    const [loading, setLoading] = useState<boolean>(false);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [modalChildren, setModalChildren] = useState<string>("");
    const [bio, setBio] = useState<string>("");
    const [teamInputs, setTeamInputs] = useState(teamInitialInputs);
    const [socialInputs, setSocialInputs] = useState(socialInitialInputs);
    const [tagInputs, setTagInputs] = useState<string[]>([]);

    const dispatch = useDispatch();
    const userData = useSelector((state: RootState) => state.user.userData);
    const temp = useSelector((state: RootState) => state.temp);

    const handleRemoveAvatar = async () => {
        setLoading(true);
        try {
            const splittedFileName = userData?.profile.additionalInfo.logo.split('/');
            if(splittedFileName) {
                const filename = splittedFileName[splittedFileName?.length - 1];
                const response = await deleteAvatar(filename);
                if(response.ok) {
                    dispatch(updateLogo(""));
                }
            }
        }catch(err) {
            
        }finally {
            setLoading(false);
        }
    }

    const handleModalChildren = (key: string) => {
        setModalChildren(key);
        if(key === "aboutus") {
            if(userData?.profile.additionalInfo.bio) {
                setBio(userData.profile.additionalInfo.bio);
            }
        }
        if(key === "social") {
            if(userData?.profile.socialLinks) {
                const updatedSocialInputs = socialInitialInputs.map(item => ({
                    ...item,
                    value: userData.profile.socialLinks[item.name as keyof typeof userData.profile.socialLinks] || ''
                }));
                setSocialInputs(updatedSocialInputs);
            }
        }
        if(key === "tags") {
            if(userData?.profile.industry) {
                setTagInputs(userData.profile.industry);
            }
        }
        setModalOpen(true);
    }

    const handleBioChange = (e: ChangeEvent<HTMLTextAreaElement>) => setBio(e.target.value);
    
    const handleBioSave = async () => {
        try {
            if(userData) {
                setLoading(true);
                const updatedUser = {
                    ...userData,
                    profile: {
                        ...userData.profile,
                        additionalInfo: {
                            ...userData.profile.additionalInfo,
                            bio: bio,
                        },
                    },
                };
                const response = await updateMe(updatedUser);
                if(response.ok) {
                    toast.success('Saved successfully');
                    dispatch(setUser(response.user));
                    setModalOpen(false);
                    setModalChildren("");
                }
            }
        } catch(err) {
            console.error('Server error', err);
        } finally {
            setLoading(false);
        }
    };

    const handleTeamChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const updatedInputs = teamInputs.map(input => {
            if(input.name === name) {
                const validate = teamValidator(name, value);
                if(validate !== "") {
                    input.validation = validate;
                    input.isValid = true;
                }else {
                    input.isValid = false;
                }
                input.value = value;
            }
            return input;
        });
        setTeamInputs(updatedInputs);
    };

    const teamValidator = (key: string, value: string): string => {
        if (key === "name") {
            return value === "" ? "Please enter your team member's name" : "";
        }
        if (key === "role") {
            return value === "" ? "Please enter your team member's role" : "";
        }
        if (key === "contactEmail" && value !== "") {
            if (!value.includes("@")) {
                return "Email must contain '@'";
            }
            return "";
        }
        if(key === "linkedin" && value !== "") {
            return !value.startsWith("https://www.linkedin.com/in/") ? "Please enter a valid linkedin url" : "";
        }
        
        return "";
    };

    const teamLastValidate = (key: string, value: string): boolean => {
        if (key === "name" && value === "") {
            return false;
        }
        if (key === "role" && value === "") {
            return false;
        }
        if (key === "contactEmail" && value !== "") {
            if (!value.includes("@")) {
                return false;
            }
        }
        if(key === "linkedin" && value !== "") {
            if(!value.startsWith("https://www.linkedin.com/in/")) {
                return false;
            }
        }
        return true;
    };
    
    const handleTeamAddSave = async () => {
        if(teamInputs.some(input => teamLastValidate(input.name, input.value))) {
            const teamMember: TeamMember = {
                name: teamInputs[0].value,
                role: teamInputs[1].value,
                contactEmail: teamInputs[2].value,
                avatar: temp.fileUrl as string,
                linkedin: teamInputs[3].value
            }
            const response = await addTeamMember(teamMember);
            if(response.ok) {
                dispatch(pushTeamMember(teamMember));
                dispatch(clearFileUrl());
                setTeamInputs(teamInitialInputs);
                toast.success('Saved successfully');
                setModalOpen(false);
            }
        }
    };

    const handleSocialChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const updatedInputs = socialInputs.map(input => {
            if(input.name === name) {
                const validate = socialValidator(name, value);
                if(validate !== "") {
                    input.validation = validate;
                    input.isValid = true;
                }else {
                    input.isValid = false;
                }
                input.value = value;
            }
            return input;
        });
        setSocialInputs(updatedInputs);
    };

    const socialValidator = (key: string, value: string): string => {
        if(key === "twitterHandle" && value !== "") {
            return !value.startsWith("https://") ? "Please enter a valid twitter url" : "";
        }
        if(key === "telegram" && value !== "") {
            return !value.startsWith("https://telegram") ? "Please enter a valid telegram url" : "";
        }
        if(key === "github" && value !== "") {
            return !value.startsWith("https://github.com") ? "Please enter a valid github url" : "";
        }
        return "";
    };

    const socialLastValidator = (key: string, value: string): boolean => {
        if(key === "twitterHandle" && value !== "") {
            if(!value.startsWith("https://")) {
                return false;
            }
        }
        if(key === "telegram" && value !== "") {
            if(!value.startsWith("https://telegram")) {
                return false;
            }
        }
        if(key === "github" && value !== "") {
            if(!value.startsWith("https://github.com")) {
                return false;
            }
        }
        return true;
    };

    const handleSocialSave = async () => {
        try {
            if(socialInputs.some(input => socialLastValidator(input.name, input.value))) {
                setLoading(true);
                if(userData) {
                    const updatedUser = {
                        ...userData, 
                        profile: {
                            ...userData?.profile, 
                            socialLinks: {
                                twitterHandle: socialInputs[0].value, 
                                telegram: socialInputs[1].value, 
                                github: socialInputs[2].value
                            }
                        }
                    }
                    debugger;
                    const response = await updateMe(updatedUser);
                    if(response.ok) {
                        dispatch(setUser(response.user));
                        toast.success("Saved successfully");
                        setModalOpen(false);
                    }
                }
            }
        }catch(err) {
            console.error("Server error", err);
        }finally{
            setLoading(false);
        }
    };

    const handleTagChange = (selected: string[]) => setTagInputs(selected);

    const handleTagsSave = async () => {
        try {
            setLoading(true);
            if(userData) {
                const updatedUser = {
                    ...userData,
                    profile: {
                        ...userData.profile,
                        industry: tagInputs
                    }
                };
                const response = await updateMe(updatedUser);
                if(response.ok) {
                    dispatch(setUser(response.user));
                    toast.success("Saved successfully");
                    setModalOpen(false);
                }
            }
        }catch(err) {
            console.error("Server error", err);
        }finally {
            setLoading(false);
        }
    };

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
                    <h1 className="font-poppins font-light text-3xl text-right">My Profile</h1>
                </div>
            </div>
            <div className="flex flex-row gap-10 mt-10">
                <Navbar />
                <div className="basis-5/6 border-dashboard rounded-md p-5">
                <div className={styles.mContainer}>
                <div className={styles.mainContainer}>
                    <div className={styles.nameSection}>
                        <div className="flex flex-col">
                        <div 
                            className={styles.logo}
                            style={{
                                backgroundImage: userData?.profile.additionalInfo.logo ? `url(${userData.profile.additionalInfo.logo})` : 'none'
                            }}
                        >
                            {userData?.profile.additionalInfo.logo ? 
                             <></> : <AvatarUpload setLoading={setLoading} flag="me" />}
                        </div>
                        {userData?.profile.additionalInfo.logo && 
                            <div className="w-full text-right">
                                <button className={styles.iconButton} onClick={handleRemoveAvatar}><FaTrash size={10} /></button>
                            </div>
                        }
                        </div>
                        <div className={styles.directInfo}>
                            <div className="flex justify-between">
                                <h1 className={`${styles.name} font-bold text-2xl mr-2`}>{userData?.name}</h1>
                            </div>
                            <div className="flex flex-col justify-center items-center mt-2">
                                <span className="text-xs text-gray-700 font-poppins">10.2k followers</span>
                            </div>
                        </div>
                        <div className={styles.teamContainer}>
                            <h1 className={styles.teamTitle}>Team / Advisors</h1>
                            <div className="grid grid-cols-4 gap-4 mt-4">
                                {userData?.profile.teamMembers && userData.profile.teamMembers.map((ta, index) => (
                                    <div 
                                        className="flex flex-col items-center justify-cente p-2" 
                                        key={index}
                                    >
                                        <img src={ta.avatar} alt={ta.name} className="w-20 h-20 border-dashboard rounded-full" />
                                    </div>
                                ))}
                                <div className="flex flex-col items-center justify-center">
                                    <button 
                                        className="font-poppins text-xs font-light px-2 py-1 hover:bg-blue-200 text-blue-600 rounded-md" 
                                        onClick={() => handleModalChildren("addteam")}
                                        style={{border: '1px solid'}}
                                    >Add +</button>
                                </div>
                            </div>
                        </div>
                        <div className={styles.tagContainer}>
                            <div className="flex items-center">
                                <h1 className={styles.tagTitle}>Tags</h1>
                                <FaPen 
                                    size={12} 
                                    className="ml-4 cursor-pointer text-gray-700 hover:text-black"
                                    onClick={() => handleModalChildren("tags")}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4 mt-4 text-center">
                                {userData?.profile.industry &&
                                    userData?.profile.industry.map((industry, index) => (
                                        <span key={index}>
                                            <TagBadge key={index.toString()} name={industry} />
                                        </span>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.deContainer}>
                    <div className="flex flex-col">
                        <div className="flex items-center">
                            <h1 className={styles.deTitle}>About US</h1>
                            <FaPen 
                                size={12} 
                                className="ml-4 cursor-pointer text-gray-700 hover:text-black"
                                onClick={() => handleModalChildren("aboutus")}
                            />
                        </div>
                        <p className="font-poppins bio-text font-normal text-sm p-2 mt-4 leading-9">
                            {userData?.profile.additionalInfo.bio}
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
                                <div className="flex items-center">
                                    <h1 className={styles.deTitle}>Socials</h1>
                                    <FaPen 
                                        size={12} 
                                        className="ml-4 cursor-pointer text-gray-700 hover:text-black"
                                        onClick={() => handleModalChildren("social")}
                                    />
                                </div>
                                <div className="grid grid-cols-6 gap-4 mt-2">
                                    {userData?.profile.socialLinks.twitterHandle && 
                                        <Link href={userData.profile.socialLinks.twitterHandle} className={styles.iconWrapper}>
                                            <FaTwitter color="#03A9F4" size={50} className="cursor-pointer" />
                                        </Link>
                                    }
                                    {userData?.profile.socialLinks.telegram &&
                                        <Link href={userData.profile.socialLinks.telegram} className={styles.iconWrapper}>
                                            <FaTelegram color="#0288D1" size={50} className="cursor-pointer" />
                                        </Link>
                                    }
                                    {userData?.profile.socialLinks.github && 
                                        <Link href={userData.profile.socialLinks.telegram} className={styles.iconWrapper}>
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
            <Modal 
                isOpen={modalOpen} 
                onClose={() => setModalOpen(false)} 
                toChange={true} 
                title={modalChildren === "aboutus" ? "About Us" 
                    : modalChildren === "addteam" ? "Add your team members" 
                    : modalChildren === "social" ? "Add your company's social links" 
                    : modalChildren === "tags" ? "Select tags" : ""} 
                onSave={modalChildren === "aboutus" ? handleBioSave 
                    : modalChildren === "addteam" ? handleTeamAddSave 
                    : modalChildren === "social" ? handleSocialSave 
                    : modalChildren === "tags" ? handleTagsSave
                    : async () => {}}>
                <>
                    { modalChildren === "aboutus" ? 
                            <textarea 
                                name="bio" 
                                className="flex flex-col w-full p-2 font-poppins font-light text-sm border-dashboard rounded-md outline-none h-52" 
                                style={{resize: "none"}} 
                                value={bio}
                                onChange={handleBioChange}
                            />
                        : modalChildren === "addteam" ? 
                            <TeamMemberForm items={teamInputs.map(input => ({
                                ...input,
                                handleChange: handleTeamChange }))} setLoading={setLoading} />
                        : modalChildren === "social" ? 
                            <SocialForm items={socialInputs.map(item => ({...item, handleChange: handleSocialChange}))} />
                        : modalChildren === "tags" ?
                            <MultiSelect options={Tags} onChange={handleTagChange} />
                        : <></>
                    }
                </>
            </Modal>
        </div>
        
    );
}

export default Profile;