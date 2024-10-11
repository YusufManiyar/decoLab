import React, { ChangeEvent, FormEvent, useEffect, useState, useRef } from "react";
import { NextPage } from "next";
import Image from "next/image";
import { InputGroup, Spinner } from "@/components/common";
import { TwitterForm } from "@/components/authForms";
import { signIn, useSession, getSession } from 'next-auth/react';
import { MultiSelect } from "@/components/common";
import Logo from "../../public/assets/DeCollab.png";
import type { RegisterUser } from "@/types";
import { register } from "@/lib/api";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { setUser } from "@/store/slices/userSlice";
import { Tags } from "@/constant";

const styles = {
    container: "background-image w-[70%] bg-cover h-[100vh] flex",
    logoContainer: "flex flex-col justify-center items-center w-[1222px] h-[100vh]",
    formContainer: "flex flex-col",
    button: "mt-5 bg-[#1E1E1E] block text-white rounded-md p-2 text-sm hover:bg-black"
};

const initialInputs = [
    { label: "Company Name", type: "text", name: "name", value: "", validation: "", isValid: false },
    { label: "Email", type: "text", name: "email", value: "", validation: "", isValid: false },
    { label: "Telegram Url", type: "text", name: "telegram", value: "", validation: "", isValid: false },
    { label: "Website Url", type: "text", name: "websiteUrl", value: "", validation: "", isValid: false },
];

const passwordInputs = [
    { label: "Password", type: "password", name: "password", value: "", validation: "", isValid: false },
    { label: "Confirm password", type: "password", name: "confirmPassword", value: "", validation: "", isValid: false },
];

const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

const Register: NextPage = () => {
    const [manualInputs, setManualInputs] = useState(initialInputs);
    const [pswInputs, setPswInputs] = useState(passwordInputs);
    const [twitterHandle, setTwitterHandle] = useState<string>('');
    const [isTwitterValid, setIsTwitterValid] = useState<boolean>(false);
    const [isTwitterVerified, setIsTwitterVerified] = useState<boolean>(true);
    const [isManualVerified, setIsManualVerified] = useState<boolean>(false);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const { data: session } = useSession();
    const [loading, setLoading] = useState<boolean>(false);

    const router = useRouter();

    const dispatch = useDispatch();
    const useData = useSelector((state: RootState) => state.user.userData);

    const handleTwitterChange = (e: ChangeEvent<HTMLInputElement>) => setTwitterHandle(e.target.value);

    const handleTwitterSubmit = async () => {
        if(twitterHandle != '') {
            const result = await signIn('twitter');
            if(result) {
                setIsTwitterVerified(true);
            }
        }else {
            setIsTwitterValid(true);
        }
    };

    const handleManualChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const updatedInputs = manualInputs.map(input => {
            if(input.name === name) {
                const validate = validator(name, value);
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
        setManualInputs(updatedInputs);
    };

    const handleManualSubmit = () => {
        if (manualInputs.some(input => input.isValid)) {
            return;
        }
        setLoading(true);
        setTimeout(() => {
            setIsManualVerified(true);
            setLoading(false);
        }, 2000);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const updatedInputs = pswInputs.map(input => {
            if(input.name === name) {
                const validate = validator(name, value);
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
        setPswInputs(updatedInputs);
    };

    const handleSelectionChange = (selected: string[]) => {
        setSelectedTags(selected);
    };

    useEffect(() => {
        if(twitterHandle == '') {
            setIsTwitterValid(true);
        }else {
            setIsTwitterValid(false);
        }
    }, [twitterHandle]);

    const validator = (key: string, value: string): string => {
        if (key === "name") {
            return value === "" ? "Please enter your company name" : "";
        }
        if (key === "email") {
            if (!value.includes("@")) {
                return "Email must contain '@'";
            }

            const freeEmailProviders = ["gmail.com", "outlook.com", "yahoo.com", "hotmail.com"];
            const domain = value.split("@")[1];

            if (freeEmailProviders.includes(domain)) {
                return "Please use a business email, not a free email provider.";
            }

            if (!domain || !domain.includes(".")) {
                return "Please enter a valid email address.";
            }
            return "";
        }
        if (key === "websiteUrl") {
            return !value.startsWith("https://") || !value.includes(".com") ? "Please enter a valid website URL." : "";
        }
        if(key === "telegram") {
            if(value !== "") {
                return !value.startsWith("https://t.me") ? "Please enter a valid telegram URL." : "";
            }
        }
        if(key === "password" && value === "") {
            return "Please enter your password.";
        }
        if(key === "confirmPassword") {
            if(value === "") {
                return "Please confirm your password.";
            }
            if(value !== pswInputs[0].value) {
                return "Please confirm your correct password.";
            }
        }
        return "";
    };

    const handleRegister = async () => {
        if(!pswInputs.some(input => input.isValid)) {
            setLoading(true);
            try {
                const user: RegisterUser = {
                    name: manualInputs[0].value,
                    email: manualInputs[1].value,
                    password: pswInputs[1].value,
                    profile: {
                        websiteUrl: manualInputs[3].value,
                        socialLinks: {
                            twitterHandle: "",
                            github: "",
                            telegram: manualInputs[2].value
                        },
                        industry: selectedTags
                    }
                }
                debugger;
                const response = await register(user);
                if(response.ok) {
                    toast.success(response.message);
                    dispatch(setUser({
                        name: user.name,
                        email: user.email,
                        profile: {
                            websiteUrl: user.profile.websiteUrl,
                            industry: user.profile.industry,
                            location: "",
                            socialLinks: user.profile.socialLinks,
                            additionalInfo: {
                                bio: "",
                                logo: "",
                            },
                            teamMembers: []
                        }
                    }));
                    router.push('/auth/login');
                }else {
                    toast.info(response.message);
                }
            } catch (error) {
                console.error("Registration error:", error);
            } finally {
                setLoading(false);
            }
        }
    }

    return (
        <div className="relative">
            <div className={`flex bg-white w-full ${loading ? "opacity-70" : ""} transition-opacity duration-200 `}>
                <div className={styles.container}>
                    <div className={styles.logoContainer}>
                        <Image src={Logo} alt="logo" />
                    </div>
                </div>
                <div className={`${styles.formContainer} mt-[158px] ml-[100px] w-[340px]`}>
                    <h1 className="font-poppins welcome-text">Welcome</h1>
                    <div className="mt-10 flex flex-col">
                        { !isTwitterVerified && 
                            <TwitterForm
                                value={twitterHandle}
                                isTwitterValid={isTwitterValid}
                                handleChange={handleTwitterChange}
                                handleSubmit={handleTwitterSubmit}
                            />
                        }
                        { !isManualVerified &&
                            <>
                                <InputGroup 
                                    items={manualInputs.map(input => ({
                                        ...input,
                                        handleChange: handleManualChange
                                    }))}
                                />
                                <button
                                    className={styles.button}
                                    onClick={handleManualSubmit}
                                >Next</button>
                            </>                     
                        }
                        { isManualVerified && isTwitterValid &&
                            <>
                                <span className="text-black text-sm mb-1 font-poppins font-light">Add relevant tags</span>
                                <MultiSelect options={Tags} onChange={handleSelectionChange} isRemoved={false} />
                                <span className="text-black text-sm mt-1 mb-2 font-poppins font-light">What are tags</span>
                                <InputGroup 
                                    items={pswInputs.map(input => ({
                                        ...input,
                                        handleChange: handlePasswordChange
                                    }))}
                                />
                                <button className={`${styles.button} mt-10`} onClick={handleRegister}>Register</button>
                            </> 
                        }
                    </div>
                </div>
            </div>
            {loading && (
            <div className="fixed inset-0 bg-white opacity-70 z-50 flex items-center justify-center">
                <Spinner />
            </div>)}
        </div>
       
    );
};

export const getServerSideProps = async (context: any) => {
    const session = await getSession(context);
    return {
        props: {
            session,
        },
    };
};

export default Register;