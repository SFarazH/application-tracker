import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Register from "./pages/Register";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./components/AuthContext";
import Home from "./pages/Home";
import ResetPass from "./pages/ResetPass";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/reset-password/:token" element={<ResetPass />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
