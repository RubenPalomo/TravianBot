import { ElementHandle } from "puppeteer";
import { GoldCowListProps } from "./GoldCowList.props";

export default async function GoldCowList({
  page,
  url,
  villageId,
}: GoldCowListProps): Promise<boolean> {
  try {
    await page.goto(
      `${url}build.php?${villageId ? `newdid=${villageId}` : ""}&id=39&gid=16&tt=99`,
      { waitUntil: "networkidle2" }
    );

    const goldButtons: ElementHandle<HTMLButtonElement>[] = await page.$$(
      "button.textButtonV2.buttonFramed.startAllFarmLists.rectangle.withText.green"
    );

    if (goldButtons.length > 0)
      await goldButtons[goldButtons.length - 1].click();

    return true;
  } catch (error: any) {
    console.error(error);
    return false;
  }
}
