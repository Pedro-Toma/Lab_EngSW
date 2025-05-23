import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return <button className="home-page-btn" onClick={handleLogout}>Logout</button>;
}

export default LogoutButton;
