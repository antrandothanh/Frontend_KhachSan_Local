import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

export default function StarRating({getRating}) {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);

    useEffect(() => {
        getRating(rating);
    }, [rating]);

    return (
        <div className="flex">
            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
                return (
                    <label>
                        <input
                            type="radio"
                            name="rating"
                            style={{ display: "none" }}
                            value={ratingValue}
                            onClick={() => setRating(ratingValue)}
                            
                        />

                        <FaStar
                            style={{ cursor: "pointer", transition: "color 200ms" }}
                            size={18}
                            color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(null)}
                        />
                    </label>
                )
            })}
        </div>
    );
}