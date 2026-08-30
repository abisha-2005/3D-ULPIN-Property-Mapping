import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useState } from "react";

import MapView from "./components/MapView";
import Building3D from "./components/Building3D";

import "./App.css";

// ===============================
// PROPERTY DATA
// ===============================

const floors = [
  {
    id: "F00",
    name: "Ground Floor",
    usage: "Commercial",

    color: "#f59e0b",

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

    color: "#22c55e",

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

    color: "#3b82f6",

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

    color: "#8b5cf6",

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


// ===============================
// MAIN APP
// ===============================

function App() {

  // Map / 3D state

  const [show3D, setShow3D] = useState(false);

  // Selected floor

  const [selectedFloor, setSelectedFloor] =
    useState(floors[0]);

  // Selected unit

  const [selectedUnit, setSelectedUnit] =
    useState(floors[0].units[0]);


  // ===============================
  // FLOOR SELECTION
  // ===============================

  const handleFloorSelect = (floor) => {

    setSelectedFloor(floor);

    // Automatically select first unit
    // of selected floor

    setSelectedUnit(floor.units[0]);
  };


  // ===============================
  // UNIT SELECTION
  // ===============================

  const handleUnitSelect = (floor, unit) => {

    setSelectedFloor(floor);

    setSelectedUnit(unit);
  };


  // ===============================
  // ULPIN GENERATION
  // ===============================

  const ulpin =
    `TN-TRI-001-B01-${selectedFloor.id}-${selectedUnit.id}`;


  return (

    <div className="app">

      {/* =============================== */}
      {/* HEADER */}
      {/* =============================== */}

      <header>

        <h1>
          3D ULPIN Property Mapping System
        </h1>

        <p>
          Vertical Property Identification Prototype
        </p>

      </header>


      {/* =============================== */}
      {/* MAIN CONTENT */}
      {/* =============================== */}

      <main>


        {/* =============================== */}
        {/* MAP / 3D VIEW */}
        {/* =============================== */}

        <section className="viewer">


          {/* =============================== */}
          {/* MAP VIEW */}
          {/* =============================== */}

          {!show3D && (

            <MapView
              onGenerate3D={() => {
                setShow3D(true);
              }}
            />

          )}


          {/* =============================== */}
          {/* 3D VIEW */}
          {/* =============================== */}

          {show3D && (

            <Canvas
              camera={{
                position: [8, 6, 9],
                fov: 45,
              }}

              shadows
            >


              {/* LIGHT */}

              <ambientLight
                intensity={0.7}
              />


              <directionalLight
                position={[5, 10, 8]}
                intensity={2}
                castShadow
              />


              {/* =============================== */}
              {/* BUILDING */}
              {/* =============================== */}

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


              {/* =============================== */}
              {/* CAMERA CONTROL */}
              {/* =============================== */}

              <OrbitControls />


              {/* =============================== */}
              {/* GROUND GRID */}
              {/* =============================== */}

              <gridHelper
                args={[12, 12]}
              />


              {/* =============================== */}
              {/* GROUND PLANE */}
              {/* =============================== */}

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

          )}

        </section>


        {/* =============================== */}
        {/* PROPERTY INFORMATION */}
        {/* =============================== */}

        <section className="panel">


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


            {/* USAGE */}

            <p>

              <strong>
                Floor Usage
              </strong>

              <br />

              {selectedFloor.usage}

            </p>


          </div>


          {/* =============================== */}
          {/* UNIT SELECTION */}
          {/* =============================== */}

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


          {/* =============================== */}
          {/* SELECTED UNIT DETAILS */}
          {/* =============================== */}

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


          {/* =============================== */}
          {/* ULPIN */}
          {/* =============================== */}

          <div className="ulpin">

            <h3>
              🔑 Vertical ULPIN
            </h3>


            <div className="ulpin-value">

              {ulpin}

            </div>


            <p>

              Unique identifier for
              this vertical property

            </p>

          </div>


          {/* =============================== */}
          {/* HELP TEXT */}
          {/* =============================== */}

          <p className="hint">

            💡 Click a floor or unit
            directly in the 3D building.

          </p>


          {/* =============================== */}
          {/* BACK TO MAP */}
          {/* =============================== */}

          {show3D && (

            <button
              className="back-button"
              onClick={() => {
                setShow3D(false);
              }}
            >

              ← Back to Map

            </button>

          )}


        </section>

      </main>

    </div>

  );
}


export default App;