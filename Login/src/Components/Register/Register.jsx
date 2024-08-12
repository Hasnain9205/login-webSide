import { Link, useNavigate } from "react-router-dom";
import loginImg from "../../../src/assets/rr.png";
import axios from "../../Hooks/axiosInstance";
import { setAccessToken, setRefreshToken } from "../../Utils";
import Swal from "sweetalert2";
export default function Register() {
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const body = { name, email, password };
    console.log(name, email, password);
    const {
      status,
      data: { accessToken, refreshToken },
    } = await axios.post("/register", body);
    if (status === 201) {
      setAccessToken(accessToken), setRefreshToken(refreshToken);
      Swal.fire({
        position: "center",
        icon: "success",
        title: `Register successfully`,
        showConfirmButton: false,
        timer: 2000,
      });
      navigate("/mainPage");
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
            <form onSubmit={handleRegister} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="input input-bordered"
                  required
                />
              </div>
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
                <button
                  type="submit"
                  className="btn bg-yellow-600 font-bold text-white"
                >
                  Register
                </button>
                <h1 className="text-center mt-2">
                  Have an account?
                  <Link to="/">
                    <span className="text-blue-600"> Login</span>
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
