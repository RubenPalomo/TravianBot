import { Page } from "puppeteer";

export interface TroopsRecruitmentProps {
  page: Page;
  url: string;
  buildId: string;
  troopAmount: number;
  troopType:
    | "t1"
    | "t2"
    | "t3"
    | "t4"
    | "t5"
    | "t6"
    | "t7"
    | "t8"
    | "t9"
    | "t10";
  villageId?: string;
  locationId?: string;
}
