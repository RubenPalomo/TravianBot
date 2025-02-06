import { UpgradeBuildingProps } from "./UpgradeBuilding.props";

export default async function UpgradeBuilding({
  page,
  buildId,
  locationId,
  villageId,
}: UpgradeBuildingProps): Promise<boolean> {
  try {
    await page.goto(
      `${process.env.URL}build.php?${villageId && "newdid=" + villageId}&gid=${buildId}${locationId && "&id=" + locationId}`,
      { waitUntil: "networkidle2" },
    );

    await page.click('button[version="textButtonV1"]');

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
