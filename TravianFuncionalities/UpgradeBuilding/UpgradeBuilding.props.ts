import { Page } from "puppeteer";

export interface UpgradeBuildingProps {
  page: Page;
  url: string;
  buildId: string;
  locationId?: string;
  villageId?: string;
}
