import { PlayerBasicInfo } from "../model";

export interface PlayerCountryInfo extends PlayerBasicInfo {
  countryCode: string | null;
}
