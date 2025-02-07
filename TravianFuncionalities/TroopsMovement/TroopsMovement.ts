import { TroopsMovementProps } from "./TroopsMovement.props";
import { url } from "../../utils/consts/travianConstants";

export default async function TroopsMovement({
  page,
  coordinates,
  troopAmount,
  troopDispatchType,
  troopType,
  fromVillageId,
  executionCount,
}: TroopsMovementProps): Promise<boolean> {
  try {
    for (let index = 0; index < (executionCount ?? 1); index++) {
      await page.goto(
        `${url}build.php?${fromVillageId && "newdid=" + fromVillageId}&id=39&tt=2&gid=16&x=${coordinates.x}&y=${coordinates.y}`,
        { waitUntil: "networkidle2" },
      );

      const inputTroopType = `input[name="troop[${troopType}]"]`;
      await page.waitForSelector(inputTroopType, { visible: true });
      await page.type(inputTroopType, troopAmount.toString());
      await page.click(
        `input[type="radio"][name="eventType"][value="${troopDispatchType}"]`,
      );

      await page.click('button[type="submit"]');
      await page.waitForNavigation();

      await page.click('button[name="confirmSendTroops"]');
      await page.waitForNavigation();
    }

    return true;
  } catch (error: any) {
    console.log(error);
    return false;
  }
}
