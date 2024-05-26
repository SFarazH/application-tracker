import Register from "./pages/Register";
import { AuthProvider } from "./components/AuthContext";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
