import { capitalize } from "lodash";
import Image from "next/image";
import React from "react";

type Props = {
  shipTypes: ShipTypes;
  shipName: "carrier" | "battleship" | "cruiser" | "destroyer" | "submarine";
  destroyed: number;
};

export const ShipStatus = ({ shipTypes, shipName, destroyed }: Props) => {
  const ship = shipTypes[shipName];
  const imageUrl = `/assets/${capitalize(shipName)} Shape.png`;

  return (
    <div className="flex">
      <Image
        width={200}
        height={75}
        src={imageUrl}
        alt={`${shipName} shape image`}
      />
      <div className="flex items-center ml-3">
        {Array(ship.size)
          .fill(undefined)
          .map((_, i) => (
            <Image
              key={i}
              width={16}
              height={16}
              src="/assets/Miss small.png"
              alt=""
            />
          ))}
      </div>
    </div>
  );
};
