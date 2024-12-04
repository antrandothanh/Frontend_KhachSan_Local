import React, { useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function CustomerHoteilDetailRoomItem({ room, checkInDate, checkOutDate }) {
    const navigate = useNavigate();

    const [cookies, setCookie, removeCookie] = useCookies(["user"]);

    const booking = async (roomId, customerId, checkInDate, checkOutDate, status) => {
        try {
            const request = await axios.post(`http://localhost:8080/api/bookings`, {
                roomId,
                customerId,
                checkInDate,
                checkOutDate,
                status
            });
            const bookingId = request.data.result.id;
            console.log("Booking successfully: ", bookingId);
            return bookingId;
        }
        catch (error) {
            console.error("Booking fail: ", error);
        }
    }

    const createPaymentAPI = async (bookingId) => {
        try {
            const request = await axios.post(`http://localhost:8080/api/VnPay/${bookingId}`, {
                bookingId: bookingId
            });
            console.log("Use create payment API successfully: ", request);
            const vnPayLink = request.data.result;
            if (vnPayLink) {
                window.open(vnPayLink, '_blank');
            }
        }
        catch (error) {
            console.error("Cannot use create payment API: ", error);
        }
    }

    const bookRoom = async () => {
        const user = cookies.user;
        if (user == null) {
            alert("Bạn chưa đăng nhập tài khoản");
        }
        else {
            if (checkInDate == null || checkOutDate == null) {
                alert("Bạn chưa chọn ngày");
            }
            else {
                const bookingId = await booking(room.id, user.id, checkInDate, checkOutDate, "PENDING");
                navigate("/payment", {state: {bookingId: bookingId}});
            }
        }
    }


    return (
        <>
            <tr class="bg-white border-b hover:bg-gray-50">
                <td class="w-[300px] p-4">
                    <img src={room.imageLocation} class="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
                </td>
                <td class="px-6 py-4 w-[300px] font-semibold text-gray-900 ">
                    {room.description}
                </td>
                <td class="px-6 py-4 w-[300px] font-semibold text-gray-900 ">
                    {room.price} đồng
                </td>
                <td class="px-6 w-[300px] py-4">
                    <button onClick={bookRoom} type="button" class="text-white bg-green-500 hover:bg-white hover:text-green-500 border border-green-500 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Đặt phòng ngay</button>
                </td>
            </tr>
        </>
    );
}