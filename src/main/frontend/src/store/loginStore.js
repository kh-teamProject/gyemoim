import { createStore } from "redux";
import Cookies from "js-cookie";


const initialState = {
    checkedLogin: Cookies.get("isLoggedIn") === "true",
};

const loginReducer = (state = initialState, action) => {
    if (action.type === "login") {
        Cookies.set("isLoggedIn", true);
        return {
            checkedLogin: true,

        };
    }

    if (action.type === "logout") {
        Cookies.set("isLoggedIn", false);
        return {
            checkedLogin: false,
        };
    }

    return state;
};

const loginStore = createStore(loginReducer);

export default loginStore;