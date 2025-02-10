import { Page } from "puppeteer";

export interface TroopsMovementProps {
  page: Page;
  url: string;
  coordinates: {
    x: string;
    y: string;
  };
  troopAmount: number;
  troopDispatchType: number; // Reinforcement = 2; Attack = 3; Robbery = 4
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
  fromVillageId?: string;
  executionCount?: number;
}
