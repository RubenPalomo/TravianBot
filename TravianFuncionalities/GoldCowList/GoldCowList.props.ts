import { Page } from "puppeteer";

export interface GoldCowListProps {
  page: Page;
  url: string;
  villageId?: string;
}
