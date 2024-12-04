import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import OwnerHotelCard from "./OwnerHotelCard";


export default function OwnerHotelsPage() {
    const [hotels, setHotels] = useState([]);
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);
    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const user = cookies.user;
                const response = await axios.get(`http://localhost:8080/api/hotels`);
                const hotelsTemp = response.data.result;
                const hotels = hotelsTemp.filter(hotel => hotel.ownerId === user.id);
                setHotels(hotels);
            }
            catch {
                console.error("Cannot fetch hotels");
            }
        }
        fetchHotels();
    }, []);
    return (
        <div className="my-5">
            <div className="text-center mb-5 bg-slate-200 py-5">
                <p className="text-4xl font-bold">
                    Quản lý khách sạn
                </p>
            </div>
            <div className="flex justify-center">
                <div>
                    {hotels.map((hotel) => {
                        return <OwnerHotelCard key={hotel.id} hotel={hotel} />;
                    })}
                </div>

            </div>
        </div>
    );
}