import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function PageWrapper(props) {
  return (
    <div>
      <Header></Header>
      {props.children}
      <Footer></Footer>
    </div>
  );
}
export default PageWrapper;
