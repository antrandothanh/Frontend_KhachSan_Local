import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";


export default function OwnerCustomerRatings() {
    const location = useLocation();
    const hotelId = location.state.hotelId;
    const [customers, setCustomers] = useState([]);
    const [ratings, setRatings] = useState([]);

    const fetchCustomers = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/users`);
            const allUsers = response.data.result;
            return allUsers.filter((user) => user.roles[0].name === "CUSTOMER");
        } catch (error) {
            console.error("Cannot fetch customers: ", error);
            return [];
        }
    };

    const fetchRatings = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/ratings`);
            const allRatings = response.data.result;
            return allRatings;
        } catch (error) {
            console.error("Cannot fetch ratings: ", error);
            return [];
        }
    };

    const fetchData = async () => {
        const allCustomers = await fetchCustomers();
        const allRatings = await fetchRatings();

        const hotelRatings = allRatings.filter((rating) => rating.hotelId === hotelId);
        setRatings(hotelRatings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));

        const hotelCustomers = allCustomers.filter((customer) => hotelRatings.some((rating) => rating.userId === customer.id));
        setCustomers(hotelCustomers);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <div className="my-5 text-center">
                <p className="text-3xl capitalize font-bold">Đánh giá của khách hàng</p>
            </div>
            <div className="my-5 mx-56"></div>

            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Khách hàng</th>
                            <th scope="col" className="px-6 py-3">Ngày</th>
                            <th scope="col" className="px-6 py-3">Số điểm (tối đa 5)</th>
                            <th scope="col" className="px-6 py-3">Nội dung</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ratings.map((rating) => {
                            const customer = customers.find((customer) => customer.id === rating.userId);
                            const date = new Date(rating.createdAt);
                            const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
                            return (
                                <tr key={rating.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                        {customer ? customer.name : "Unknown Customer"}
                                    </td>
                                    <td className="px-6 py-4">
                                        {formattedDate}
                                    </td>
                                    <td className="px-6 py-4">
                                        {rating.point}
                                    </td>
                                    <td className="px-6 py-4">
                                        {rating.comment == "" || rating.comment == null ? "No comment" : rating.comment}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}