import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";


export default function OwnerPostRoom() {
    const location = useLocation();
    const [description, setDescription] = useState();
    const [name, setName] = useState();
    const [imageLocation, setImageLocation] = useState("/images/Room1.jpg");
    const [price, setPrice] = useState();
    const [hotelId, setHotelId] = useState(location.state.hotelId);
    const [message, setMessage] = useState("");

    const uploadImage = (e) => {
        console.log(`/images/${e.target.files[0].name}`);
        setImageLocation(`/images/${e.target.files[0].name}`);
    }

    const postRoom = (e) => {
        e.preventDefault();
        try {
            const response = axios.post(`http://localhost:8080/api/rooms`, {
                hotelId,
                name,
                description,
                price,
                available: true,
                imageLocation
            });
            console.log("Room created successfully: ", response);
            setMessage("Tạo phòng thành công");
        }
        catch {
            console.error("Can not create new room");
        }
    }

    return (
        <div>
            <div className="my-5 text-center">
                <p className="text-3xl capitalize font-bold">Đăng phòng mới</p>
            </div>
            <div className="my-5 mx-56">
                <form>
                    <div className="grid gap-6 mb-6 md:grid-cols-2">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 ">Số phòng</label>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 ">Mô tả</label>
                            <input
                                type="text"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 ">Giá tiền</label>
                            <input
                                type="text"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 ">Chọn ảnh</label>
                            <input type="file" onChange={uploadImage} />
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={postRoom}
                        class="mr-2 text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                        Lưu
                    </button>
                </form>
                <div>
                    <p class="text-base text-red-500 dark:text-white">{message}</p>
                </div>
            </div>
        </div>
    );
}