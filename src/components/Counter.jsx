import {useState} from "react";
import React from "react";


const Counter = function () {
    const [likes, setLikes] = useState(0)

    return (
        <div className="counter">
            <p>{likes}</p>
            <button onClick={() => setLikes(likes + 1)}>+</button>
            <button onClick={() => setLikes(likes - 1)}>-</button>
        </div>
    );
}

export default Counter