interface TroopsRecruitmentData {
  buildId: string;
  troopAmount: number;
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
  locationId?: string;
  villageId?: string;
}

export const parseTroopsRecruitmentData = (
  data: string[],
): TroopsRecruitmentData | null => {
  const parsedData: TroopsRecruitmentData = {
    buildId: "",
    troopAmount: 0,
    troopType: "t1",
  };

  for (const element of data) {
    const [key, value] = element.split(":");
    if (!value) return null;
    switch (key) {
      case "buildId":
        parsedData.buildId = value;
        break;

      case "troopType":
        parsedData.troopType = value as TroopsRecruitmentData["troopType"];
        break;

      case "troopAmount":
        parsedData.troopAmount = parseInt(value);
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
