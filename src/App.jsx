import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Map } from "./pages/Map";
import { PrivateRoute } from "./components/PrivateRoute";
import CadastrarCarro from "./pages/CadastrarCarro";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/map"
          element={
            <PrivateRoute>
              <Map />
            </PrivateRoute>
          }
        />
        <Route path="/cadastrar-carro" element={<CadastrarCarro />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
