interface UpgradeData {
  buildId: string;
  locationId?: string;
  villageId?: string;
}

export const parseUpgradeData = (data: string[]): UpgradeData | null => {
  const parsedData: UpgradeData = {
    buildId: "",
  };

  for (const element of data) {
    const [key, value] = element.split(":");
    switch (key) {
      case "buildId":
        parsedData.buildId = value;
        break;

      case "locationId":
        parsedData.locationId = value;
        break;

      case "villageId":
        parsedData.villageId = value;
        break;

      default:
        return null;
    }
  }

  return parsedData;
};
