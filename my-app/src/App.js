import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "./Pages/Login.js";
import Home from "./Pages/Home.js";
import Weather from "./Pages/Weather.js";
import Profile from "./Pages/Profile.js";
import Navbar from "./Components/Navbar.js";
import ProtectedRoute from "./Components/ProtectedRoute.js";
import AirQualityChecker from "./Pages/AirQualityChecker.js"

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
          path="/Weather"
          element={
            <ProtectedRoute>
              <Weather />
            </ProtectedRoute>
          }
        />

        <Route
          path="/AirQualityChecker"
          element={
            <ProtectedRoute>
              <AirQualityChecker/>
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
