import React, { ChangeEvent, useState } from "react";
import { NextPage } from "next";
import { InputGroup, Spinner } from "@/components/common";
import { signIn, useSession, getSession } from 'next-auth/react';
import Image from "next/image";
import { FaTwitter } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import Link from "next/link";
import Logo from "../../public/assets/DeCollab.png";
import { emailLogin } from "@/lib/api/auth";
import { toast } from "react-toastify";
import axiosInstance from "@/lib/axiosInstance";
import { useRouter } from "next/router";
import { fetchMe } from "@/lib/api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setUser } from "@/store/slices/userSlice";
import { setAuthToken } from "@/lib/axiosInstance";

const styles = {
    container: "flex w-full",
    mainContainer: "background-image w-[70%] bg-cover h-[100vh] flex",
    logoContainer: "flex flex-col justify-center items-center w-[1222px] h-[100vh]",
    formContainer: "flex flex-col mt-[158px] ml-[100px] w-[340px]",
    form: "mt-10 flex flex-col",
    welcome: "font-poppins welcome-text",
    button: "mt-5 bg-[#1E1E1E] flex justify-center items-center text-white rounded-md p-2 text-sm hover:bg-black"
};

const initialInputs = [
    { label: "Email", type: "text", name: "email", value: "", validation: "", isValid: false },
    { label: "Password", type: "password", name: "password", value: "", validation: "", isValid: false },
];

const Login: NextPage = () => {

    const [inputs, setInputs] = useState(initialInputs);
    const [isTwitterVerified, setIsTwitterVerified] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const dispatch = useDispatch();
    const userData = useSelector((state: RootState) => state.user.userData);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const updatedInputs = inputs.map(input => {
            if(input.name === name) {
                const validate = validator(name, value);
                if(validate !== '') {
                    input.validation = validate;
                    input.isValid = true;
                } else {
                    input.isValid = false;
                }
                input.value = value;
            }
            return input;
        });
        setInputs(updatedInputs);
    }

    const handleSubmit = async () => {
        if(!inputs.some(input => input.isValid)) {
            setLoading(true);
            try{
                const response = await emailLogin({email: inputs[0].value, password: inputs[1].value});
                if(response.ok) {
                    const {token} = response;
                    localStorage.setItem("token", token);
                    await setAuthToken(token);
                    const data = await fetchMe();
                    dispatch(setUser(data.user));
                    toast.success("Welcome back");
                    router.push('/profile/me');
                }else {
                    toast.error(response.message);
                }
            }catch(error) {
                console.error("Login error:", error);
            }finally {
                setLoading(false);
            }
        }
    }

    const handleTwitterSubmit = async () => {
        const result = await signIn('twitter');
        if(result) {
            setIsTwitterVerified(true);
        }
    }

    const validator = (key: string, value: string) => {
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
        }
        if(key === "password" && value === "") {
            return "Please enter your password.";
        }
        return "";
    }

    return (
        <div className={styles.container}>
            <div className={styles.mainContainer}>
                <div className={styles.logoContainer}>
                    <Image src={Logo} alt="logo" />
                </div>
            </div>
            <div className={styles.formContainer}>
                <h1 className={styles.welcome}>Welcome</h1>
                <div className={styles.form}>
                    <InputGroup
                        items={inputs.map(input => ({
                            ...input,
                            handleChange: handleChange
                        }))}
                    />
                    <button
                        className={styles.button}
                        onClick={handleSubmit}
                    >Signin with <MdEmail size={20} color="#ffffff" className="ml-2" /></button>
                    <button
                        className={styles.button}
                        onClick={handleTwitterSubmit}
                    >Signin with <FaTwitter size={20} color="#ffffff" className="ml-2" /></button>
                    <div className="flex mt-4">
                        <span className="font-poppins font-light">Didn't you <Link href="/auth/register" className="decoration-green-600 font-semibold hover:underline hover:text-green-600">register</Link> yet?</span>
                    </div>
                </div>
            </div>
            {loading && (
            <div className="fixed inset-0 bg-black opacity-70 z-50 flex items-center justify-center">
                <Spinner />
            </div>)}
        </div>
    );
}

export default Login