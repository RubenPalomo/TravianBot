import { Page } from "puppeteer";

export interface LoginProps {
  page: Page;
  username: string;
  password: string;
}
