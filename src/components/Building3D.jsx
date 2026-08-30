import { Text } from "@react-three/drei";

function Building3D({
  floors,
  selectedFloor,
  selectedUnit,
  onFloorSelect,
  onUnitSelect,
}) {
  const FLOOR_HEIGHT = 1.5;
  const BUILDING_WIDTH = 5;
  const BUILDING_DEPTH = 4;

  return (
    <group>

      {floors.map((floor) => {

        const floorNumber = Number(
          floor.id.replace("F", "")
        );

        const y = floorNumber * FLOOR_HEIGHT;

        const isSelectedFloor =
          selectedFloor.id === floor.id;

        const units = floor.units;

        return (
          <group key={floor.id}>

            {/* FLOOR BASE */}

            <mesh
              position={[0, y - 0.65, 0]}
              onClick={(e) => {
                e.stopPropagation();
                onFloorSelect(floor);
              }}
            >
              <boxGeometry
                args={[
                  BUILDING_WIDTH,
                  0.15,
                  BUILDING_DEPTH,
                ]}
              />

              <meshStandardMaterial
                color={
                  isSelectedFloor
                    ? "#ef4444"
                    : "#64748b"
                }
              />
            </mesh>


            {/* BACK WALL */}

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
                  1.3,
                  0.12,
                ]}
              />

              <meshStandardMaterial
                color="#e5e7eb"
              />
            </mesh>


            {/* LEFT WALL */}

            <mesh
              position={[
                -BUILDING_WIDTH / 2,
                y,
                0,
              ]}
            >
              <boxGeometry
                args={[
                  0.12,
                  1.3,
                  BUILDING_DEPTH,
                ]}
              />

              <meshStandardMaterial
                color="#e5e7eb"
              />
            </mesh>


            {/* RIGHT WALL */}

            <mesh
              position={[
                BUILDING_WIDTH / 2,
                y,
                0,
              ]}
            >
              <boxGeometry
                args={[
                  0.12,
                  1.3,
                  BUILDING_DEPTH,
                ]}
              />

              <meshStandardMaterial
                color="#e5e7eb"
              />
            </mesh>


            {/* FRONT GLASS WALL */}

            <mesh
              position={[
                0,
                y,
                BUILDING_DEPTH / 2,
              ]}
            >
              <boxGeometry
                args={[
                  BUILDING_WIDTH,
                  1.3,
                  0.1,
                ]}
              />

              <meshStandardMaterial
                color="#cbd5e1"
                transparent
                opacity={0.15}
              />
            </mesh>


            {/* FLOOR LABEL */}

            <Text
              position={[
                -3.4,
                y + 0.35,
                2.2,
              ]}
              fontSize={0.25}
              color="black"
              anchorX="left"
              anchorY="middle"
            >
              {floor.name}
            </Text>


            {/* ========================= */}
            {/* UNITS */}
            {/* ========================= */}

            {isSelectedFloor &&
              units.map((unit, index) => {

                const totalUnits =
                  units.length;

                const unitWidth =
                  BUILDING_WIDTH / totalUnits;

                const x =
                  -BUILDING_WIDTH / 2 +
                  unitWidth / 2 +
                  index * unitWidth;

                const isSelectedUnit =
                  selectedUnit?.id === unit.id;


                return (
                  <group key={unit.id}>


                    {/* UNIT BOX */}

                    <mesh
                      position={[
                        x,
                        y,
                        0,
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
                          unitWidth - 0.15,
                          1.0,
                          BUILDING_DEPTH - 0.25,
                        ]}
                      />

                      <meshStandardMaterial
                        color={
                          isSelectedUnit
                            ? "#facc15"
                            : "#f8fafc"
                        }
                        transparent
                        opacity={0.8}
                        emissive={
                          isSelectedUnit
                            ? "#facc15"
                            : "#000000"
                        }
                        emissiveIntensity={
                          isSelectedUnit
                            ? 0.3
                            : 0
                        }
                      />

                    </mesh>


                    {/* ========================= */}
                    {/* UNIT ID */}
                    {/* ========================= */}

                    <Text
                      position={[
                        x,
                        y + 0.15,
                        2.08,
                      ]}
                      fontSize={0.30}
                      color="black"
                      anchorX="center"
                      anchorY="middle"
                    >

                      {unit.id}

                    </Text>


                    {/* ========================= */}
                    {/* UNIT TYPE */}
                    {/* ========================= */}

                    <Text
                      position={[
                        x,
                        y - 0.18,
                        2.08,
                      ]}
                      fontSize={0.16}
                      color="#374151"
                      anchorX="center"
                      anchorY="middle"
                    >

                      {unit.usage}

                    </Text>


                    {/* ========================= */}
                    {/* UNIT DIVIDER */}
                    {/* ========================= */}

                    {index < totalUnits - 1 && (

                      <mesh
                        position={[
                          x + unitWidth / 2,
                          y,
                          2.02,
                        ]}
                      >

                        <boxGeometry
                          args={[
                            0.06,
                            1.0,
                            0.08,
                          ]}
                        />

                        <meshStandardMaterial
                          color="#475569"
                        />

                      </mesh>

                    )}

                  </group>
                );

              })}

          </group>
        );

      })}

    </group>
  );
}

export default Building3D;