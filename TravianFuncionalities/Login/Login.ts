import { LoginProps } from "./Login.props";
import { url } from "../../utils/consts/travianConstants";

export default async function Login({
  page,
  username,
  password,
}: LoginProps): Promise<boolean> {
  try {
    await page.goto(url, { waitUntil: "networkidle2" });

    await page.type('input[name="name"]', username);
    await page.type('input[name="password"]', password);
    await page.click('button[type="submit"]');
    await page.waitForNavigation();

    return true;
  } catch (error: any) {
    console.log(error);
    return false;
  }
}
