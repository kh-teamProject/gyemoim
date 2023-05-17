import axios from "axios";
import { getAccessTokenCookie } from "./Cookie";

const url = 'http://localhost:8080/api/v1';

// 유저 존재하는지 확인
export const checkId = async (email) => {
    return await axios.get(`${url}/get?userId=${email}`);
};

// access 토큰 재발급받음.
export const issueToken = () => {
    return axios.post(
        `${url}/token/getAccessToken`,
        {},
        {
            withCredentials: true,
            // headers: {
            //     Authorization: token,
            // }
        }
    );
};