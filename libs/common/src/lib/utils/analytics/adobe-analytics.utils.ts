import { noop } from 'lodash';

export const trackEvent = (eventName, getTracker: any = window) => { 
  return getTracker._satellite ? getTracker._satellite.track(eventName) : noop;
};

export const setEventAndDigitalData = (  
  eventObject: { wealthEvent?: string; },
  digitalData?: { wealthDigitalData?: any; }
) => {  
    if (digitalData && digitalData.wealthDigitalData) {   
      window.digitalData = {
        ...window.digitalData,
        ...digitalData.wealthDigitalData        
      }    
      if (eventObject.wealthEvent) {        
        trackEvent(eventObject.wealthEvent);        
      }  
  }  
};

export class AnalyticsUtil{}