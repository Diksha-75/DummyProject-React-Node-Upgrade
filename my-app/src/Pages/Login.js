import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const login = async () => {
    const res = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "admin",
        password: "1234"
      })
    });

    const data = await res.json();

    if (data.success) {
      localStorage.setItem("loggedIn", "true");
      navigate("/home");
    } else {
      alert("Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;