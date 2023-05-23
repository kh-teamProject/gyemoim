import Header from "../component/Header";
import {Outlet} from "react-router-dom";
import Footer from "../component/Footer";

const RootLayout = () => {

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;