import React, { useState, useEffect } from 'react';
import axios from "axios";
import CustomerHotelCard from './CustomerHotelCard';
import { useParams, useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

export default function CustomerBookingPage() {
    const [hotels, setHotels] = useState([]);
    const { cityUrl } = useParams();
    const [selectedCity, setSelectedCity] = useState(cityUrl);
    const navigate = useNavigate();
    const [selectedCheckInDate, setSelectedCheckInDate] = useState(null);
    const [selectedCheckOutDate, setSelectedCheckOutDate] = useState(null);
    const [isPriceIncrease, setIsPriceIncrease] = useState(true);

    // utilities state
    const [isBuffett, setIsBuffett] = useState(false);
    const [isWifi, setIsWifi] = useState(false);
    const [isElevator, setIsElevator] = useState(false);
    const [isGarden, setIsGarden] = useState(false);
    const [isNearBeach, setIsNearBeach] = useState(false);
    const [isParking, setIsParking] = useState(false);
    const [isReceiptionist, setIsReceiptionist] = useState(false);
    const [isRestaurant, setIsRestaurant] = useState(false);
    const [isRooftop, setIsRooftop] = useState(false);
    const [isPool, setIsPool] = useState(false);

    const fetchAllHotels = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/hotels`);
            return response.data.result;
        } catch {
            console.error("Cannot fetch data");
        }
    };

    const filterHotelsByCity = async (allHotels, cityUrl) => {
        if (!Array.isArray(allHotels)) {
            console.error("allHotels must be an array.");
            allHotels = Array.from(allHotels);
        }

        const cityMapping = {
            HoChiMinh: "Thành phố Hồ Chí Minh",
            VungTau: "Vũng Tàu",
            NhaTrang: "Nha Trang",
            Hue: "Huế"
        };

        const hotels = allHotels.filter((hotel) => hotel.city === cityMapping[cityUrl]);
        return hotels
    };

    const fetchAllRooms = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/rooms`);
            const allRooms = Array.isArray(response.data.result) ? response.data.result : Array.from(response.data.result);
            return allRooms;
        } catch (error) {
            console.error("Cannot fetch all rooms", error);
        }
    };

    const getHotelRooms = async (allRooms, hotel) => {
        try {
            const hotelId = hotel.id;
            const rooms = allRooms.filter(room => room.hotelId === hotelId)
            return rooms
        } catch (error) {
            console.error("Cannot get rooms by hotel", error)
        }
    }

    const findLowestPrice = async (hotel) => {
        try {
            const allRooms = await fetchAllRooms();
            const hotelRooms = await getHotelRooms(allRooms, hotel);

            if (hotelRooms.length > 0) {
                const prices = hotelRooms.map((room) => room.price);
                return Math.min(...prices);
            }
            return null;
        } catch (error) {
            console.error("Cannot fetch rooms", error);
        }
    };


    const sortHotels = async (filterHotels) => {
        try {
            const hotelsWithPrices = await Promise.all(
                filterHotels.map(async (hotel) => {
                    const lowestPrice = await findLowestPrice(hotel);
                    return { ...hotel, lowestPrice };
                })
            );

            const sortedHotels = hotelsWithPrices.sort((a, b) => {
                if (isPriceIncrease) return a.lowestPrice - b.lowestPrice;
                return b.lowestPrice - a.lowestPrice;
            });
            console.log(sortedHotels);
            setHotels(sortedHotels);
        } catch (error) {
            console.error("Cannot sort hotels by price", error);
        }
    };

    const filterHotelsByUtilities = async (hotels) => {
        try {
            const filteredHotels = hotels.filter((hotel) => {
                return (
                    (!isBuffett || hotel.utilities.some((utility) => utility.id === "1")) &&
                    (!isWifi || hotel.utilities.some((utility) => utility.id === "10")) &&
                    (!isElevator || hotel.utilities.some((utility) => utility.id === "2")) &&
                    (!isGarden || hotel.utilities.some((utility) => utility.id === "3")) &&
                    (!isNearBeach || hotel.utilities.some((utility) => utility.id === "4")) &&
                    (!isParking || hotel.utilities.some((utility) => utility.id === "5")) &&
                    (!isReceiptionist || hotel.utilities.some((utility) => utility.id === "6")) &&
                    (!isRestaurant || hotel.utilities.some((utility) => utility.id === "7")) &&
                    (!isRooftop || hotel.utilities.some((utility) => utility.id === "8")) &&
                    (!isPool || hotel.utilities.some((utility) => utility.id === "9"))
                );
            });
            return filteredHotels;
        } catch (error) {
            console.error("Cannot filter hotels by utilities");
            return [];
        }
    }

    const fetchData = async () => {
        const allHotels = await fetchAllHotels();
        const filteredHotels = await filterHotelsByCity(allHotels, selectedCity);
        const filteredHotelsByUtilities = await filterHotelsByUtilities(filteredHotels);
        await sortHotels(filteredHotelsByUtilities);
    };


    useEffect(() => {
        fetchData();
    }, [selectedCity, selectedCheckOutDate, selectedCheckInDate, isPriceIncrease, isBuffett, isWifi, isElevator, isGarden, isPool, isParking, isNearBeach, isReceiptionist, isRooftop, isRestaurant]);

    const handleChangeCity = (e) => {
        const newCity = e.target.value;
        setSelectedCity(newCity);

        // Update the URL parameter
        navigate(`/${newCity}`);
    };

    const handleSortOrderChange = (e) => {
        setIsPriceIncrease(e.target.value === "increase");
    };

    return (
        <div className="my-5">
            <div className="bg-slate-200 p-5 mb-10">
                <div className="max-w-sm mx-auto">
                    <div className='mb-3'>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Chọn tỉnh/thành phố</label>
                        <select id="city" value={selectedCity} onChange={handleChangeCity} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                            <option value="HoChiMinh">Thành phố Hồ Chí Minh</option>
                            <option value="VungTau">Vũng Tàu</option>
                            <option value="NhaTrang">Nha Trang</option>
                            <option value="Hue">Huế</option>
                        </select>
                    </div>
                </div>
                <div className="flex mb-4 justify-center">
                    <div className="mx-2">
                        <label className="block mb-2 text-sm font-medium">Ngày nhận phòng</label>
                        <DatePicker
                            className="bg-gray-50 border border-gray-300 text-sm rounded-lg"
                            selected={selectedCheckInDate ? new Date(selectedCheckInDate) : null}
                            onChange={(date) => setSelectedCheckInDate(format(date, "yyyy-MM-dd"))}
                            dateFormat="yyyy-MM-dd"
                            placeholderText="năm-tháng-ngày"
                        />
                    </div>
                    <div className="mx-2">
                        <label className="block mb-2 text-sm font-medium">Ngày trả phòng</label>
                        <DatePicker
                            className="bg-gray-50 border border-gray-300 text-sm rounded-lg"
                            selected={selectedCheckOutDate ? new Date(selectedCheckOutDate) : null}
                            onChange={(date) => setSelectedCheckOutDate(format(date, "yyyy-MM-dd"))}
                            dateFormat="yyyy-MM-dd"
                            placeholderText="năm-tháng-ngày"
                        />
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-start">
                <div className=' border mr-2 p-6 h-auto'>
                    <div className='mb-4'>
                        <div className='text-2xl font-bold mb-4'>Sắp xếp theo giá</div>
                        <div class="flex items-center mb-4">
                            <input
                                type="radio"
                                value="increase"
                                name="default-radio"
                                onChange={handleSortOrderChange}
                                checked={isPriceIncrease}
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 " />
                            <label class="ms-2 text-sm font-medium text-gray-900">Giá tăng dần</label>
                        </div>
                        <div class="flex items-center mb-4">
                            <input
                                id="default-radio-2"
                                type="radio"
                                value="decrease"
                                onChange={handleSortOrderChange}
                                checked={!isPriceIncrease}
                                name="default-radio"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 " />
                            <label for="default-radio-2" class="ms-2 text-sm font-medium text-gray-900">Giá giảm dần</label>
                        </div>
                    </div>
                    <div>
                        <div className='text-2xl font-bold mb-4'>Lựa chọn tiện ích</div>
                        <div class="flex items-center mb-4">
                            <input
                                type="checkbox"
                                checked={isBuffett}
                                onChange={() => setIsBuffett(!isBuffett)}
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded " />
                            <label class="ms-2 text-sm font-medium text-gray-900">Buffet sáng</label>
                        </div>
                        <div class="flex items-center mb-4">
                            <input
                                type="checkbox"
                                checked={isWifi}
                                onChange={() => setIsWifi(!isWifi)}
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded " />
                            <label class="ms-2 text-sm font-medium text-gray-900">Có wifi miễn phí</label>
                        </div>
                        <div class="flex items-center mb-4">
                            <input
                                type="checkbox"
                                checked={isElevator}
                                onChange={() => setIsElevator(!isElevator)}
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded " />
                            <label class="ms-2 text-sm font-medium text-gray-900">Có thang máy</label>
                        </div>
                        <div class="flex items-center mb-4">
                            <input
                                type="checkbox"
                                checked={isGarden}
                                onChange={() => setIsGarden(!isGarden)}
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded " />
                            <label class="ms-2 text-sm font-medium text-gray-900">Có sân vườn</label>
                        </div>
                        <div class="flex items-center mb-4">
                            <input
                                type="checkbox"
                                checked={isNearBeach}
                                onChange={() => setIsNearBeach(!isNearBeach)}
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded " />
                            <label class="ms-2 text-sm font-medium text-gray-900">Gần biền</label>
                        </div>
                        <div class="flex items-center mb-4">
                            <input
                                type="checkbox"
                                checked={isParking}
                                onChange={() => setIsParking(!isParking)}
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded " />
                            <label class="ms-2 text-sm font-medium text-gray-900">Có bãi đậu xe</label>
                        </div>
                        <div class="flex items-center mb-4">
                            <input
                                type="checkbox"
                                checked={isReceiptionist}
                                onChange={() => setIsReceiptionist(!isReceiptionist)}
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded " />
                            <label class="ms-2 text-sm font-medium text-gray-900">Lễ tân 24/7</label>
                        </div>
                        <div class="flex items-center mb-4">
                            <input
                                type="checkbox"
                                checked={isRestaurant}
                                onChange={() => setIsRestaurant(!isRestaurant)}
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded " />
                            <label class="ms-2 text-sm font-medium text-gray-900">Nhà hàng</label>
                        </div>
                        <div class="flex items-center mb-4">
                            <input
                                type="checkbox"
                                checked={isRooftop}
                                onChange={() => setIsRooftop(!isRooftop)}
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded " />
                            <label class="ms-2 text-sm font-medium text-gray-900">Có sân thượng</label>
                        </div>
                        <div class="flex items-center mb-4">
                            <input
                                type="checkbox"
                                checked={isPool}
                                onChange={() => setIsPool(!isPool)}
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded " />
                            <label class="ms-2 text-sm font-medium text-gray-900">Có hồ bơi</label>
                        </div>
                    </div>
                </div>
                <div className=''>
                    {hotels && hotels.length > 0 ? (
                        hotels.map((hotel) => {
                            return <CustomerHotelCard key={hotel.id} hotel={hotel} city={cityUrl} selectedCheckInDate={selectedCheckInDate} selectedCheckOutDate={selectedCheckOutDate} />;
                        })
                    ) : (
                        <p>No hotels available</p>
                    )}
                </div>
            </div>
        </div>
    );
}