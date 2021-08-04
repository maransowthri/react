import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";

const Layout = (props) => {
  return (
    <>
      <Navigation />
      {props.children}
      <Footer />
    </>
  );
};

export default Layout;
