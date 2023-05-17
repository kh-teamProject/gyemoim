import {Outlet} from "react-router-dom";

const BoardRootLayout = () => {

    return (
        <>
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default BoardRootLayout;