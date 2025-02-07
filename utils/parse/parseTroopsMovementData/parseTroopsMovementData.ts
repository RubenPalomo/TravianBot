interface TroopsMovementData {
  coordinates: {
    x: string;
    y: string;
  };
  troopType:
    | "t1"
    | "t2"
    | "t3"
    | "t4"
    | "t5"
    | "t6"
    | "t7"
    | "t8"
    | "t9"
    | "t10";
  troopAmount: number;
  troopDispatchType: number;
  fromVillageId?: string;
}

export const parseTroopsMovementData = (
  data: string[],
): TroopsMovementData | null => {
  const parsedData: TroopsMovementData = {
    coordinates: {
      x: "",
      y: "",
    },
    troopType: "t1",
    troopAmount: 0,
    troopDispatchType: 0,
  };

  for (const element of data) {
    const [key, value] = element.split(":");
    switch (key) {
      case "coordinates":
        const [x, y] = value.slice(1, -1).split(",");
        parsedData.coordinates.x = x;
        parsedData.coordinates.y = y;
        break;

      case "troopType":
        parsedData.troopType = value as TroopsMovementData["troopType"];
        break;

      case "troopAmount":
        parsedData.troopAmount = parseInt(value);
        break;

      case "troopDispatchType":
        parsedData.troopDispatchType = parseInt(value);
        break;

      case "from":
        parsedData.fromVillageId = value;
        break;

      default:
        return null;
    }
  }

  return parsedData;
};
