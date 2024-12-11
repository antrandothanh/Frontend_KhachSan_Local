import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function CustomerAllHotelImages() {
    const navigate = useNavigate();
    const location = useLocation();
    const hotelId = location.state.hotelId;
    const [hotelImages, setHotelImages] = useState([]);
    const {city} = useParams();

    const fetchImages = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/hotels/${id}`);
            setHotelImages(response.data.result.hotelImages);
        } catch (error) {
            console.error("Cannot fetch hotel:", error);
        }
    }

    const handleReturn = (e) => {
        e.preventDefault();
        navigate(`/${city}/hotel-detail`, { state: { hotelId: hotelId } });
    }

    useEffect(() => {
        fetchImages(hotelId);
    }, []);
    return (
        <div className="py-8 px-64">
            <div className="mb-5">
                <a href="/hotel-detail/all-images" onClick={handleReturn} style={{ cursor: "pointer" }} class="inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline">

                    <svg class="w-4 h-4 mr-2 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0L5 9m-4-4L5 1" />
                    </svg>

                    Quay lại
                </a>
            </div>
            {/* <div className="flex justify-center mb-2 max-w-full">
                {hotelImages.map((hotelImage) => (
                    <div>
                        <img
                            alt="hotel-image"
                            src={hotelImage.imageUrl}
                            className="h-96 max-w-lg transition-transform duration-300 hover:scale-105"
                        />
                    </div>
                ))}
            </div> */}
            <div className="flex flex-wrap gap-4">
                {hotelImages.map((hotelImage) => (
                    <div>
                        <img
                            alt="hotel-image"
                            src={hotelImage.imageUrl}
                            className="h-96 max-w-lg transition-transform duration-300 hover:scale-105"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}