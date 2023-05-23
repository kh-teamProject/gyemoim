import React from 'react';
import {NavLink} from "react-router-dom";

const Board = () => {

    return (
        <>
            <div style={{
                borderBottomColor: 'darkgrey',
                borderBottom: 1,
                borderBottomStyle: 'solid',
                marginTop: 94,
                marginBottom: 100
            }}>
                <ul style={{
                    display: 'flex',
                    justifyContent: 'space-around'
                }}>
                    <li>
                        <NavLink to="notice">공지사항</NavLink>
                    </li>
                    <li>
                        <NavLink to="question">1:1 문의사항</NavLink>
                    </li>
                </ul>
            </div>
        </>
    );

}


export default Board;