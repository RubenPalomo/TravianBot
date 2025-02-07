import puppeteer, { Page } from "puppeteer";
import Login from "../Login/Login";
import SendResources from "../SendResources/SendResources";
import TroopsMovement from "../TroopsMovement/TroopsMovement";
import UpgradeBuilding from "../UpgradeBuilding/UpgradeBuilding";
import { TravianManagerProps } from "./TravianManager.props";
import TroopsRecruitment from "../TroopsRecruitment/TroopsRecruitment";

export default async function TravianManager({
  username,
  password,
  request,
  data,
}: TravianManagerProps): Promise<boolean> {
  const browser = await puppeteer.launch({ headless: false });

  try {
    const page: Page = await browser.newPage();
    let response: boolean = false;

    const isLoggedIn: boolean = await Login({
      page: page,
      username: username,
      password: password,
    });

    if (isLoggedIn) {
      switch (request) {
        case "/moveTroops":
          response = await TroopsMovement({
            page: page,
            coordinates: data.coordinates,
            troopType: data.troopType,
            troopAmount: data.troopAmount,
            troopDispatchType: data.troopDispatchType,
            fromVillageId: data.fromVillageId ?? undefined,
            executionCount: data.executionCount ?? undefined,
          });
          break;

        case "/moveTroopsx3":
          response = await TroopsMovement({
            page: page,
            coordinates: data.coordinates,
            troopType: data.troopType,
            troopAmount: data.troopAmount,
            troopDispatchType: data.troopDispatchType,
            fromVillageId: data.fromVillageId ?? undefined,
            executionCount: 3,
          });
          break;

        case "/sendResources":
          response = await SendResources({
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
            page: page,
            buildId: data.buildId,
            locationId: data.locationId,
            villageId: data.villageId,
          });
          break;

        case "/recruit":
          response = await TroopsRecruitment({
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

    await page.waitForNavigation();
    await browser.close();
    return response;
  } catch (error: any) {
    console.log(error);
    await browser.close();
    return false;
  }
}
