import { useEffect } from "react";
import Card from "../Components/card/Card";
import Footer from "../Components/Footer/Footer";
import Slider from "../Components/Slider/Slider";
import Navbar from "../Home/Navbar/Navbar";
import { getAccessToken } from "../Utils";
import axios from "../Hooks/axiosInstance.jsx";
import { useNavigate } from "react-router-dom";

export default function Menu() {
  const navigate = useNavigate();
  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const token = getAccessToken();
    console.log("token there", token);
    try {
      await axios.get("/protected", {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      if (error) {
        navigate("/");
      }
    }
  };
  return (
    <div>
      <Navbar></Navbar>
      <Slider></Slider>
      <Card></Card>
      <Footer></Footer>
    </div>
  );
}
