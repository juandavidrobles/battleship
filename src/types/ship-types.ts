type BattleShipConfig = {
  shipTypes: ShipTypes;
  layout: Layout[];
};

type Layout = {
  ship: string;
  positions: number[][];
};

type ShipTypes = {
  carrier: ShipDetails;
  battleship: ShipDetails;
  cruiser: ShipDetails;
  destroyer: ShipDetails;
  submarine: ShipDetails;
};

type ShipDetails = {
  size: number;
  count: number;
};
