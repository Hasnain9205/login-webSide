import { Link, useNavigate } from "react-router-dom";
import loginImg from "../../../src/assets/ll.png";
import { setAccessToken, setRefreshToken } from "../../Utils.js";
import axios from "../../Hooks/axiosInstance.jsx";
import Swal from "sweetalert2";

export default function Login() {
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const body = { email, password };
    console.log(email, password);
    try {
      const { status, data } = await axios.post("/login", body);
      console.log(data);
      if (data.user.profileComplete === false) {
        setAccessToken(data.accessToken), setRefreshToken(data.refreshToken);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Login failed",
          text: "User not found. Please update your profile",
          showConfirmButton: true,
        });
        navigate("/createProfile");
      } else if (status === 201) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Login successfully`,
          showConfirmButton: false,
          timer: 2000,
        });
        console.log(data.user.profileComplete);
        navigate("/menu");
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Login failed",
        text:
          error.response?.data?.message ||
          "User not found. Please update your profile",
        showConfirmButton: true,
      });
    }
  };
  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex border-2">
          <div>
            <img className="w-[500px]" src={loginImg} alt="" />
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl ">
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn bg-yellow-600 font-bold text-white">
                  Login
                </button>
                <h1 className="text-center mt-2">
                  Don't have an account?
                  <Link to="/register">
                    <span className="text-blue-600"> Register</span>
                  </Link>
                </h1>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
