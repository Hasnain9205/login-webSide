import { useEffect } from "react";
import Card from "../Components/card/Card";
import Footer from "../Components/Footer/Footer";
import Slider from "../Components/Slider/Slider";
import Navbar from "../Home/Navbar/Navbar";
import { getAccessToken } from "../Utils";
import axios from "../Hooks/axiosInstance.jsx";

export default function MainPage() {
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
      console.error("Error", error);
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
