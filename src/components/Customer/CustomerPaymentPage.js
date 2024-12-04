import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useLocation } from "react-router-dom";


export default function CustomerPaymentPage() {
    const location = useLocation();
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);
    const [customerName, setCustomerName] = useState(cookies.user.name);
    const [customerEmail, setCustomerEmail] = useState(cookies.user.email);
    const [customerPhone, setCustomerPhone] = useState(cookies.user.phone);
    const [checkIn, setCheckIn] = useState();
    const [checkOut, setCheckOut] = useState();
    const [hotelAddress, setHotelAddress] = useState();
    const [roomNumber, setRoomNumber] = useState();
    const [hotelName, setHotelName] = useState();

    const fetchBookingById = async (bookingId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/bookings/${bookingId}`);
            const result = response.data.result;
            return result;
        }
        catch (error) {
            console.error(error);
        }
    }

    const fetchRoomByBookingId = async (booking) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/rooms`);
            const allRooms = response.data.result;
            const room = allRooms.find((room) => room.id === booking.roomId);
            return room;
        }
        catch (error) {
            console.error(error);
        }
    }

    const fetchHotelByRoomId = async (room) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/hotels`);
            const allHotels = response.data.result;
            const hotel = allHotels.find((hotel) => hotel.id === room.hotelId);
            return hotel;
        }
        catch (error) {
            console.error(error);
        }
    }

    const fetchData = async () => {
        const booking = await fetchBookingById(location.state.bookingId);
        const room = await fetchRoomByBookingId(booking);
        const hotel = await fetchHotelByRoomId(room);

        setHotelName(hotel.name);
        setRoomNumber(room.name);
        setHotelAddress(`${hotel.street}, ${hotel.district}, ${hotel.city}`);
        setCheckIn(booking.checkInDate);
        setCheckOut(booking.checkOutDate);
    }

    const createPaymentAPI = async (bookingId) => {
        try {
            const request = await axios.post(`http://localhost:8080/api/VnPay/${bookingId}`, {
                bookingId: bookingId
            });
            console.log("Use create payment API successfully: ", request);
            const vnPayLink = request.data.result;
            if (vnPayLink) {
                //window.open(vnPayLink, '_blank');
                window.location.href = vnPayLink;
            }
        }
        catch (error) {
            console.error("Cannot use create payment API: ", error);
        }
    }

    const handlePayment = async (e) => {
        e.preventDefault();
        await createPaymentAPI(location.state.bookingId);
    }

    useEffect(() => {
        fetchData();
    })
    return (
        <div className="my-5 mx-[600px]">

            <p className="text-2xl dark:text-white text-center mb-6">Thông tin khách hàng</p>
            <form>
                <div className="mb-6">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Họ và tên
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                    />
                </div>

                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Địa chỉ email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={customerEmail}
                            onChange={(e) => setCustomerEmail(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Số điện thoại
                        </label>
                        <input
                            type="text"
                            id="phone"
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required
                        />
                    </div>
                </div>

                <p className="text-2xl dark:text-white text-center mb-6">Thông tin đặt phòng</p>

                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label htmlFor="hotelName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Tên khách sạn
                        </label>
                        <input
                            type="text"
                            id="hotelName"
                            value={hotelName}
                            readOnly
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        />
                    </div>
                    <div>
                        <label htmlFor="roomName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Số phòng
                        </label>
                        <input
                            type="text"
                            id="roomName"
                            value={roomNumber}
                            readOnly
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        />
                    </div>
                </div>

                <div className="mb-6">
                    <label htmlFor="hotelAddress" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Địa chỉ khách sạn
                    </label>
                    <input
                        type="text"
                        id="hotelAddress"
                        value={hotelAddress}
                        readOnly
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                </div>

                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label htmlFor="checkIn" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Ngày nhận phòng
                        </label>
                        <input
                            type="text"
                            id="checkIn"
                            value={checkIn}
                            readOnly
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        />
                    </div>
                    <div>
                        <label htmlFor="checkOut" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Ngày trả phòng
                        </label>
                        <input
                            type="text"
                            id="checkOut"
                            value={checkOut}
                            readOnly
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    onClick={handlePayment}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                >
                    THANH TOÁN
                </button>
            </form>
        </div>
    );
}