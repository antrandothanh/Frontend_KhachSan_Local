import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import axios from "axios";
import OwnerRoomItem from "./OwnerRoomItem";


export default function OwnerRoom() {
    const location = useLocation();
    const [rooms, setRooms] = useState([]);

    const fetchRooms = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/rooms`);
            const allRooms = response.data.result;
            const filterRooms = allRooms.filter(room => room.hotelId == id);
            setRooms(filterRooms);
        }
        catch {
            console.error("Cannot fetch rooms");
        }
    }

    useEffect(() => {
        const hotelId = location.state.hotelId;
        fetchRooms(hotelId);
    }, []);

    return (
        <div>
            <div className="my-5 text-center">
                <p className="text-3xl capitalize font-bold">Danh sách phòng</p>
            </div>
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" class="px-16 py-3">
                                <span class="sr-only">Image</span>
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Số phòng
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Mô tả
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Giá tiền
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Tình trạng
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Chỉnh sửa
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            rooms.map((room) => {
                                return <OwnerRoomItem key={room.id} room={room} />
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}