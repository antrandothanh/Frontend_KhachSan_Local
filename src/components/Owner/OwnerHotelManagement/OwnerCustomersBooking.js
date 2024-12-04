import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";


export default function OwnerCustomersBooking() {
    const location = useLocation();
    const hotelId = location.state.hotelId;
    const [hotelCustomers, setHotelCustomers] = useState([]);
    const [hotelRooms, setHotelRooms] = useState([]);
    const [hotelBookings, setHotelBookings] = useState([]);
    const [searchedPhone, setSearchedPhone] = useState("");

    const fetchCustomers = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/users`);
            const allUsers = response.data.result;
            return allUsers.filter((user) => user.roles[0].name === "CUSTOMER");
        } catch (error) {
            console.error("Cannot fetch customers: ", error);
            return [];
        }
    };

    const fetchBookings = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/bookings`);
            return response.data.result;
        } catch (error) {
            console.error("Cannot fetch bookings: ", error);
            return [];
        }
    };

    const fetchRooms = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/rooms`);
            return response.data.result;
        } catch (error) {
            console.error("Cannot fetch rooms: ", error);
            return [];
        }
    };

    const searchBookingsByPhone = async (hotelBookings, hotelCustomers, searchedPhone) => {
        // Tìm user có cùng số điện thoại
        const isFoundCustomers = false;
        const customersHaveSamePhone = hotelCustomers.filter((customer) => customer.phone.includes(searchedPhone));
        // tìm các bookings dựa theo user vừa tìm
        const bookingsHaveSameCustomerPhone = hotelBookings.filter((booking) => customersHaveSamePhone.some((customer) => customer.id === booking.customerId));

        return bookingsHaveSameCustomerPhone;
    }

    const fetchData = async () => {
        const allCustomers = await fetchCustomers();
        const allBookings = await fetchBookings();
        const allRooms = await fetchRooms();

        const hotelRooms = allRooms.filter((room) => room.hotelId === hotelId);
        const hotelBookings = allBookings.filter((booking) => hotelRooms.some((room) => room.id === booking.roomId));
        const hotelCustomers = allCustomers.filter((customer) => hotelBookings.some((booking) => booking.customerId === customer.id));

        setHotelCustomers(hotelCustomers);
        setHotelRooms(hotelRooms);

        console.log(hotelCustomers);


        if (searchedPhone === "" || searchedPhone === null) {
            setHotelBookings(hotelBookings);
        }
        else {
            const filterHotelBookings = await searchBookingsByPhone(hotelBookings, hotelCustomers, searchedPhone);
            setHotelBookings(filterHotelBookings);
        }
    };

    useEffect(() => {
        fetchData();
    }, [hotelId, searchedPhone]);

    return (
        <div>
            <div className="my-5 text-center">
                <p className="text-3xl capitalize font-bold">Danh sách khách hàng</p>
            </div>
            <div className="flex mb-4 justify-center">
                <div className="mx-2">
                    <label className="block mb-2 text-sm font-medium">Số điện thoại</label>
                    <input
                        type="text"
                        className="bg-gray-50 h-[38px] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        onChange={(e) => setSearchedPhone(e.target.value)}
                        placeholder="Nhập số điện thoại"
                    />
                </div>

            </div>

            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Ngày đặt</th>
                            <th scope="col" className="px-6 py-3">Khách hàng</th>
                            <th scope="col" className="px-6 py-3">Số điện thoại</th>
                            <th scope="col" className="px-6 py-3">Phòng</th>
                            <th scope="col" className="px-6 py-3">Check in</th>
                            <th scope="col" className="px-6 py-3">Check out</th>
                            <th scope="col" className="px-6 py-3">Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hotelBookings.map((hotelBooking) => {
                            const hotelCustomer = hotelCustomers.find(
                                (customer) => customer.id === hotelBooking.customerId
                            );
                            const room = hotelRooms.find((room) => room.id === hotelBooking.roomId);
                            const checkIn = new Date(hotelBooking.checkInDate);
                            const formattedCheckIn = `${checkIn.getDate()}/${checkIn.getMonth() + 1}/${checkIn.getFullYear()}`;
                            const checkOut = new Date(hotelBooking.checkOutDate);
                            const formattedCheckOut = `${checkOut.getDate()}/${checkOut.getMonth() + 1}/${checkOut.getFullYear()}`;
                            return (
                                <tr
                                    key={hotelBooking.id}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                >
                                    <td
                                        className="px-6 py-4"
                                    >
                                        {hotelBooking ? hotelBooking.createdAt : "Unknown"}
                                    </td>
                                    <td
                                        className="px-6 py-4"
                                    >
                                        {hotelCustomer ? hotelCustomer.name : "Unknown"}
                                    </td>
                                    <td className="px-6 py-4">
                                        {hotelCustomer ? hotelCustomer.phone : "N/A"}
                                    </td>
                                    <td className="px-6 py-4">
                                        {room ? room.name : "N/A"}
                                    </td>
                                    <td className="px-6 py-4">{formattedCheckIn ? formattedCheckIn : "N/A"}</td>
                                    <td className="px-6 py-4">{formattedCheckOut ? formattedCheckOut : "N/A"}</td>
                                    <td className="px-6 py-4">{hotelBooking.status}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
