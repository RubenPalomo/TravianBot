import { Page } from "puppeteer";

export interface UpgradeBuildingProps {
  page: Page;
  buildId: string;
  locationId?: string;
  villageId?: string;
}
