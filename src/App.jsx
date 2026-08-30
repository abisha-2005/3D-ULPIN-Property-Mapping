import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useState } from "react";

import MapView from "./components/MapView";
import Building3D from "./components/Building3D";

import "./App.css";

// ==========================================
// FLOOR + UNIT DATA
// ==========================================

const floors = [
  {
    id: "F00",
    name: "Ground Floor",
    usage: "Commercial",
    units: [
      {
        id: "U01",
        usage: "Retail Shop",
        area: 1500,
      },
      {
        id: "U02",
        usage: "Reception",
        area: 500,
      },
    ],
  },

  {
    id: "F01",
    name: "1st Floor",
    usage: "Commercial",
    units: [
      {
        id: "U01",
        usage: "Gym",
        area: 1500,
      },
      {
        id: "U02",
        usage: "Office",
        area: 1000,
      },
      {
        id: "U03",
        usage: "Shop",
        area: 700,
      },
    ],
  },

  {
    id: "F02",
    name: "2nd Floor",
    usage: "Office",
    units: [
      {
        id: "U01",
        usage: "Office A",
        area: 1000,
      },
      {
        id: "U02",
        usage: "Office B",
        area: 1200,
      },
    ],
  },

  {
    id: "F03",
    name: "3rd Floor",
    usage: "Residential",
    units: [
      {
        id: "U01",
        usage: "Apartment A",
        area: 1800,
      },
      {
        id: "U02",
        usage: "Apartment B",
        area: 1600,
      },
    ],
  },
];


// ==========================================
// DEFAULT VALUES
// ==========================================

const defaultFloor = floors[0];
const defaultUnit = floors[0].units[0];


// ==========================================
// APP
// ==========================================

function App() {

  // ========================================
  // VIEW STATE
  // ========================================

  const [show3D, setShow3D] = useState(false);


  // ========================================
  // SELECTED FLOOR
  // ========================================

  const [selectedFloor, setSelectedFloor] =
    useState(defaultFloor);


  // ========================================
  // SELECTED UNIT
  // ========================================

  const [selectedUnit, setSelectedUnit] =
    useState(defaultUnit);


  // ========================================
  // SEARCH
  // ========================================

  const [searchULPIN, setSearchULPIN] =
    useState("");

  const [searchMessage, setSearchMessage] =
    useState("");


  // ========================================
  // FLOOR SELECT
  // ========================================

  const handleFloorSelect = (floor) => {

    setSelectedFloor(floor);

    setSelectedUnit(floor.units[0]);

    setSearchMessage("");
  };


  // ========================================
  // UNIT SELECT
  // ========================================

  const handleUnitSelect = (floor, unit) => {

    setSelectedFloor(floor);

    setSelectedUnit(unit);

    setSearchMessage("");
  };


  // ========================================
  // VERTICAL ULPIN
  // ========================================

  const ulpin =
    `TN-TRI-001-B01-${selectedFloor.id}-${selectedUnit.id}`;


  // ========================================
  // SEARCH ULPIN
  // ========================================

  const handleSearchULPIN = () => {

    const value =
      searchULPIN.trim().toUpperCase();


    if (!value) {

      setSearchMessage(
        "Please enter a ULPIN."
      );

      return;
    }


    const parts = value.split("-");


    if (parts.length !== 6) {

      setSearchMessage(
        "Invalid ULPIN format."
      );

      return;
    }


    const floorId = parts[4];

    const unitId = parts[5];


    // Find floor

    const foundFloor =
      floors.find(
        (floor) =>
          floor.id === floorId
      );


    if (!foundFloor) {

      setSearchMessage(
        "Floor not found."
      );

      return;
    }


    // Find unit

    const foundUnit =
      foundFloor.units.find(
        (unit) =>
          unit.id === unitId
      );


    if (!foundUnit) {

      setSearchMessage(
        "Unit not found."
      );

      return;
    }


    // Select property

    setSelectedFloor(foundFloor);

    setSelectedUnit(foundUnit);


    // Open 3D view

    setShow3D(true);


    setSearchMessage(
      `Property found: ${foundFloor.name} - ${foundUnit.id}`
    );
  };


  // ========================================
  // BACK TO MAP
  // ========================================

  const handleBackToMap = () => {

    // Hide 3D

    setShow3D(false);


    // Reset selection

    setSelectedFloor(defaultFloor);

    setSelectedUnit(defaultUnit);


    // Clear search

    setSearchULPIN("");

    setSearchMessage("");
  };


  // ========================================
  // RETURN UI
  // ========================================

  return (

    <div className="app">


      {/* ================================== */}
      {/* HEADER */}
      {/* ================================== */}

      <header>

        <h1>
          3D ULPIN Property Mapping System
        </h1>

        <p>
          Vertical Property Identification Prototype
        </p>

      </header>


      {/* ================================== */}
      {/* MAP VIEW */}
      {/* ================================== */}

      {!show3D && (

        <section
          className="map-only-view"
        >

          <MapView
            onGenerate3D={() => {

              setShow3D(true);

            }}
          />

        </section>

      )}


      {/* ================================== */}
      {/* 3D VIEW */}
      {/* ================================== */}

      {show3D && (

        <main>


          {/* ================================ */}
          {/* 3D BUILDING */}
          {/* ================================ */}

          <section className="viewer">

            <Canvas
              camera={{
                position: [8, 6, 9],
                fov: 45,
              }}
              shadows
            >

              <ambientLight
                intensity={0.7}
              />


              <directionalLight
                position={[5, 10, 8]}
                intensity={2}
                castShadow
              />


              <Building3D

                floors={floors}

                selectedFloor={
                  selectedFloor
                }

                selectedUnit={
                  selectedUnit
                }

                onFloorSelect={
                  handleFloorSelect
                }

                onUnitSelect={
                  handleUnitSelect
                }

              />


              <OrbitControls />


              <gridHelper
                args={[12, 12]}
              />


              <mesh
                rotation={[
                  -Math.PI / 2,
                  0,
                  0,
                ]}
                position={[
                  0,
                  -1,
                  0,
                ]}
                receiveShadow
              >

                <planeGeometry
                  args={[15, 15]}
                />

                <meshStandardMaterial
                  color="#dbe4ea"
                />

              </mesh>


            </Canvas>

          </section>


          {/* ================================ */}
          {/* DETAILS PANEL */}
          {/* ================================ */}

          <section className="panel">


            {/* ============================= */}
            {/* SEARCH */}
            {/* ============================= */}

            <div className="search-box">

              <h2>
                🔎 Search Vertical ULPIN
              </h2>


              <input

                type="text"

                value={searchULPIN}

                onChange={(e) =>
                  setSearchULPIN(
                    e.target.value
                  )
                }

                placeholder="TN-TRI-001-B01-F01-U03"

              />


              <button
                className="search-button"
                onClick={
                  handleSearchULPIN
                }
              >

                Search ULPIN

              </button>


              {searchMessage && (

                <p className="search-message">

                  {searchMessage}

                </p>

              )}

            </div>


            {/* ============================= */}
            {/* PROPERTY DETAILS */}
            {/* ============================= */}

            <h2>
              Property Details
            </h2>


            {/* PARCEL */}

            <div className="info">

              <p>

                <strong>
                  Parcel ID
                </strong>

                <br />

                TN-TRI-001

              </p>


              {/* BUILDING */}

              <p>

                <strong>
                  Building ID
                </strong>

                <br />

                B01

              </p>


              {/* FLOOR */}

              <p>

                <strong>
                  Selected Floor
                </strong>

                <br />

                {selectedFloor.name}

              </p>


              {/* FLOOR USAGE */}

              <p>

                <strong>
                  Floor Usage
                </strong>

                <br />

                {selectedFloor.usage}

              </p>

            </div>
            {/* ================================= */}
{/* FLOOR SELECTOR */}
{/* ================================= */}

<div className="floor-section">

  <strong>
    Select Floor
  </strong>

  <div className="floor-buttons">

    {floors.map((floor) => (

      <button
        key={floor.id}
        onClick={() =>
          handleFloorSelect(floor)
        }
        className={
          selectedFloor.id === floor.id
            ? "floor-button active"
            : "floor-button"
        }
      >

        {floor.name}

      </button>

    ))}

  </div>

</div>


            {/* ============================= */}
            {/* UNIT SELECTION */}
            {/* ============================= */}

            <div className="unit-section">

              <strong>
                Select Unit
              </strong>


              <div className="unit-buttons">

                {selectedFloor.units.map(
                  (unit) => (

                    <button

                      key={unit.id}

                      onClick={() =>
                        handleUnitSelect(
                          selectedFloor,
                          unit
                        )
                      }

                      className={
                        selectedUnit.id === unit.id
                          ? "unit-button active"
                          : "unit-button"
                      }

                    >

                      {unit.id}

                    </button>

                  )
                )}

              </div>

            </div>


            {/* ============================= */}
            {/* UNIT DETAILS */}
            {/* ============================= */}

            <div className="info">

              <p>

                <strong>
                  Selected Unit
                </strong>

                <br />

                {selectedUnit.id}

              </p>


              <p>

                <strong>
                  Property Type
                </strong>

                <br />

                {selectedUnit.usage}

              </p>


              <p>

                <strong>
                  Area
                </strong>

                <br />

                {selectedUnit.area} sq.ft

              </p>

            </div>


            {/* ============================= */}
            {/* VERTICAL ULPIN */}
            {/* ============================= */}

            <div className="ulpin">

              <h3>
                🔑 Vertical ULPIN
              </h3>


              <div className="ulpin-value">

                {ulpin}

              </div>


              <p>
                Unique identifier for this
                vertical property
              </p>

            </div>


            {/* ============================= */}
            {/* HINT */}
            {/* ============================= */}

            <p className="hint">

              💡 Click a floor or unit directly
              in the 3D building.

            </p>


            {/* ============================= */}
            {/* BACK TO MAP */}
            {/* ============================= */}

            <button
              className="back-button"
              onClick={
                handleBackToMap
              }
            >

              ← Back to Map

            </button>


          </section>

        </main>

      )}

    </div>

  );
}

export default App;