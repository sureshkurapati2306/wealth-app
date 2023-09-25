import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { AccountPersonalDetails } from '@cimb/shared/models';

@Component({
  selector: 'cimb-card-account-details',
  templateUrl: './card-account-details.component.html',
  styleUrls: ['./card-account-details.component.scss']
})
export class CardAccountDetailsComponent implements AfterViewInit {

  @Input() accountDetails: AccountPersonalDetails[];
  @Input() otherDetailsList: any;
  @Input() personalDetails: boolean;
  @Input() contactInformations: boolean;
  @Input() otherDetails: boolean;
  @Input() cardTitle: string;
  @Output() btnEdit = new EventEmitter<string>();

  constructor(
    private cdr: ChangeDetectorRef,
  ) { }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  edit() {
    this.btnEdit.emit(this.otherDetails ? 'otherDetails' : 'personalDetails');
  }

  getTitle(salutationCode) {
    return this.otherDetailsList.titleSalutations.filter(salutation => salutation['salutationCode'] === salutationCode)[0]['salutationLongName']
  }

  getNationalityName(countryCode) {
    return this.otherDetailsList.countryList.filter(country => country['countryCode'] === countryCode)[0]['countryLongName']
  }

  getCitizenName(citizenCode) {
    return this.otherDetailsList.citizenList.filter(citizen => citizen['citizenCode'] === citizenCode)[0]['citizenLongName']
  }

  getProfession(occupationCode) {
    return this.otherDetailsList.professionList.filter(profession => profession['occupationCode'] === occupationCode)[0]['occupationLongName']
  }

  getRaceName(raceCode) {
    return this.otherDetailsList.raceList.filter(race => race['raceCode'] === raceCode)[0]['raceLongName']
  }

  getMaritalName(maritalStatus) {
    if (maritalStatus.length === 1) {
      return this.otherDetailsList.martialStatusList.filter(marital => marital['maritalCode'] === maritalStatus)[0]['maritalLongName']
    } else {
      return this.otherDetailsList.martialStatusList.filter(marital => marital['maritalShortName'] === maritalStatus)[0]['maritalLongName']
    }
  }

  getReligionName(religionCode) {
    return this.otherDetailsList.religionList.filter(religion => religion['religionCode'] === religionCode)[0]['religionLongName']
  }

  getStateName(stateShortName) {
    if (stateShortName.length === 2) {
      return this.otherDetailsList.stateList.filter(state => state['stateCode'] === stateShortName)[0]['stateLongName'];
    } else {
      return this.otherDetailsList.stateList.filter(state => state['stateShortName'] === stateShortName)[0]['stateLongName'];
    }
  }

}
