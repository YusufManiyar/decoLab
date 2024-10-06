import React from "react";
import {NextPage} from "next";
import Image from "next/image";
import Logo from "../public/assets/Screenshot_2023-03-28_at_5.04 1.png";

const styles = {
    container: "flex w-full",
    mainContainer: "flex flex-col justify-center",
    deContainer: "flex flex-col w-full",
    logoSection: "p-20 rounded-lg"
}

const Profile: NextPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.mainContainer}>
                <div className={styles.logoSection}>
                    <Image src={Logo} alt="logo" />
                </div>
            </div>
            <div className={styles.deContainer}></div>
        </div>
    );
}

export default Profile;