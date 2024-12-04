import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function OwnerRoomItem({ room }) {
    const [roomIsAvailable, setRoomIsAvailable] = useState(room.available);
    const navigate = useNavigate();
    const location = useLocation();

    const editRoom = (e) => {
        e.preventDefault();
        const hotelId = location.state.hotelId;
        navigate("/owner/hotel-info/update-room", {state: { roomId: room.id, hotelId: hotelId}});
    }

    return (
        <>
            <tr class="bg-white border-b hover:bg-gray-50">
                <td class="w-[300px] p-4">
                    <img src={room.imageLocation} class="w-16 md:w-32 max-w-full max-h-full" alt="Hình phòng" />
                </td>
                <td class="px-6 py-4 w-[300px] font-semibold text-gray-900 ">
                    {room.name}
                </td>
                <td class="px-6 py-4 w-[300px] font-semibold text-gray-900 ">
                    {room.description}
                </td>
                <td class="px-6 py-4 w-[300px] font-semibold text-gray-900 ">
                    {room.price} đồng
                </td>
                <td class="px-6 py-4 w-[300px] font-semibold text-gray-900">
                    {roomIsAvailable ? (
                        <span type="button" className="text-white bg-green-500 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Có thể cho thuê</span>
                    ) : (
                        <span type="button" className="text-white bg-red-500 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Tạm đóng</span>
                    )}

                </td>
                <td class="px-6 py-4 w-[300px] font-semibold text-gray-900 ">
                    <a href="#" onClick={editRoom} class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Đặt tình trạng</a>
                </td>
            </tr>
        </>
    );
}