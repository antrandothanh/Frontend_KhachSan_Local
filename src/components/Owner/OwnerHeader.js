import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function OwnerHeader() {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);
    const [name, setName] = useState("default name");
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token == null) {
            setIsSignedIn(false);

        } else {
            setIsSignedIn(true);
            const user = cookies.user;
            const userName = user.name;
            setName(userName);
        }
    }, []);
    const handleSignOut = () => {
        localStorage.removeItem("accessToken");
        removeCookie("user", { path: "/" });
        navigate("/");
        window.location.reload();
    }
    return (
        <div class="py-5 mb-3">
            <nav class="bg-white border-gray-200">
                <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <div class="flex items-center space-x-3 rtl:space-x-reverse">
                        <span class="self-center text-2xl font-bold">BOOKING</span>
                    </div>
                    <div class="items-center justify-between w-full md:flex md:w-auto md:order-1" id="navbar-cta">
                        <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
                            <li>
                                <a
                                    href="/owner"
                                    class="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700">
                                    Danh sách khách sạn
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/owner/register-hotel"
                                    class="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700">
                                    Đăng ký khách sạn
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">

                        {isSignedIn ? (
                            <div>
                                <span>{name}</span>
                                <button
                                    onClick={handleSignOut}
                                    className="mx-3 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center">
                                    ĐĂNG XUẤT
                                </button>
                            </div>
                        ) : (
                            <div>
                                <a
                                    href="/sign-in"
                                    className="mx-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center">
                                    ĐĂNG NHẬP
                                </a>
                                <a
                                    href="/sign-up"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center">
                                    ĐĂNG KÍ
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default OwnerHeader;
