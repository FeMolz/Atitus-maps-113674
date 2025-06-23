import { useEffect, useState } from "react";
import { Navbar } from "../components";
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
  const [descricao, setDescricao] = useState("");
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
    setDescricao("");
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
    if (!descricao.trim()) return;
    const newPoint = {
      latitude: pendingPosition.lat,
      longitude: pendingPosition.lng,
      descricao,
    };
    try {
      const savedPoint = await postPoint(token, newPoint);
      const savedMarker = {
        id: savedPoint.id,
        title: savedPoint.descricao || "Novo Ponto",
        position: {
          lat: savedPoint.latitude,
          lng: savedPoint.longitude,
        },
      };
      setMarkers((prev) => [...prev, savedMarker]);
      setShowInput(false);
      setPendingPosition(null);
      setDescricao("");
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
                <div>
                  <strong>{selectedMarker.title}</strong>
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
              padding: 16,
              borderRadius: 8,
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              zIndex: 10,
              transform: "translate(-50%, -100%)", // centraliza acima do cursor
            }}
          >
            <label>
              Descrição do ponto:<br />
              <input
                type="text"
                value={descricao}
                onChange={e => setDescricao(e.target.value)}
                style={{ width: 200 }}
                autoFocus
              />
            </label>
            <button onClick={handleAddPoint} style={{ marginLeft: 8 }}>Salvar</button>
            <button onClick={() => setShowInput(false)} style={{ marginLeft: 8 }}>Cancelar</button>
          </div>
        )}
      </div>
    </>
  );
};
