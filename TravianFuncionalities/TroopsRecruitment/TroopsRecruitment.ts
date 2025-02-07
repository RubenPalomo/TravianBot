import { url } from "../../utils/consts/travianConstants";
import { TroopsRecruitmentProps } from "./TroopsRecruitment.props";

export default async function TroopsRecruitment({
  page,
  buildId,
  troopType,
  troopAmount,
  villageId,
}: TroopsRecruitmentProps): Promise<boolean> {
  try {
    await page.goto(
      `${url}build.php?${villageId && "newdid=" + villageId}&gid=${buildId}`,
      {
        waitUntil: "networkidle2",
      },
    );

    await page.type('input[name="' + troopType + '"]', troopAmount.toString());
    await page.click('button[type="submit"]');

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
