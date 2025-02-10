import { UpgradeBuildingProps } from "./UpgradeBuilding.props";

export default async function UpgradeBuilding({
  page,
  url,
  buildId,
  locationId,
  villageId,
}: UpgradeBuildingProps): Promise<boolean> {
  try {
    await page.goto(
      `${url}build.php?${villageId ? `newdid=${villageId}` : ""}&gid=${buildId}${locationId ? `&id=${locationId}` : ""}`,
      { waitUntil: "networkidle2" },
    );

    await page.click("button.textButtonV1.green.build");

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
