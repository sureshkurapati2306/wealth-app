import { noop } from 'lodash';

export const traceEventData = (occurenceName, getSleuthData: any = window) => { 
  return getSleuthData._satellite ? getSleuthData._satellite.track(occurenceName) : noop;
};

export const setOccuranceAndAnalyticsData = (  
  occurenceObject: { wealthOccurence?: string; },
  digitalData?: { wealthAnalyticsData?: any; }
) => {  
    if (digitalData && digitalData.wealthAnalyticsData) {   
      window.digitalData = {
        ...window.digitalData,
        ...digitalData.wealthAnalyticsData        
      }    
      if (occurenceObject.wealthOccurence) {        
        traceEventData(occurenceObject.wealthOccurence);        
      }  
  }  
};

export class WealthAnalyticsUtil{}