import dotenv from "dotenv";
import puppeteer from "puppeteer";
import Login from "./TravianFuncionalities/Login/Login";

dotenv.config;

const username: string = "USERNAME";
const password: string = "PASSWORD";

(async () => {
  const browser = await puppeteer.launch({ headless: true });

  try {
    const page = await browser.newPage();

    const isLogged: boolean = await Login({ page, username, password });
    if (!isLogged) throw new Error();

  } catch (error) {
    // console.log(error);
  } finally {
    await browser.close();
  }
})();
