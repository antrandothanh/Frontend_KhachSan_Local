import React, { useEffect, useState } from "react";
import {
    Outlet,
    useLocation,
    useNavigate,
} from "react-router-dom";

export default function OwnerHotelsManagementLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const [hotelId, setHotelId] = useState();


    const accessDetails = (e) => {
        e.preventDefault();
        navigate("/owner/hotel-info", { state: { hotelId } });
    }

    const accessRooms = (e) => {
        e.preventDefault();
        navigate("/owner/hotel-info/rooms", { state: { hotelId } });
    }

    const accessPostRoom = (e) => {
        e.preventDefault();
        navigate("/owner/hotel-info/post-room", { state: { hotelId } });
    }

    const accessCustomersBooking = (e) => {
        e.preventDefault();
        navigate("/owner/hotel-info/customers-booking", {state: {hotelId}});
    }

    const accessCustomerRatings = (e) => {
        e.preventDefault();
        navigate("/owner/hotel-info/customer-ratings", {state: {hotelId}});
    }

    useEffect(() => {
        setHotelId(location.state.hotelId);
    }, []);


    return (
        <div className="my-5">

            <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <a href="/owner/hotel-info" onClick={accessDetails} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <span className="ms-3">Thông tin khách sạn</span>
                            </a>
                        </li>
                        <li>
                            <a href="/owner/hotel-info/rooms" onClick={accessRooms} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <span className="ms-3">Danh sách phòng</span>
                            </a>
                        </li>
                        <li>
                            <a href="/owner/hotel-info/post-room" onClick={accessPostRoom} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <span className="ms-3">Đăng phòng</span>
                            </a>
                        </li>
                        <li>
                            <a href="/owner/hotel-info/customers-booking" onClick={accessCustomersBooking} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <span className="ms-3">Danh sách khách hàng</span>
                            </a>
                        </li>
                        <li>
                            <a href="/owner/hotel-info/customers-booking" onClick={accessCustomerRatings} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <span className="ms-3">Đánh giá của khách hàng</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </aside>

            <div className="p-4 sm:ml-64">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg">

                    <Outlet />

                </div>
            </div>
        </div>
    );
}