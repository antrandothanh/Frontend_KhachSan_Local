import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";


export default function OwnerPostRoom() {
    const location = useLocation();
    const [roomId, setRoomId] = useState(location.state.roomId);
    const [description, setDescription] = useState();
    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [available, setAvailable] = useState();
    const [imageLocation, setImageLocation] = useState();
    const [message, setMessage] = useState("");

    const fetchRoom = async (id) => {

        try {
            const response = await axios.get(`http://localhost:8080/api/rooms/${id}`);
            const result = response.data.result;
            setName(result.name);
            setDescription(result.description);
            setPrice(result.price);
            setAvailable(result.available);
            setImageLocation(result.imageLocation);            
        }
        catch {
            console.error("Cannot fetch room");
        }

    }

    const updateRoom = async (id) => {
        try {
            const response = await axios.put(`http://localhost:8080/api/rooms/${id}`, {
                name,
                description,
                price,
                available,
                imageLocation
            });
            setMessage("Cập nhật thành công");

        }
        catch {
            setMessage("Cập nhật thất bại");
            console.error("Cannot update room");
        }
    }

    const handleUpdate = () => {
        updateRoom(roomId);
    }

    useEffect(() => {
        fetchRoom(roomId);
    }, []);

    return (
        <div>
            <div className="my-5 text-center">
                <p className="text-3xl capitalize font-bold">Cập nhật phòng</p>
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
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                type="text"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"

                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 ">Giá tiền</label>
                            <input
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                type="text"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"

                            />
                        </div>
                        <div class="flex items-center mb-4">
                            <input
                                id="default-checkbox"
                                type="checkbox"
                                checked={!available}
                                onChange={(e) => setAvailable(!e.target.checked)}
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 " />
                            <label for="default-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Tạm đóng</label>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={handleUpdate}
                        class="mr-2 text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                        Cập nhật
                    </button>
                </form>
                <div>
                    <p class="text-base text-red-500 dark:text-white">{message}</p>
                </div>
            </div>
        </div>
    );
}