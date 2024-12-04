import React, { useEffect, useState } from "react";
import CustomerCommentItem from "./CustomerCommentItem";
import axios from "axios";


export default function CustomerCommentList({hotelId}) {
    const [ratings, setRatings] = useState([]);

    const fetchRatings = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/ratings`);
            const ratings = response.data.result.filter(rating => rating.hotelId === hotelId);
            const sortedRatings = ratings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setRatings(sortedRatings);
        }
        catch (error) {
            console.error("Cannot fetch ratings: ", error);
        }
    }

    useEffect(() => {
        fetchRatings();
    }, []);

    return (
        <div>
            {ratings.map((rating) => (
                <CustomerCommentItem key={rating.id} rating={rating} />
            ))}
        </div>
    );
}