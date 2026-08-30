import { Text } from "@react-three/drei";

function Building3D({
  floors,
  selectedFloor,
  selectedUnit,
  onFloorSelect,
  onUnitSelect,
}) {
  // ==========================================
  // BUILDING SETTINGS
  // ==========================================

  const FLOOR_HEIGHT = 1.8;

  const BUILDING_WIDTH = 6;
  const BUILDING_DEPTH = 4.5;

  const WALL_HEIGHT = 1.45;

  // ==========================================
  // BUILDING
  // ==========================================

  return (
    <group>

      {/* =====================================================
          ALL FLOORS
      ===================================================== */}

      {floors.map((floor) => {

        // F00 -> 0
        // F01 -> 1
        // F02 -> 2
        // F03 -> 3

        const floorNumber = Number(
          floor.id.replace("F", "")
        );

        const y =
          floorNumber * FLOOR_HEIGHT;

        // Is this the currently selected floor?
        const isSelectedFloor =
          selectedFloor?.id === floor.id;

        const units = floor.units || [];

        return (
          <group key={floor.id}>

            {/* =================================================
                FLOOR SLAB
            ================================================= */}

            <mesh
              position={[
                0,
                y - 0.72,
                0,
              ]}
              onClick={(e) => {
                e.stopPropagation();

                onFloorSelect(floor);
              }}
            >

              <boxGeometry
                args={[
                  BUILDING_WIDTH,
                  0.16,
                  BUILDING_DEPTH,
                ]}
              />

              <meshStandardMaterial
                color={
                  isSelectedFloor
                    ? "#2563eb"
                    : "#64748b"
                }

                emissive={
                  isSelectedFloor
                    ? "#1d4ed8"
                    : "#000000"
                }

                emissiveIntensity={
                  isSelectedFloor
                    ? 0.25
                    : 0
                }
              />

            </mesh>


            {/* =================================================
                BACK WALL
            ================================================= */}

            <mesh
              position={[
                0,
                y,
                -BUILDING_DEPTH / 2,
              ]}
            >

              <boxGeometry
                args={[
                  BUILDING_WIDTH,
                  WALL_HEIGHT,
                  0.15,
                ]}
              />

              <meshStandardMaterial
                color="#d1d5db"
              />

            </mesh>


            {/* =================================================
                LEFT WALL
            ================================================= */}

            <mesh
              position={[
                -BUILDING_WIDTH / 2,
                y,
                0,
              ]}
            >

              <boxGeometry
                args={[
                  0.15,
                  WALL_HEIGHT,
                  BUILDING_DEPTH,
                ]}
              />

              <meshStandardMaterial
                color="#d1d5db"
              />

            </mesh>


            {/* =================================================
                RIGHT WALL
            ================================================= */}

            <mesh
              position={[
                BUILDING_WIDTH / 2,
                y,
                0,
              ]}
            >

              <boxGeometry
                args={[
                  0.15,
                  WALL_HEIGHT,
                  BUILDING_DEPTH,
                ]}
              />

              <meshStandardMaterial
                color="#d1d5db"
              />

            </mesh>


            {/* =================================================
                FLOOR LABEL
            ================================================= */}

            <Text
              position={[
                -3.65,
                y + 0.35,
                0,
              ]}
              rotation={[
                0,
                Math.PI / 2,
                0,
              ]}
              fontSize={0.22}
              color="#1e293b"
              anchorX="center"
              anchorY="middle"
            >

              {floor.name}

            </Text>


            {/* =================================================
                UNITS
                IMPORTANT:
                ALL FLOOR UNITS ARE RENDERED
            ================================================= */}

            {units.map((unit, index) => {

              // ----------------------------------------------
              // Unit width
              // ----------------------------------------------

              const unitWidth =
                BUILDING_WIDTH / units.length;


              // ----------------------------------------------
              // Unit X position
              // ----------------------------------------------

              const x =
                -BUILDING_WIDTH / 2 +
                unitWidth / 2 +
                index * unitWidth;


              // ----------------------------------------------
              // IMPORTANT SELECTION LOGIC
              //
              // Floor + Unit must match.
              //
              // So:
              // F01 + U01 != F02 + U01
              // ----------------------------------------------

              const isSelectedUnit =
                selectedFloor?.id === floor.id &&
                selectedUnit?.id === unit.id;


              return (
                <group
                  key={`${floor.id}-${unit.id}`}
                >


                  {/* =================================================
                      UNIT FRONT PANEL
                  ================================================= */}

                  <mesh
                    position={[
                      x,
                      y,
                      BUILDING_DEPTH / 2,
                    ]}
                    onClick={(e) => {

                      e.stopPropagation();

                      onUnitSelect(
                        floor,
                        unit
                      );

                    }}
                  >

                    <boxGeometry
                      args={[
                        unitWidth - 0.08,
                        WALL_HEIGHT,
                        0.12,
                      ]}
                    />

                    <meshStandardMaterial

                      color={
                        isSelectedUnit
                          ? "#facc15"
                          : "#f1f5f9"
                      }

                      emissive={
                        isSelectedUnit
                          ? "#facc15"
                          : "#000000"
                      }

                      emissiveIntensity={
                        isSelectedUnit
                          ? 0.45
                          : 0
                      }

                    />

                  </mesh>


                  {/* =================================================
                      DOOR
                  ================================================= */}

                  <mesh
                    position={[
                      x,
                      y - 0.15,
                      BUILDING_DEPTH / 2 + 0.08,
                    ]}
                  >

                    <boxGeometry
                      args={[
                        Math.min(
                          0.55,
                          unitWidth * 0.35
                        ),
                        0.9,
                        0.08,
                      ]}
                    />

                    <meshStandardMaterial
                      color="#78350f"
                    />

                  </mesh>


                  {/* =================================================
                      LEFT WINDOW
                  ================================================= */}

                  <mesh
                    position={[
                      x - unitWidth * 0.28,
                      y + 0.25,
                      BUILDING_DEPTH / 2 + 0.08,
                    ]}
                  >

                    <boxGeometry
                      args={[
                        0.45,
                        0.38,
                        0.06,
                      ]}
                    />

                    <meshStandardMaterial
                      color="#93c5fd"
                      transparent
                      opacity={0.8}
                    />

                  </mesh>


                  {/* =================================================
                      RIGHT WINDOW
                  ================================================= */}

                  <mesh
                    position={[
                      x + unitWidth * 0.28,
                      y + 0.25,
                      BUILDING_DEPTH / 2 + 0.08,
                    ]}
                  >

                    <boxGeometry
                      args={[
                        0.45,
                        0.38,
                        0.06,
                      ]}
                    />

                    <meshStandardMaterial
                      color="#93c5fd"
                      transparent
                      opacity={0.8}
                    />

                  </mesh>


                  {/* =================================================
                      UNIT ID
                  ================================================= */}

                  <Text
                    position={[
                      x,
                      y + 0.58,
                      BUILDING_DEPTH / 2 + 0.13,
                    ]}
                    fontSize={0.27}
                    color="#111827"
                    anchorX="center"
                    anchorY="middle"
                  >

                    {unit.id}

                  </Text>


                  {/* =================================================
                      PROPERTY TYPE
                  ================================================= */}

                  <Text
                    position={[
                      x,
                      y + 0.42,
                      BUILDING_DEPTH / 2 + 0.13,
                    ]}
                    fontSize={0.12}
                    color="#475569"
                    anchorX="center"
                    anchorY="middle"
                  >

                    {unit.usage}

                  </Text>


                  {/* =================================================
                      UNIT DIVIDER
                  ================================================= */}

                  {index < units.length - 1 && (

                    <mesh
                      position={[
                        x + unitWidth / 2,
                        y,
                        BUILDING_DEPTH / 2 + 0.05,
                      ]}
                    >

                      <boxGeometry
                        args={[
                          0.07,
                          WALL_HEIGHT,
                          0.1,
                        ]}
                      />

                      <meshStandardMaterial
                        color="#475569"
                      />

                    </mesh>

                  )}


                  {/* =================================================
                      SELECTED UNIT
                      VERTICAL ULPIN LABEL
                  ================================================= */}

                  {isSelectedUnit && (
                    <group>


                      {/* -------------------------------------------
                          ULPIN TEXT
                      ------------------------------------------- */}

                      <Text
                        position={[
                          x,
                          y + 0.88,
                          BUILDING_DEPTH / 2 + 0.18,
                        ]}
                        fontSize={0.14}
                        color="#1d4ed8"
                        anchorX="center"
                        anchorY="middle"
                      >

                        TN-TRI-001-B01-{floor.id}-{unit.id}

                      </Text>


                      {/* -------------------------------------------
                          BLUE INDICATOR
                      ------------------------------------------- */}

                      <mesh
                        position={[
                          x,
                          y + 1.02,
                          BUILDING_DEPTH / 2 + 0.08,
                        ]}
                      >

                        <sphereGeometry
                          args={[
                            0.07,
                            16,
                            16,
                          ]}
                        />

                        <meshStandardMaterial
                          color="#2563eb"
                          emissive="#2563eb"
                          emissiveIntensity={2}
                        />

                      </mesh>

                    </group>
                  )}

                </group>
              );
            })}

          </group>
        );
      })}


      {/* =====================================================
          STAIRCASE
      ===================================================== */}

      <group
        position={[
          3.2,
          0,
          -0.8,
        ]}
      >

        {Array.from({
          length: 8,
        }).map((_, index) => (

          <mesh
            key={index}
            position={[
              0,
              index * 0.18,
              index * 0.28,
            ]}
          >

            <boxGeometry
              args={[
                1.0,
                0.18,
                0.32,
              ]}
            />

            <meshStandardMaterial
              color="#94a3b8"
            />

          </mesh>

        ))}

      </group>


      {/* =====================================================
          ROOF
      ===================================================== */}

      <mesh
        position={[
          0,
          floors.length * FLOOR_HEIGHT + 0.1,
          0,
        ]}
      >

        <boxGeometry
          args={[
            BUILDING_WIDTH + 0.3,
            0.25,
            BUILDING_DEPTH + 0.3,
          ]}
        />

        <meshStandardMaterial
          color="#475569"
        />

      </mesh>


      {/* =====================================================
          ROOFTOP STRUCTURE
      ===================================================== */}

      <mesh
        position={[
          0,
          floors.length * FLOOR_HEIGHT + 0.5,
          0,
        ]}
      >

        <boxGeometry
          args={[
            2,
            0.7,
            1.4,
          ]}
        />

        <meshStandardMaterial
          color="#9ca3af"
        />

      </mesh>


      {/* =====================================================
          MAIN ENTRANCE
      ===================================================== */}

      <mesh
        position={[
          0,
          -0.35,
          BUILDING_DEPTH / 2 + 0.08,
        ]}
      >

        <boxGeometry
          args={[
            0.8,
            1.1,
            0.08,
          ]}
        />

        <meshStandardMaterial
          color="#451a03"
        />

      </mesh>


      {/* =====================================================
          MAIN ENTRANCE LABEL
      ===================================================== */}

      <Text
        position={[
          0,
          0.35,
          BUILDING_DEPTH / 2 + 0.12,
        ]}
        fontSize={0.16}
        color="#334155"
        anchorX="center"
        anchorY="middle"
      >

        MAIN ENTRY

      </Text>

    </group>
  );
}

export default Building3D;