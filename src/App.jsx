import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Login from "./auth/Login";
import Sigup from "./auth/Sigup";
import Checkout from "./pages/Checkout"; // Add this import
import NotFoundPage from "./pages/NotFoundPage"; // Import NotFoundPage
// import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <CartProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />{" "}
          {/* Use Checkout here */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Sigup />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </CartProvider>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
