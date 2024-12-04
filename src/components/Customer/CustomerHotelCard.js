import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StarRatingHotelResult from "./StarRatingHotelResult.js";
export default function CustomerHotelCard({ hotel }) {
    const navigate = useNavigate();
    const viewDetail = async () => {
        const hotelId = hotel.id;
        navigate("/hotel-detail", { state: {hotelId: hotelId} });
    }
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
                        <span className="font-semibold">Địa chỉ: </span> {hotel.street}, {hotel.district}, {hotel.city}
                    </div>
                    <div className="mt-3">
                        <StarRatingHotelResult ratingPoint={hotel.rating} />
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