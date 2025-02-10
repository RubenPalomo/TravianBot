interface UpgradeData {
  buildId: string;
  locationId?: string;
  villageId?: string;
}

export const parseUpgradeData = (data: string[]): UpgradeData | null => {
  const parsedData: UpgradeData = {
    buildId: "",
  };

  if (data.length === 1) {
    const urlObj = new URL(data[0]);
    const params = urlObj.searchParams;

    const villageId = params.get("newdid");
    const locationId = params.get("id");
    const buildId = params.get("gid");

    return {
      buildId,
      locationId,
      villageId,
    } as UpgradeData;
  }

  for (const element of data) {
    const [key, value] = element.split(":");
    if (!value) return null;
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
