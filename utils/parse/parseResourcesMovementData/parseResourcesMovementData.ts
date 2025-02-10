interface ResourcesMovementData {
  coordinates: {
    x: string;
    y: string;
  };
  resourcesAmount: {
    lumber: number;
    clay: number;
    iron: number;
    crop: number;
  };
  fromVillageId?: string;
}

export const parseResourcesMovementData = (
  data: string[],
): ResourcesMovementData | null => {
  const parsedData: ResourcesMovementData = {
    coordinates: {
      x: "",
      y: "",
    },
    resourcesAmount: {
      lumber: 0,
      clay: 0,
      iron: 0,
      crop: 0,
    },
  };

  for (const element of data) {
    const [key, value] = element.split(":");
    if (!value) return null;
    switch (key) {
      case "coordinates":
        const [x, y] = value.slice(1, -1).split(",");
        parsedData.coordinates.x = x;
        parsedData.coordinates.y = y;
        break;

      case "lumber":
        parsedData.resourcesAmount.lumber = parseInt(value);
        break;

      case "clay":
        parsedData.resourcesAmount.clay = parseInt(value);
        break;

      case "iron":
        parsedData.resourcesAmount.iron = parseInt(value);
        break;

      case "crop":
        parsedData.resourcesAmount.crop = parseInt(value);
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
