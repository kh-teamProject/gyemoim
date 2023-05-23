import React from 'react';
import {Link} from "react-router-dom";

const BoardBox = (props) => {

    console.log("boardBox");
    console.log('beerBox/props: ', props);
    console.log('beerBox/props.title: ', props.title);

    return (
        <>
            <Link
                to={"/board/detail"}
                state={{
                    bid: props.bid,
                }}
            >
                <div>
                    <h1>{props.title}</h1>
                </div>
            </Link>
        </>
    )
}

export default BoardBox;