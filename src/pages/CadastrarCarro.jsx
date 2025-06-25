import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CadastrarCarro() {
  const [modelo, setModelo] = useState("");
  const [placa, setPlaca] = useState("");
  const [ano, setAno] = useState("");
  const [cor, setCor] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Carro cadastrado!\nModelo: ${modelo}\nPlaca: ${placa}\nAno: ${ano}\nCor: ${cor}`);
    setModelo("");
    setPlaca("");
    setAno("");
    setCor("");
    navigate("/map");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {/* Seta de voltar */}
      <button
        onClick={() => navigate("/map")}
        style={{
          position: "absolute",
          top: 32,
          right: 32,
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 8,
          zIndex: 10,
        }}
        aria-label="Voltar para o mapa"
      >
        <svg width="28" height="28" fill="none" stroke="#3b82f6" strokeWidth="3" viewBox="0 0 24 24">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <div
        style={{
          background: "#fff",
          padding: "40px 32px",
          borderRadius: 16,
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          minWidth: 340,
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: 32, color: "#3b82f6" }}>
          Cadastrar Carro
        </h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: "block", marginBottom: 6, color: "#374151" }}>
              Modelo:
            </label>
            <input
              type="text"
              value={modelo}
              onChange={e => setModelo(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: 8,
                border: "1px solid #cbd5e1",
                fontSize: 16,
                outline: "none",
                transition: "border 0.2s",
              }}
            />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: "block", marginBottom: 6, color: "#374151" }}>
              Placa:
            </label>
            <input
              type="text"
              value={placa}
              onChange={e => setPlaca(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: 8,
                border: "1px solid #cbd5e1",
                fontSize: 16,
                outline: "none",
                transition: "border 0.2s",
              }}
            />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: "block", marginBottom: 6, color: "#374151" }}>
              Ano:
            </label>
            <input
              type="number"
              value={ano}
              onChange={e => setAno(e.target.value)}
              required
              min="1900"
              max={new Date().getFullYear()}
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: 8,
                border: "1px solid #cbd5e1",
                fontSize: 16,
                outline: "none",
                transition: "border 0.2s",
              }}
            />
          </div>
          <div style={{ marginBottom: 28 }}>
            <label style={{ display: "block", marginBottom: 6, color: "#374151" }}>
              Cor:
            </label>
            <input
              type="text"
              value={cor}
              onChange={e => setCor(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: 8,
                border: "1px solid #cbd5e1",
                fontSize: 16,
                outline: "none",
                transition: "border 0.2s",
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px 0",
              background: "#3b82f6",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontSize: 18,
              fontWeight: "bold",
              cursor: "pointer",
              transition: "background 0.2s",
            }}
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}