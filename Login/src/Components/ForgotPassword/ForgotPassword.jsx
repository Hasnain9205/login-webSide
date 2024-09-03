import Swal from "sweetalert2";
import axios from "../../Hooks/axiosInstance";
import forgotImg from "../../../src/assets/forgot-password-icon-9.png";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/password/forgot-password", { email });
      console.log(res);
      if (res.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Password reset link send to your Email`,
          showConfirmButton: false,
          timer: 5000,
        });
        window.location.href = "https://mail.google.com/mail/u/0/#inbox";
      }
    } catch (error) {
      {
        Swal.fire({
          position: "center",
          icon: "error",
          title: `Reset sending link error`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex border-2  bg-base-200   max-w-2xl shrink-0 shadow-2xl form-control ">
        <h1 className="text-4xl font-bold">Forgot Password</h1>
        <div className=" flex border-2">
          <div className="w-88">
            <img src={forgotImg} alt="" />
          </div>
          <div className="w-96 my-auto">
            <form onSubmit={handleSubmit} className="card-body ">
              <input
                type="email"
                name="email"
                className="input input-bordered"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="btn text-white bg-yellow-600">
                Send reset link
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
