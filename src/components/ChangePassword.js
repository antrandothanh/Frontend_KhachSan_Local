import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";
import { useCookies } from "react-cookie";



export default function ChangePassword() {
    const [newPassword, setNewPassword] = useState(null);
    const [retypedNewPassword, setRetypedNewPassword] = useState(null);
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state.email;

    const changePasswordAPI = async (newPassword, retypedNewPassword, email) => {
        try {
            const request = await axios.post(`http://localhost:8080/forgotPassword/changePassword/${email}`, {
                password: newPassword,
                repeatPassword: retypedNewPassword
            });
            if (request.data) {
                console.log(request.data);
                setMessage("Thay đổi mật khẩu thành công");
            }
        } catch (error) {
            setMessage("Thay đổi thất bại");
            console.error("Cannot use change password API", error);
        }
    }


    const handleChangePassword = async () => {
        if (newPassword == null || newPassword == "" || retypedNewPassword == null || retypedNewPassword == "") {
            setMessage("Bạn chưa nhập đầy đủ thông tin");
        } else {
            if (newPassword === retypedNewPassword) {
                await changePasswordAPI(newPassword, retypedNewPassword, email);
            } else {
                setMessage("2 thông tin không giống nhau");
            }
            
        }
    }

    return (
        <div className='flex justify-center'>
            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 ">
                <div className="space-y-6">
                    <h5 className="text-xl font-medium text-gray-900 ">Thay đổi mật khẩu</h5>
                    <p className='text-red-600'>{message}</p>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Mật khẩu mới</label>
                        <input
                            type="password"
                            onChange={(e) => { setNewPassword(e.target.value) }}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Nhập lại mật khẩu mới</label>
                        <input
                            type="password"
                            onChange={(e) => { setRetypedNewPassword(e.target.value) }}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required
                        />
                    </div>
                    <button onClick={handleChangePassword} type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">XÁC NHẬN</button>
                </div>
            </div>
        </div>


    );
}
