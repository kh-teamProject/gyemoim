import {createStore} from "redux";

const initialState = { checkedLogin: false };

const loginReducer = (state = initialState, action) => {
    if ( action.type === 'login') {
        return {
            checkedLogin: true
        };
    }

    if ( action.type === 'logout') {
        return {
            checkedLogin: false
        };
    }

    // switch (action.type) {
    //     case 'login':
    //         checkedLogin: state.checkedLogin = true;
    //         break;
    //     case 'logout':
    //         checkedLogin: state.checkedLogin = false;
    //         break;
    //     default:
    //         break;
    // }
    return state;
}

const loginStore = createStore(loginReducer);

export default loginStore;

// import {configureStore, createSlice} from "@reduxjs/toolkit";
//
// const HandleLogin = createSlice({
//     name: 'HandleLogin',
//     initialState: false,
//     reducers: {
//         doLogin(state) {
//             return true;
//         },
//         doLogout(state) {
//             return false;
//         }
//     },
// });
//
// export const {doLogin, doLogout} = HandleLogin.actions
//
// export default configureStore({
//     reducer: {
//         'HandleLogin' : HandleLogin.reducer,
//     }
// })