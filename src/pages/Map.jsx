import { useEffect, useState } from "react";
import { Navbar, BottomNavbar } from "../components";
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from "@react-google-maps/api";
import { getPoints, postPoint } from '../services/mapService';
import { useAuth } from "../contexts/AuthContext";

const containerStyle = {
  width: "100%",
  height: "100%",
};

export const Map = () => {
  const { token } = useAuth();
  const [markers, setMarkers] = useState([]);
  const [center, setCenter] = useState({ lat: -27.1007, lng: -52.6152 });
  const [pendingPosition, setPendingPosition] = useState(null);
  const [description, setDescription] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [inputPosition, setInputPosition] = useState({ x: 0, y: 0 });
  const [selectedMarker, setSelectedMarker] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    async function fetchMarkers() {
      try {
        const data = await getPoints(token);
        setMarkers(data);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchMarkers();
  }, [token]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Erro ao obter localização:', error);
        }
      );
    }
  }, []);

  // Ao clicar no mapa, mostra o campo de texto na posição do cursor
  const handleMapClick = (event) => {
    setPendingPosition({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
    setDescription("");
    setShowInput(true);

    // Pega a posição do mouse na tela
    if (event.domEvent) {
      setInputPosition({
        x: event.domEvent.clientX,
        y: event.domEvent.clientY,
      });
    } else {
      // fallback para o centro se não houver domEvent
      setInputPosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    }
  };

  // Ao confirmar a descrição, cadastra o ponto
  const handleAddPoint = async () => {
    if (!description.trim()) return;
    const newPoint = {
      latitude: pendingPosition.lat,
      longitude: pendingPosition.lng,
      description,
    };
    try {
      const savedPoint = await postPoint(token, newPoint);
      const savedMarker = {
        id: savedPoint.id,
        title: savedPoint.description || "Novo Ponto",
        position: {
          lat: savedPoint.latitude,
          lng: savedPoint.longitude,
        },
      };
      setMarkers((prev) => [...prev, savedMarker]);
      setShowInput(false);
      setPendingPosition(null);
      setDescription("");
      setSelectedMarker(savedMarker); // Seleciona o novo marcador para mostrar a descrição
    } catch (error) {
      alert(JSON.stringify(error));
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ width: "100%", height: "100%", position: "relative" }}>
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={12}
            onClick={handleMapClick}
          >
            {markers.map(marker => (
              <Marker
                key={marker.id}
                position={marker.position}
                title={marker.title}
                onClick={() => setSelectedMarker(marker)}
              />
            ))}
            {selectedMarker && (
              <InfoWindow
                position={selectedMarker.position}
                onCloseClick={() => setSelectedMarker(null)}
              >
                <div
                  style={{
                    minWidth: 220,
                    maxWidth: 260,
                    padding: "18px 20px",
                    background: "#fff",
                    borderRadius: 12,
                    boxShadow: "0 4px 24px rgba(59,130,246,0.13)",
                    border: "1.5px solid #3b82f6",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: 8,
                  }}
                >
                  <span style={{ color: "#2563eb", fontWeight: 700, fontSize: 16, marginBottom: 4 }}>
                    Descrição
                  </span>
                  <span style={{ color: "#374151", fontSize: 15 }}>
                    {selectedMarker.title}
                  </span>
                </div>
              </InfoWindow>
            )}
            {pendingPosition && showInput && (
              <Marker position={pendingPosition} />
            )}
          </GoogleMap>
        ) : (
          <div>Carregando mapa...</div>
        )}
        {showInput && (
          <div
            style={{
              position: "fixed",
              top: inputPosition.y - 60, // 60px acima do cursor
              left: inputPosition.x,
              background: "#fff",
              padding: 24,
              borderRadius: 12,
              boxShadow: "0 4px 24px rgba(59,130,246,0.15)",
              zIndex: 10,
              transform: "translate(-50%, -100%)",
              minWidth: 280,
              border: "1.5px solid #3b82f6",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 12,
            }}
          >
            <label style={{ color: "#2563eb", fontWeight: 600, marginBottom: 4 }}>
              Descrição do ponto:
            </label>
            <input
              type="text"
              value={description}
              onChange={e => setDescription(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: 8,
                border: "1px solid #cbd5e1",
                fontSize: 16,
                outline: "none",
                transition: "border 0.2s",
                marginBottom: 8,
              }}
              autoFocus
              placeholder="Digite uma descrição..."
            />
            <div style={{ display: "flex", gap: 8, width: "100%", justifyContent: "flex-end" }}>
              <button
                onClick={handleAddPoint}
                style={{
                  background: "#3b82f6",
                  color: "#fff",
                  border: "none",
                  borderRadius: 6,
                  padding: "8px 18px",
                  fontWeight: "bold",
                  fontSize: 15,
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
              >
                Salvar
              </button>
              <button
                onClick={() => setShowInput(false)}
                style={{
                  background: "#f3f4f6",
                  color: "#374151",
                  border: "none",
                  borderRadius: 6,
                  padding: "8px 18px",
                  fontWeight: "bold",
                  fontSize: 15,
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
      <BottomNavbar /> {/* Adicione aqui */}
    </>
  );
};
