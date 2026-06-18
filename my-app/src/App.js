import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "./Pages/Login.js";
import Home from "./Pages/Home.js";
import Countries from "./Pages/Countries.js";
import Weather from "./Pages/Weather.js";
import Profile from "./Pages/Profile.js";
import Navbar from "./Components/Navbar.js";
import ProtectedRoute from "./Components/ProtectedRoute.js";

function App() {
  return (
     <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/Home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Countries"
          element={
            <ProtectedRoute>
              <Countries />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Weather"
          element={
            <ProtectedRoute>
              <Weather />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />



        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
