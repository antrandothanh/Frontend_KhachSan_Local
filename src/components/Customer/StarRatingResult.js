import React from "react";
import { FaStar } from "react-icons/fa";

export default function StarRating({point}) {

    return (
        <div className="flex">
            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
                return (
                    <label>
                        <FaStar
                            style={{ cursor: "default", transition: "color 200ms" }}
                            size={18}
                            color={ratingValue <= (point) ? "#ffc107" : "#e4e5e9"}
                        />
                    </label>
                )
            })}
        </div>
    );
}