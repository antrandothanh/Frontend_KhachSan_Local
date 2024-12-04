import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import {useCookies} from "react-cookie";



export default function SignInPage() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState("");
    const [signInMessage, setSignInMessage] = useState(null);
    const [cookies, setCookie] = useCookies(["user"]);

    const fetchUserInfo = async (token) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/users/my-info`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            });
            setCookie("user", response.data.result, { path: "/" });
            return response.data.result;
        }
        catch {
            console.error("Cannot fetch user info");
            return null;
        }
    }

    const handleNavigation = async (role) => {
        if (role == "CUSTOMER") {
            navigate("/");
        }
        else if (role == "OWNER") {
            navigate("/owner");
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8080/api/auth/token`, {
            username,
            password
        })
            .then(async (res) => {
                const token = res.data.result.token;
                localStorage.setItem('accessToken', token);
                const userInfo = await fetchUserInfo(token);
                if (userInfo) {
                    const role = userInfo.roles[0].name;
                    handleNavigation(role);
                    window.location.reload();
                }
            })
            .catch(err => {
                console.error(err.message);
                setSignInMessage("Email hoặc mật khẩu bị sai");
            })
    };

    return (
        <div className="flex justify-center">
            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
                <form className="space-y-6" method='post' onSubmit={handleSubmit}>
                    <h5 className="text-xl font-medium text-gray-900 mb-2">Đăng Nhập</h5>
                    <p className='text-red-600'>{signInMessage}</p>
                    <div>
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                        <input
                            type="text"
                            onChange={(e) => { setUsername(e.target.value) }}
                            name='username'
                            id="username"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Mật Khẩu</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name='password'
                            id="password"
                            onChange={(e) => { setPassword(e.target.value) }}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required
                        />
                    </div>
                    <div className="flex items-start">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input
                                    checked={showPassword}
                                    onChange={() => setShowPassword(!showPassword)}
                                    type="checkbox"
                                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                                />
                            </div>
                            <label className="ms-2 text-sm font-medium text-gray-900">Hiện mật khẩu</label>
                        </div>
                        <a href="/forgot-password" className="ms-auto text-sm text-blue-700 hover:underline">Quên mật khẩu?</a>
                    </div>
                    <input
                        type="submit"
                        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        value="ĐĂNG NHẬP"
                    />
                    <div className="text-sm font-medium text-gray-500">
                        Chưa có tài khoản? <a href="/sign-up" className="text-blue-700 hover:underline">Đăng kí</a>
                    </div>
                </form>
            </div>
        </div>
    );
}
