import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
@Injectable({
    providedIn: 'root',
})
export class AccountService {
    constructor(private http: HttpClient) {}

    getUserProfile(parameter?) {
        return this.http.get(
            environment.apiUrl + environment.ut + '/customer/' + (parameter || ''),
        );
    }

    postAccountOpening(postObj) {
        return this.http.post(environment.apiUrl + environment.ut + '/utaccount', postObj);
    }

    postAccountOpeningAudit(postObj) {
        return this.http.post(
            environment.apiUrl + environment.wealth + '/utaccount-audit',
            postObj,
        );
    }

    postCustomerDetails() {
        return this.http.post(environment.apiUrl + environment.wealth + '/customerdetails', {
            cif: null,
        });
    }

    getCifInquiry() {
        return this.http.get(environment.apiUrl + environment.wealth + '/cifinquiry');
    }

    getAccountDetail(cusId: string, cifNum: string) {
        return this.http.get(
            environment.apiUrl +
                environment.emanager +
                '/account/getAccountDetail/' +
                cusId +
                '/' +
                cifNum,
        );
    }

    contactFromMultipleSources(param): Observable<any[]> {
        const titleSalutations = this.getTitleSalutations();
        const countryList = this.getCountryList();
        const stateList = this.getStateList();
        const citizenList = this.getCitizenList();
        const genderList = this.getGenderList();
        const raceList = this.getRaceList();
        const religionList = this.getReligionList();
        const martialStatusList = this.getMartialStatusList();
        const industryList = this.getIndustryList();
        const professionList = this.getProfessionList();
        const postCodeList = this.getPostCodeList();

        return forkJoin([
            titleSalutations,
            countryList,
            stateList,
            citizenList,
            genderList,
            raceList,
            religionList,
            martialStatusList,
            industryList,
            professionList,
            postCodeList,
        ]);
    }

    getPostCodeList() {
        return this.http.get(environment.apiUrl + environment.wealth + '/postcodes');
    }

    getRaceList() {
        return this.http.get(environment.apiUrl + environment.wealth + '/races');
    }

    getCitizenList() {
        return this.http.get(environment.apiUrl + environment.wealth + '/citizens');
    }

    getCountryList() {
        return this.http.get(environment.apiUrl + environment.wealth + '/countrys');
    }

    getGenderList() {
        return this.http.get(environment.apiUrl + environment.wealth + '/genders');
    }

    getIndustryList() {
        return this.http.get(environment.apiUrl + environment.wealth + '/employments');
    }

    getMartialStatusList() {
        return this.http.get(environment.apiUrl + environment.wealth + '/maritals');
    }

    getProfessionList() {
        return this.http.get(environment.apiUrl + environment.wealth + '/occupations');
    }

    getReligionList() {
        return this.http.get(environment.apiUrl + environment.wealth + '/religions');
    }

    getStateList() {
        return this.http.get(environment.apiUrl + environment.wealth + '/states');
    }

    getTitleSalutations() {
        return this.http.get(environment.apiUrl + environment.wealth + '/salutations');
    }
}
