import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useCookies } from "react-cookie";



export default function ForgetPassword() {
    const [email, setEmail] = useState(null);
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/users`);
            const users = response.data.result;
            return users;
        } catch (error) {
            console.error('Cannot fetch users', error);
        }
    }

    const checkUserIsExisted = async (users) => {
        return users.some(user => user.email === email);
    }

    const verifyEmailAPI = async (email) => {
        try {
            const request = await axios.post(`http://localhost:8080/api/forgotPassword/verifyMail/${email}`);
            if (request.data) {
                console.log(request.data);
                navigate("/verify-otp", { state: { email: email } });
            }
        } catch (error) {
            console.error("Cannot use verify email api", error.message);
        }
    }

    const handleSendOTP = async () => {
        const users = await fetchUsers();
        const isUserExisted = await checkUserIsExisted(users);
        if (isUserExisted === false) {
            setMessage('Email không tồn tại');
        } else {
            verifyEmailAPI(email);
        }
    }

    return (
        <div className='flex justify-center'>
            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 ">
                <div className="space-y-6">
                    <h5 className="text-xl font-medium text-gray-900 ">Nhập email</h5>
                    <p className='text-red-600'>{message}</p>
                    <div>
                        <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 " required />
                    </div>
                    <button onClick={handleSendOTP} type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">GỬI MÃ XÁC THỰC</button>
                </div>
            </div>
        </div>


    );
}
