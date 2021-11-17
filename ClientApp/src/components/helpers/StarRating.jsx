import React, { useState } from "react";

const StarRating = ({
    rating,
    setRating,
    isActive = false
}) => {
    const [hover, setHover] = useState(0);
    return (
        <div className="col">
            {[...Array(10)].map((star, index) => {
                index += 1;
                return (
                    <button
                        type="button"
                        key={index}
                        className={index <= (hover || rating) ? "on" : "off"}
                        onClick={() => isActive && setRating(index)}
                        onMouseEnter={() => isActive && setHover(index)}
                        onMouseLeave={() => isActive && setHover(rating)}
                    >
                        <span className="star">&#9733;</span>
                    </button>
                );
            })}
        </div>
    );
};

export default StarRating;