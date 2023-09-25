import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByStatus'
})
export class FilterByStatusPipe implements PipeTransform {

  transform(fund, option: string, esg: string): string {
    if(option === "I" && esg !== "Y") {
      return fund.filter(item => {
        return item.fund_indicator === option
      });
     
    } else if(esg === "Y" && option !== "I") {
      return fund.filter(item => {
        return item.esg_fund === esg
      });
    
    } else if(option === "I" && esg === "Y") {
      return fund.filter(item => {
        return item.esg_fund === esg && item.fund_indicator === option
      });
     
    }
     else {
      return fund;
    }
  }

}
