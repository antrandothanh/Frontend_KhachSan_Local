import React, { useState, useEffect } from 'react';
import axios from "axios";
import CustomerHotelCard from './CustomerHotelCard';


export default function CustomerBookingPage() {
    const [rooms, setRooms] = useState([]);
    const [hotels, setHotels] = useState([]);
    const [selectedCity, setSelectedCity] = useState("all");

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/rooms`);
                setRooms(response.data.result);
            } catch {
                console.error("Cannot fetch data");
            }
        };
        const fetchHotels = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/hotels`);
                setHotels(response.data.result);
                fetchRooms();
            } catch {
                console.error("Cannot fetch data");
            }
        };

        fetchHotels();
    }, []);

    const changeCity = (e) => {
        setSelectedCity(e.target.value);
    }

    return (
        <div className="my-5">
            <div className="bg-slate-200 p-5 mb-10">
                <div className="max-w-sm mx-auto">
                    <div className='mb-3'>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Chọn tỉnh/thành phố</label>
                        <select id="city" value={selectedCity} onChange={changeCity} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                            <option selected value="all">Tất cả</option>
                            <option value="Thành phố Hồ Chí Minh">Thành phố Hồ Chí Minh</option>
                            <option value="Đà Nẵng">Đà Nẵng</option>
                        </select>
                    </div>
                    
                </div>
            </div>
            <div className="flex justify-center">
                <div>

                    {hotels.map((hotel) => {
                        if (selectedCity === "Thành phố Hồ Chí Minh" && hotel.city === "Thành phố Hồ Chí Minh") {
                            return <CustomerHotelCard key={hotel.id} hotel={hotel} />;
                            
                        }
                        else if (selectedCity === "Đà Nẵng" && hotel.city === "Đà Nẵng") {
                            return <CustomerHotelCard key={hotel.id} hotel={hotel} />;
                        }
                        else if (selectedCity === "all") {
                            return <CustomerHotelCard key={hotel.id} hotel={hotel} />;
                        }
                    })}
                </div>

            </div>
        </div>
    );
}