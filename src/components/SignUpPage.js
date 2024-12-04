import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";


export default function SignUpPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8080/api/users`, {
            name,
            email,
            password,
            phone,
            roles: [role]
        })
            .then(response => {
                console.log("Response from backend: ", response.data);
                navigate("/sign-in");
            })
            .catch(error => {
                console.log(error.message);
            })
        
    }


    return (
        <div className="flex justify-center">
            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
                <form className="space-y-6" method='post' onSubmit={handleSubmit}>
                    <h5 className="text-xl font-medium text-gray-900 mb-2">Đăng Kí</h5>
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900">Chọn vai trò</label>
                        <select onChange={(e) => setRole(e.target.value)} id="city" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                            <option selected value="all">Chọn vai trò</option>
                            <option value="CUSTOMER">Khách hàng</option>
                            <option value="OWNER">Chủ khách sạn</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="fullname" className="block mb-2 text-sm font-medium text-gray-900">Họ và tên</label>
                        <input
                            type="text"
                            name='fullname'
                            id="fullname"
                            onChange={(e) => setName(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">Số điện thoại</label>
                        <input
                            type="text"
                            name='phone'
                            id="phone"
                            onChange={(e) => setPhone(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                        <input
                            type="text"
                            name='email'
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Mật khẩu</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name='password'
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
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
                    </div>
                    <input
                        type="submit"
                        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        value="ĐĂNG KÍ"
                    />
                </form>
            </div>
        </div>
    );
}
