import { SendResourcesProps } from "./SendResources.props";

export default async function SendResources({
  page,
  url,
  coordinates,
  resourcesAmount,
  fromVillageId,
}: SendResourcesProps): Promise<boolean> {
  try {
    await page.goto(
      `${url}build.php?${fromVillageId ? `newdid=${fromVillageId}` : ""}&t=5&gid=17&x=${coordinates.x}&y=${coordinates.y}`,
      { waitUntil: "networkidle2" },
    );

    await page.waitForSelector('input[name="lumber"]', { visible: true });
    await page.type('input[name="lumber"]', resourcesAmount.lumber.toString());
    await page.type('input[name="clay"]', resourcesAmount.clay.toString());
    await page.type('input[name="iron"]', resourcesAmount.iron.toString());
    await page.type('input[name="crop"]', resourcesAmount.crop.toString());

    await page.click('button[type="submit"]');

    return true;
  } catch (error: any) {
    console.error(error);
    return false;
  }
}
