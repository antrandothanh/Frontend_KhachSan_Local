import React, { useState, useEffect } from 'react';
import CustomerBookingList from './CustomerBookingList';
import { useCookies } from 'react-cookie';
import axios from 'axios';

export default function CustomerBookingHistoryPage() {
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);
    const [customer, setCustomer] = useState(cookies.user);
    const [rooms, setRooms] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [hotels, setHotels] = useState([]);

    const fetchRooms = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/rooms");
            return response.data.result;
        }
        catch (error) {
            console.error("Cannot fetch rooms: ", error);
        }
    }

    const fetchBookings = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/bookings");
            return response.data.result;
        }
        catch (error) {
            console.error("Cannot fetch rooms: ", error);
        }
    }

    const fetchHotels = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/hotels");
            return response.data.result;
        }
        catch (error) {
            console.error("Cannot fetch rooms: ", error);
        }
    }

    const fetchData = async () => {
        const allBookings = await fetchBookings();
        const allRooms = await fetchRooms();
        const allHotels = await fetchHotels();

        const bookings = allBookings.filter((booking) => booking.customerId === customer.id);
        const rooms = allRooms.filter((room) => bookings.some((booking) => booking.roomId === room.id));
        const hotels = allHotels.filter((hotel) => rooms.some((room) => room.hotelId === hotel.id));
        
        setBookings(bookings);
        setRooms(rooms);
        setHotels(hotels);
    };


    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <div>
                <CustomerBookingList key={customer.id} rooms={rooms} hotels={hotels} bookings={bookings}/>
            </div>
        </div>
    );
}