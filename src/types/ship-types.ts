type BattleShipConfig = {
  shipTypes: ShipTypes;
  layout: Layout[];
};

type Layout = {
  ship: string;
  positions: number[][];
};

type ShipTypes = {
  carrier: Carrier;
  battleship: Carrier;
  cruiser: Carrier;
  destroyer: Carrier;
  submarine: Carrier;
};

type Carrier = {
  size: number;
  count: number;
};
