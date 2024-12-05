import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";
import { useCookies } from "react-cookie";



export default function VerifyOTP() {
    const [otp, setOtp] = useState(null);
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state.email;

    const verifyOtpAPI = async (otp, email) => {
        try {
            const request = await axios.post(`http://localhost:8080/api/forgotPassword/verifyOtp/${otp}/${email}`);
            if (request.data) {
                console.log(request.data);
                navigate("/change-password", { state: { email: email } });
            } 
        } catch (error) {
            console.error("Cannot use verify otp api", error.message);
        }
    }

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        if (otp == "" || otp == null) {
            setMessage("Vui lòng nhập OTP");
        } else {
            await verifyOtpAPI(otp, email);
        }
    }

    return (
        <div className='flex justify-center'>
            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 ">
                <div className="space-y-6">
                    <h5 className="text-xl font-medium text-gray-900 ">Nhập OTP</h5>
                    <p className='text-red-600'>{message}</p>
                    <div>
                        <input onChange={(e) => setOtp(e.target.value)} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "  required />
                    </div>
                    <button onClick={handleVerifyOTP} type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">XÁC NHẬN</button>
                </div>
            </div>
        </div>


    );
}
