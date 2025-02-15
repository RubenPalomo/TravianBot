import { Page } from "puppeteer";

export interface SendResourcesProps {
  page: Page;
  url: string;
  coordinates: {
    x: string;
    y: string;
  };
  resourcesAmount: {
    lumber: number;
    clay: number;
    iron: number;
    crop: number;
  };
  fromVillageId?: string;
}
