import Swal from "sweetalert2";
import axios from "../../Hooks/axiosInstance";
import { getAccessToken } from "../../Utils";
import { useNavigate } from "react-router-dom";

export default function CreateProfile() {
  const navigate = useNavigate();
  const handleCreate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const dateOfBirth = form.dateOfBirth.value;
    const body = { firstName, lastName, dateOfBirth };
    try {
      const token = getAccessToken("accessToken");
      console.log(token);
      const res = await axios.post("/createProfile", body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
      if (res.status === 201) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Registration successful",
          showConfirmButton: false,
          timer: 2000,
        });
        navigate("/menu");
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Registration failed",
        text:
          error.response?.data?.message ||
          "Something went wrong. Please try again.",
        showConfirmButton: true,
      });
    }
  };
  return (
    <div>
      <div className="max-w-4xl bg-base-200 mx-auto mt-44">
        <div className="border-2">
          <h1 className="text-center font-bold text-3xl mt-8 ">
            Update Profile
          </h1>
          <div className="bg-base-100 max-w-3xl mx-auto my-10 shrink-0 shadow-2xl">
            <form onSubmit={handleCreate} className="card-body">
              <div className="form-control">
                <label className="label" htmlFor="firstName">
                  <span className="label-text">First Name</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label" htmlFor="lastName">
                  <span className="label-text">Last Name</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label" htmlFor="dateOfBirth">
                  <span className="label-text">Date of Birth</span>
                </label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn bg-yellow-600 font-bold text-white">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
