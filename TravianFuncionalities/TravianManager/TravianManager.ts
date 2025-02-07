import puppeteer, { Page } from "puppeteer";
import Login from "../Login/Login";
import SendResources from "../SendResources/SendResources";
import TroopsMovement from "../TroopsMovement/TroopsMovement";
import UpgradeBuilding from "../UpgradeBuilding/UpgradeBuilding";
import { TravianManagerProps } from "./TravianManager.props";
import TroopsRecruitment from "../TroopsRecruitment/TroopsRecruitment";

export default async function TravianManager({
  url,
  username,
  password,
  request,
  data,
}: TravianManagerProps): Promise<boolean> {
  const browser = await puppeteer.launch({ headless: true });

  try {
    const page: Page = await browser.newPage();
    let response: boolean = false;

    const isLoggedIn: boolean = await Login({
      url: url,
      page: page,
      username: username,
      password: password,
    });

    if (isLoggedIn) {
      switch (request) {
        case "/movetroops":
          response = await TroopsMovement({
            url: url,
            page: page,
            coordinates: data.coordinates,
            troopType: data.troopType,
            troopAmount: data.troopAmount,
            troopDispatchType: data.troopDispatchType,
            fromVillageId: data.fromVillageId ?? undefined,
            executionCount: data.executionCount ?? undefined,
          });
          break;

        case "/movetroopsx3":
          response = await TroopsMovement({
            url: url,
            page: page,
            coordinates: data.coordinates,
            troopType: data.troopType,
            troopAmount: data.troopAmount,
            troopDispatchType: data.troopDispatchType,
            fromVillageId: data.fromVillageId ?? undefined,
            executionCount: 3,
          });
          break;

        case "/sendresources":
          response = await SendResources({
            url: url,
            page: page,
            coordinates: data.coordinates,
            resourcesAmount: {
              lumber: data.resourcesAmount.lumber,
              clay: data.resourcesAmount.clay,
              iron: data.resourcesAmount.iron,
              crop: data.resourcesAmount.crop,
            },
            fromVillageId: data.fromVillageId ?? undefined,
          });
          break;

        case "/upgrade":
          response = await UpgradeBuilding({
            url: url,
            page: page,
            buildId: data.buildId,
            locationId: data.locationId,
            villageId: data.villageId,
          });
          break;

        case "/recruit":
          response = await TroopsRecruitment({
            url: url,
            page: page,
            buildId: data.buildId,
            troopType: data.troopType,
            troopAmount: data.troopAmount,
            villageId: data.villageId,
          });

        default:
          break;
      }
    }

    await browser.close();
    return response;
  } catch (error: any) {
    console.error(error);
    await browser.close();
    return false;
  }
}
