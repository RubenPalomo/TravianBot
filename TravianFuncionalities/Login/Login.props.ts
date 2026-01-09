import { Page } from "puppeteer";

export interface LoginProps {
  page: Page;
  url: string;
  username: string;
  password: string;
}
