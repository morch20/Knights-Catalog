import React from "react";
import logo from "../assets/Logo-dark.svg"

const Footer = () => {
    const liClass = ' text-sm md:text-md px-1 my-2 text-center cursor-pointer hover:text-[color:var(--yellow)] '
    return (
        <footer className="bg-[#131518] w-full h-full flex flex-col justify-between py-6">
            <ul className="text-white flex flex-col md:flex-row justify-around">
                <li className={liClass}>About us</li>
                <li className={liClass}>Contact us</li>
                <li className={liClass}>Terms</li>
                <li className={liClass}>Privacy and Policy</li>
                <li className={liClass}>Home</li>
            </ul>
            <div>
                <div className="flex justify-center mb-1">
                    <img src={logo} alt="Logo" />
                </div>
                <div className="text-center text-[color:var(--text-secondary-dark)]">
                    <p>Since 2022</p>
                    <p> &copy; COPY RIGHT BY KNIGHTS CATALOG</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;