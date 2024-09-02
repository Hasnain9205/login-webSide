import Swal from "sweetalert2";
import axios from "../../Hooks/axiosInstance";
import forgotImg from "../../../src/assets/forgot-password-icon-9.png";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const { id, token } = useParams();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/reset-password/${id}/${token}`, {
        newPassword,
      });
      console.log(res.data);
      if (res.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Password reset  successfully`,
          showConfirmButton: false,
          timer: 2000,
        });
        navigate("/login");
      }
    } catch (error) {
      {
        Swal.fire({
          position: "center",
          icon: "error",
          title: `Reset password error`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex border-2  bg-base-200   max-w-2xl shrink-0 shadow-2xl form-control ">
        <h1 className="text-4xl font-bold">Reset Password</h1>
        <div className=" flex border-2">
          <div className="w-88">
            <img src={forgotImg} alt="" />
          </div>
          <div className="w-96 my-auto">
            <form onSubmit={handleSubmit} className="card-body ">
              <input
                type="number"
                className="input input-bordered"
                required
                placeholder="Enter your Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button type="submit" className="btn bg-yellow-600">
                Rest Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
