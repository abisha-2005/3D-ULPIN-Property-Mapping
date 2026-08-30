import {
  MapContainer,
  TileLayer,
  Polygon,
  Popup,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

function MapView({ onGenerate3D }) {

  const parcelCoordinates = [
    [10.7905, 78.7047],
    [10.7905, 78.7052],
    [10.7900, 78.7052],
    [10.7900, 78.7047],
  ];

  return (
    <MapContainer
      center={[10.79025, 78.70495]}
      zoom={18}
      style={{ height: "100%", width: "100%" }}
    >

      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Polygon positions={parcelCoordinates}>

        <Popup>

          <div>

            <h3>Parcel Information</h3>

            <p>
              <strong>Parcel ID:</strong> TN-TRI-001
            </p>

            <p>
              <strong>Area:</strong> 2500 sq.ft
            </p>

            <p>
              <strong>Building:</strong> B01
            </p>

            <button
              onClick={onGenerate3D}
              style={{
                padding: "10px 15px",
                background: "#2563eb",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Generate 3D Property
            </button>

          </div>

        </Popup>

      </Polygon>

    </MapContainer>
  );
}

export default MapView;