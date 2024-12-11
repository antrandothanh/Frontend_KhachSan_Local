import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StarRatingHotelResult from "./StarRatingHotelResult.js";
import axios from "axios";
export default function CustomerHotelCard({ hotel, city, selectedCheckOutDate, selectedCheckInDate }) {
    const navigate = useNavigate();
    const [lowestPrice, setLowestPrice] = useState(null);
    const [emptyRoomsQuantity, setEmptyRoomsQuantity] = useState(null);
    const viewDetail = async () => {
        const hotelId = hotel.id;
        navigate(`/${city}/hotel-detail`, {
            state: {
                hotelId: hotelId,
                selectedCheckInDate: selectedCheckInDate,
                selectedCheckOutDate: selectedCheckOutDate
            }
        });
    }

    const fetchRooms = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/rooms`);
            const allRooms = Array.isArray(response.data.result) ? response.data.result : Array.from(response.data.result);

            const hotelId = hotel.id;
            const rooms = allRooms.filter((room) => room.hotelId === hotelId);

            if (rooms.length > 0) {
                const prices = rooms.map((room) => room.price);
                const minPrice = Math.min(...prices);
                setLowestPrice(minPrice);
            } else {
                setLowestPrice(null);  // If no rooms are found, reset price
            }
            return rooms;
        } catch (error) {
            console.error("Cannot fetch rooms", error);
        }
    }

    const fetchBookings = async (rooms) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/bookings`);
            const allBookings = response.data.result;
            if (!Array.isArray(allBookings)) {
                allBookings = Array.from(allBookings);
            }
            const filterBookings = allBookings.filter((booking) => rooms.some((room) => room.id === booking.roomId));
            return filterBookings;
        } catch (error) {
            console.error("Cannot fetch all bookings", error);
        }
    }

    const countEmptyRoom = async (rooms, bookings) => {
        try {
            const newCheckIn = new Date(selectedCheckInDate);
            const newCheckOut = new Date(selectedCheckOutDate);
            const bookedRooms = bookings.filter(booking => {
                const oldCheckIn = new Date(booking.checkInDate);
                const oldCheckOut = new Date(booking.checkOutDate);
                return (
                    (newCheckIn >= oldCheckIn && newCheckIn < oldCheckOut) ||
                    (newCheckOut > oldCheckIn && newCheckOut <= oldCheckOut) ||
                    (newCheckIn < oldCheckIn && newCheckOut > oldCheckOut)
                );
            });
            const bookedRoomIds = bookedRooms.map(booking => booking.roomId);
            const emptyRooms = rooms.filter(room => !bookedRoomIds.includes(room.id));
            setEmptyRoomsQuantity(emptyRooms.length);

        } catch (error) {
            console.error("Cannot get empty rooms", error);
        }
    }

    const fetchData = async () => {
        try {
            const rooms = await fetchRooms();
            const bookings = await fetchBookings(rooms);
            await countEmptyRoom(rooms, bookings);
        } catch (error) {
            console.error("Error fetching data", error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [hotel.id, selectedCheckInDate, selectedCheckOutDate]);

    return (
        <div className="w-[900px] bg-white border border-gray-200 shadow flex mb-5">
            <div className="w-[500px]">
                <img className="w-full h-full h-80" src={hotel.hotelImages[0].imageUrl} alt="product image" />
            </div>

            <div className="p-8 w-full">
                <div className="mb-5">
                    <div className="font-bold text-2xl cursor-default">
                        Khách sạn {hotel.name}
                    </div>
                    <hr class="h-px my-4 bg-gray-900 border-0" />
                    <div className="text-lg">
                        <span className="font-semibold">Giá chỉ từ: </span> {lowestPrice} đồng
                    </div>
                    <div className="text-lg">
                        <span className="font-semibold">Số lượng phòng trống: </span> {emptyRoomsQuantity} phòng
                    </div>
                    <div className="text-lg">
                        <span className="font-semibold">Địa chỉ: </span> {hotel.street}, {hotel.district}, {hotel.city}
                    </div>
                    <div className="mt-3">
                        Điểm đánh giá: <StarRatingHotelResult ratingPoint={hotel.rating} />
                    </div>
                </div>

                <div className="flex justify-end">
                    <div className="">
                        <button onClick={viewDetail} type="button" class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">Xem chi tiết</button>
                    </div>
                </div>
            </div>
        </div>
    );
}