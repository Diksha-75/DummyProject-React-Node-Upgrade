import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const login = () => {
    localStorage.setItem(
      "loggedIn",
      "true"
    );

    navigate("/home");
  };

  return (
    <div>
      <h2>Login</h2>

      <button onClick={login}>
        Login
      </button>
    </div>
  );
}

export default Login;