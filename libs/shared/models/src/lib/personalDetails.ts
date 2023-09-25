export interface AutocompleteNationality {
  name: string;
}
export interface SelectCitizen {
  id: number;
  name: string;
}
export interface ToggleGender {
  value: number;
  label: string;
}
export interface SelectRace {
  id: number;
  name: string;
}
export interface SelectReligion {
  id: number;
  name: string;
}
export interface SelectMaritalStatus {
  id: number;
  name: string;
}
export interface AutocompleteIndustryOption {
  id: number;
  name: string;
}
export interface AutocompleteIndustry {
  name: string;
  option: AutocompleteIndustryOption[];
}
export interface AutocompleteProfession {
  id: number;
  name: string;
}
export interface SelectSettlementAccount {
  id: number;
  name: string;
}
export interface SelectPrefix {
  id: number;
  name: string;
}