import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { MdMessage, MdNotifications } from "react-icons/md";
import { useRouter } from "next/router";

const styles = {
    container: "basis-1/6 flex flex-col border-dashboard px-4 py-10 rounded-md",
    menuContainer: "flex items-center gap-4 group cursor-pointer transition-colors duration-200",
    menuText: "font-poppins font-light text-xl transition-colors duration-200",
    menuIcon: "w-6 h-6 transition-colors duration-200",
    active: "text-black",
    inactive: "text-gray-400",
    hover: "group-hover:text-black",
};

export const Navbar: NextPage = () => {
    const [selected, setSelected] = useState<string>("");
    const router = useRouter();

    useEffect(() => {
        const path = router.pathname;
        if (path.includes('dashboard')) {
            setSelected("home");
        } else if (path.includes("chats")) {
            setSelected("chats");
        } else if (path.includes("notifications")) {
            setSelected("notifications");
        }
    }, [router.pathname]);

    return (
        <div className={styles.container}>
            <Link href="/dashboard" className={styles.menuContainer} onClick={() => setSelected("home")}>
                <FaHome className={`${styles.menuIcon} ${selected === "home" ? styles.active : styles.inactive} ${styles.hover}`} />
                <span className={`${styles.menuText} ${selected === "home" ? styles.active : styles.inactive} ${styles.hover}`}>Home</span>
            </Link>
            <Link href="/chats" className={`${styles.menuContainer} mt-8`} onClick={() => setSelected("chats")}>
                <MdMessage className={`${styles.menuIcon} ${selected === "chats" ? styles.active : styles.inactive} ${styles.hover}`} />
                <span className={`${styles.menuText} ${selected === "chats" ? styles.active : styles.inactive} ${styles.hover}`}>Chats</span>
            </Link>
            <Link href="/notifications" className={`${styles.menuContainer} mt-8`} onClick={() => setSelected("notifications")}>
                <MdNotifications className={`${styles.menuIcon} ${selected === "notifications" ? styles.active : styles.inactive} ${styles.hover}`} />
                <span className={`${styles.menuText} ${selected === "notifications" ? styles.active : styles.inactive} ${styles.hover}`}>Notification</span>
            </Link>
        </div>
    );
};
