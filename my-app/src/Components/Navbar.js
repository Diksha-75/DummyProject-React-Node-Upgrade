import { Link } from "react-router-dom";
import "../App.css";

function Navbar() {
  return (
    <div className="navbar">
      <Link to="/home">Home</Link> |{" "}
      <Link to="/weather">Weather</Link> |{" "}
      <Link to="/airqualitychecker">AirQualityChecker</Link> |{" "}
      <Link to="/profile">Profile</Link>
    </div>
  );
}

export default Navbar;