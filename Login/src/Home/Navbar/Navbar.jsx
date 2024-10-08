import { Link, useNavigate } from "react-router-dom";
import { removeAccessToken, removeRefreshToken } from "../../Utils";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeAccessToken("token");
    removeRefreshToken("refreshToken");
    navigate("/");
  };

  const navLinks = (
    <>
      <li>
        <Link>Home</Link>
      </li>
      <li>
        <Link>Menu</Link>
      </li>
      <li>
        <Link>Contact</Link>
      </li>
    </>
  );

  return (
    <div className="px-20 bg-red-700 shadow-sm">
      <div className="navbar bg-red-700">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm text-white dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {navLinks}
            </ul>
          </div>
          <Link className="btn btn-ghost text-xl text-white">daisyUI</Link>
        </div>
        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal text-white px-1">{navLinks}</ul>
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="User Avatar"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/updateProfile" className="justify-between">
                Profile
                <span className="badge">Edit</span>
              </Link>
            </li>
            <li>
              <Link to="/settings">Settings</Link>
            </li>
            <li>
              <a onClick={handleLogout}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
