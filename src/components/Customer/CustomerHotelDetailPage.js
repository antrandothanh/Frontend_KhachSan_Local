import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import CustomerHotelDetailRoomItem from "./CustomerHotelDetailRoomItem";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import StarRating from "./StarRating.js"
import CustomerCommentList from "./CustomerCommentList.js";
import { useCookies } from "react-cookie";


export default function CustomerHotelDetailPage() {
    const navigate = useNavigate();

    const { cityUrl } = useParams();

    const location = useLocation();
    const hotelId = location.state.hotelId;
    const selectedCheckInDateFromState = location.state.selectedCheckInDate || null;
    const selectedCheckOutDateFromState = location.state.selectedCheckOutDate || null;

    const [selectedCheckInDate, setSelectedCheckInDate] = useState(selectedCheckInDateFromState);
    const [selectedCheckOutDate, setSelectedCheckOutDate] = useState(selectedCheckOutDateFromState);

    const [rooms, setRooms] = useState([]);

    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [district, setDistrict] = useState("");
    const [street, setStreet] = useState("");
    const [description, setDescription] = useState("");
    const [utilities, setUtilities] = useState([]);
    const [hotelImages, setHotelImages] = useState([]);

    // rate and comment
    const [point, setPoint] = useState(0);
    const [comment, setComment] = useState("");



    // cookie to get signed in user
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);
    const user = cookies.user;

    const fetchHotelById = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/hotels/${id}`);
            const result = response.data.result;
            setName(result.name);
            setCity(result.city);
            setDistrict(result.district);
            setStreet(result.street);
            setDescription(result.description);
            setUtilities(result.utilities);
            setHotelImages(result.hotelImages);
        } catch (error) {
            console.error("Cannot fetch hotel:", error);
        }
    };

    const fetchRooms = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/rooms`);
            const allRooms = response.data.result;
            return allRooms.filter((room) => room.hotelId === id);
        } catch (error) {
            console.error("Cannot fetch rooms:", error);
            return [];
        }
    };

    const fetchBookings = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/bookings`);
            return response.data.result;
        } catch (error) {
            console.error("Cannot fetch bookings data:", error);
            return [];
        }
    };

    const addRatingApi = async () => {
        try {
            const request = await axios.post(`http://localhost:8080/api/ratings`, {
                hotelId,
                userId: user.id,
                point,
                comment
            });
        }
        catch (error) {
            console.error("Cannot run add rating api: ", error);
        }
    }


    const getEmptyRooms = async (rooms, allBookings) => {
        const emptyRooms = [];

        for (const room of rooms) {
            let isBooked = false;

            for (const booking of allBookings) {
                if (room.id === booking.roomId) {
                    const oldCheckIn = new Date(booking.checkInDate);
                    const oldCheckOut = new Date(booking.checkOutDate);

                    const newCheckIn = new Date(selectedCheckInDate);
                    const newCheckOut = new Date(selectedCheckOutDate);

                    if (
                        (newCheckIn < oldCheckIn && newCheckOut <= oldCheckIn) ||
                        (newCheckIn >= oldCheckOut && newCheckOut > oldCheckOut)
                    ) {
                        isBooked = false;
                    }
                    else {
                        isBooked = true;
                        break;
                    }
                }
            }

            if (!isBooked) emptyRooms.push(room);
        }

        return emptyRooms;
    };

    const getRating = (data) => {
        setPoint(data);
    }

    const handlePostComment = () => {
        if (user == null) {
            alert("Bạn chưa đăng nhập tài khoản");
        }
        else {
            addRatingApi();
            window.location.reload();
        }
    }

    const handleSeeMoreImages = (e) => {
        e.preventDefault();
        navigate(`all-images`, { state: { hotelId: hotelId } });
    }

    const handleGoBack = (e) => {
        e.preventDefault();
        navigate(`/${cityUrl}`);
    }

    useEffect(() => {
        // if (!selectedCheckInDate && !selectedCheckOutDate) {
        //     window.scrollTo(0, 0);
        // }
        window.scrollTo(0, 0);
        const fetchData = async () => {

            // if (!selectedCheckInDate && !selectedCheckOutDate) {
            //     await fetchHotelById(hotelId);
            // }

            await fetchHotelById(hotelId);


            const allRooms = await fetchRooms(hotelId);
            const allBookings = await fetchBookings();

            if (!selectedCheckInDate || !selectedCheckOutDate) {
                setRooms(allRooms);
            } else {
                const emptyRooms = await getEmptyRooms(allRooms, allBookings);
                setRooms(emptyRooms);
            }
        };

        fetchData();
    }, [hotelId, selectedCheckOutDate]);

    return (
        <div className="py-8 px-64">
            <div className="mb-5">
                <a href="#" onClick={handleGoBack} style={{ cursor: "pointer" }} class="inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline">
                    <svg class="w-4 h-4 mr-2 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0L5 9m-4-4L5 1" />
                    </svg>
                    Quay lại
                </a>
            </div>
            {/* Hotel Image */}
            <div className="flex justify-center mb-2 w-full">
                {hotelImages.slice(0, 3).map((hotelImage) => (
                    <img
                        alt="hotel-image"
                        src={hotelImage.imageUrl}
                        className="h-96 max-w-lg transition-transform duration-300 hover:scale-105"
                    />
                ))}

            </div>
            <div className="mb-5">
                <a href="#" onClick={handleSeeMoreImages} style={{ cursor: "pointer" }} class="inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline">
                    Xem thêm ảnh
                    <svg class="w-4 h-4 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </a>
            </div>

            {/* Hotel Details */}
            <div>
                <h1 className="text-3xl capitalize font-bold">{name}</h1>
                <hr className="my-3 h-0.5 bg-gray-900" />
                <p className="text-base">
                    <span className="font-semibold">Địa chỉ: </span>
                    {`${street}, ${district}, ${city}`}
                </p>
                <p className="my-2 text-base font-semibold">Mô tả:</p>
                <p className="text-base">{description}</p>
                <p className="my-2 text-base font-semibold">Tiện ích:</p>

                <div className="flex flex-wrap gap-4 mt-2">
                    {utilities.map((utility) => (
                        <div className="flex items-center space-x-2">
                            <img
                                alt="utility-icon"
                                src={utility.imageUrl}
                                className="w-6 h-6"
                            />
                            <span className="text-green-400 font-semibold">{utility.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            <hr className="w-48 h-1 mx-auto my-10 bg-gray-100 rounded" />

            {/* Room List Title*/}
            <div className="text-2xl capitalize text-center font-bold my-10">
                Danh sách phòng trống
            </div>

            {/* Check in date and check out date */}
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

            {/* Rooms list */}
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th className="px-16 py-3">Image</th>
                            <th className="px-6 py-3">Mô tả</th>
                            <th className="px-6 py-3">Giá tiền</th>
                            <th className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rooms.map((room) => {
                            if (room.available) {
                                return (
                                    <CustomerHotelDetailRoomItem
                                        key={room.id}
                                        checkInDate={selectedCheckInDate}
                                        checkOutDate={selectedCheckOutDate}
                                        room={room}
                                    />
                                )
                            }
                        })}
                    </tbody>
                </table>
            </div>

            <hr className="w-48 h-1 mx-auto my-10 bg-gray-100 rounded" />

            <div className="text-2xl capitalize text-center font-bold my-10">
                Đánh giá của khách hàng
            </div>

            <div className="flex">
                <label for="counter-input" className="block mb-1 text-sm font-medium text-gray-900 mr-5">Đánh giá:</label>
                <StarRating key={hotelId} getRating={getRating} />
            </div>

            {/* <div>
                The rating point is : {point}
            </div> */}
            <div className="mb-2">
                <label for="counter-input" className="block mb-1 text-sm font-medium text-gray-900 mr-2">Viết bình luận:</label>
                <textarea
                    rows="3"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}
                    placeholder="Để lại bình luận tại đây"
                />
            </div>

            <div className="flex justify-center">
                <button
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                    onClick={handlePostComment}
                >
                    Đăng bình luận
                </button>
            </div>

            <CustomerCommentList key={hotelId} hotelId={hotelId} />
        </div>
    );
}
