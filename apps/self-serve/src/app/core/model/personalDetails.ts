export interface SelectNationality{
  countryId: number,
  countryNo: number,
  countryCode: string,
  countryLongName: string,
  countryShortName: string
}
export interface SelectCitizen {
  citizenCode: string;
  citizenStatus: string;
  citizenLongName: string;
  citizenShortName: string;
}
export interface ToggleGender {
  value: string;
  label: string;
}
export interface SelectRace {
  raceId: number,
  raceCode: string,
  raceLongName: string,
  raceShortName: string
}
export interface SelectReligion {
  religionId: number,
  religionCode: string,
  religionLongName: string,
  religionShortName: string
}
export interface SelectMaritalStatus {
  maritalId: number,
  maritalCode: string,
  maritalLongName: string,
  maritalShortName: string
}
export interface SelectIndustry {
  employmentCode: string,
  employmentShortName: string;
}
export interface SelectProfession {
  occupationId: number,
  occupationCode: string,
  occupationLongName: string,
  occupationShortName: string
}
export interface SelectSettlementAccount {
  id: number;
  name: string;
}

export interface TitlePrefix {
  salutationId: number;
  salutationCode: string;
  salutationType: string;
  salutationLongName: string;
  salutationShortName: string;
}
export interface CountryPrefix{
  countryId: number,
  countryNo: number,
  countryCode: string,
  countryLongName: string,
  countryShortName: string
}
export interface StatePrefix {
  stateCode: string,
  countryCode: string,
  stateLongName: string,
  stateShortName: string
}