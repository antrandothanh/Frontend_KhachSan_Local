import React from "react";
import { useNavigate } from "react-router-dom";

export default function OwnerHotelCard({ hotel }) {
    const navigate = useNavigate();

    const viewDetail = async () => {
        const hotelId = hotel.id;
        navigate("/owner/hotel-info", { state: { hotelId: hotelId } });
    }

    return (
        <div className="w-[900px] bg-white border border-gray-200 shadow flex mb-5">
            
            <div className="w-[500px]">
                <img className="w-full h-full h-80" src="../images/Hotels/Hotel.jpg" alt="product image" />
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
                </div>

                <div className="flex justify-end">
                    <div className="">
                        <button onClick={viewDetail} type="button" class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Xem chi tiết</button>
                    </div>
                </div>
            </div>
        </div>
    );
}