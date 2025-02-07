import { TroopsRecruitmentProps } from "./TroopsRecruitment.props";

export default async function TroopsRecruitment({
  page,
  url,
  buildId,
  troopType,
  troopAmount,
  villageId,
  locationId,
}: TroopsRecruitmentProps): Promise<boolean> {
  try {
    await page.goto(
      `${url}build.php?${villageId ? `newdid=${villageId}` : ""}${locationId ? `&id=${locationId}` : ""}&gid=${buildId}`,
      {
        waitUntil: "networkidle2",
      },
    );

    await page.type('input[name="' + troopType + '"]', troopAmount.toString());
    await page.click('button[type="submit"]');

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
