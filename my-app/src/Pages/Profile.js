import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem(
      "loggedIn"
    );

    navigate("/");
  };

  return (
    <div className="profile-box">
      <h2>Profile</h2>

      <p>
        Name: Demo User
      </p>

      <button onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Profile;