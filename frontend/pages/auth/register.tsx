import React, { ChangeEvent, FormEvent, useEffect, useState, useRef } from "react";
import { NextPage } from "next";
import Image from "next/image";
import { InputGroup } from "@/components/common";
import { TwitterForm } from "@/components/authForms";
import { signIn, useSession, getSession } from 'next-auth/react';
import { MultiSelect } from "@/components/common";
import Logo from "../../public/assets/DeCollab.png";

const styles = {
    container: "background-image w-[70%] bg-cover h-[100vh] flex",
    logoContainer: "flex flex-col justify-center items-center w-[1222px] h-[100vh]",
    formContainer: "flex flex-col",
    button: "mt-5 bg-[#1E1E1E] block text-white rounded-md p-2 text-sm hover:bg-black"
};

const initialInputs = [
    { label: "Company Name", type: "text", name: "name", value: "", validation: "", isValid: false },
    { label: "Email", type: "text", name: "email", value: "", validation: "", isValid: false },
    { label: "Telegram username", type: "text", name: "telegram", value: "", validation: "", isValid: false },
    { label: "Website Url", type: "text", name: "websiteUrl", value: "", validation: "", isValid: false },
];

const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

const Register: NextPage = () => {
    const [manualInputs, setManualInputs] = useState(initialInputs);
    const [twitterHandle, setTwitterHandle] = useState<string>('');
    const [isTwitterValid, setIsTwitterValid] = useState<boolean>(false);
    const [isTwitterVerified, setIsTwitterVerified] = useState<boolean>(false);
    const [isManualVerified, setIsManualVerified] = useState<boolean>(false);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const { data: session } = useSession();

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
        if(manualInputs.some(input => input.isValid)) {
            alert('Please fill the required input.')
            return;
        }
    };

    const handleSelectionChange = (selected: string[]) => {
        setSelectedTags(selected);
        console.log('Selected options:', selected);
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
        return "";
    };

    return (
        <div className="flex w-full">
            <div className={styles.container}>
                <div className={styles.logoContainer}>
                    <Image src={Logo} alt="logo" />
                </div>
            </div>
            <div className={`${styles.formContainer} mt-[158px] ml-[100px] w-[340px]`}>
                <h1 className="font-poppins welcome-text">Welcome</h1>
                <div className="mt-10 flex flex-col">
                    {/* { !isTwitterVerified ? 
                        <TwitterForm
                            value={twitterHandle}
                            isTwitterValid={isTwitterValid}
                            handleChange={handleTwitterChange}
                            handleSubmit={handleTwitterSubmit}
                        /> :
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
                    { isManualVerified && isTwitterValid && */}
                         <>
                            <MultiSelect options={options} onChange={handleSelectionChange} />
                            <button className={`${styles.button} mt-10`}>Register</button>
                         </> 

                    {/* } */}
                </div>
            </div>
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