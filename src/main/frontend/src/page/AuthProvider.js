import {createContext, useState} from "react";

/* context API 사용시
* 전역 데이터를 Context 에 저장한 후, 데이터가 필요한 컴포넌트에서
* 해당 데이터를 불러와 사용할 수 있다.
* 로그인 데이터, 웹 내 사용자가 쓰는 설정파일, 테마, 언어 등 다양하게
* 컴포넌트 간 공유되어야 할 데이터로 사용하면 좋다.
* context API 사용하고 싶을 땐 context, provider, consumer
* 이렇게 세가지 개념만 숙지하면 된다. */

// 1. Context (전역 값 저장)
// createContext 함수 인자로 기본값 부여해준다.
// 이 기본값은 트리 안에서 적절한 Provider 를 찾지 못했을 때만 쓰이는 값이다.
// 이렇게 Context 를 만들면 AuthContext.Provider 라는 컴포넌트와
// AuthContext.Consumer 라는 컴포넌트가 만들어진다.
export const AuthContext = createContext({
    isLoggedIn: false,
    onLogout: () => {},
    onLogin: (email, password) => {},
});


// 2. Provider (전역 값 제공)
// Context 안에 있는 값을 사용할 컴포넌트들을 감싸주는 용도로 사용한다.
// 값 정할 때는 value 에 값을 설정해주면 된다.
// 이 값이 바로 Context 를 통해 여러 컴포넌트에서 공유할 수 있는 값이다.


const AuthProvider = ({children}) => {

    /* 'useState' Hook 으로 사용자의 인증여부에 따라 'auth'의 값을 바꾼다. */
    const [auth, setAuth] = useState(localStorage.getItem("uNo"));

    const value = {auth, setAuth};

    /* Provider 는 Context 를 구독하는 컴포넌트들에게 context 의 변화를
    * 알리는 역할을 맡는데 'AuthContext' 에 value 로
    * useState Hooks 로 설정한 userState, setUserState 와
    * isAuthenticated 함수를 하위 컴포넌트로 전달한다. */
    return (
        <AuthContext.Provider value = {value}>
            {children}
        </AuthContext.Provider>
    );
}


export default AuthProvider;