import React, { useEffect, useState } from "react";
import StarRatingResult from "./StarRatingResult.js";
import axios from "axios";


export default function CustomerCommentItem({ rating}) {
    const [createdDate, setCreatedDate] = useState(null);
    const [userName, setUserName] = useState(null);

    const fetchUser = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/users/${id}`);
            setUserName(response.data.result.name);
        }
        catch(error) {
            console.error("Cannot fetch user: ",error);
        }
    }

    useEffect(() => {
        const date = new Date(rating.createdAt);
        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        setCreatedDate(formattedDate);
        fetchUser(rating.userId);
    }, []);
    return (

        <div className="my-3">
            <article >
                <div className="flex items-center mb-4">
                    <div className="font-medium">
                        <p>{userName}</p>
                    </div>
                </div>
                <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
                    <StarRatingResult point={rating.point} />
                </div>
                <p className="mb-5 text-sm text-gray-900 ">Đã bình luận vào ngày <span>{createdDate}</span></p>
                <p className="mb-2 text-gray-900 ">{rating.comment}</p>
            </article>
            <hr className="my-5"/>
        </div>

    );
}