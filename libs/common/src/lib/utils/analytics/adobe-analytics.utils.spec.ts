import * as Utils from './adobe-analytics.utils';
import {noop} from 'lodash';

describe('Testing analytics tracking function', () => {
  let mockGetTracker, mockGetTrackerWithoutTrackEvent;
  beforeEach(() => {
    mockGetTracker = {
      _satellite: {
        track: (e) => {
          return e;
        }
      }
    };
    mockGetTrackerWithoutTrackEvent = {};
  });
  it('call the tracking function if _satellite key exists', () => {
    expect(Utils.trackEvent('eventName', mockGetTracker)).toEqual('eventName');
  });
  it('not to call the tracking function if _satellite key doesnt exists', () => {
    expect(Utils.trackEvent('eventName', mockGetTrackerWithoutTrackEvent)).toEqual(noop);
  });
});

describe('setEventAndDigitalData', () => {
  beforeEach(() => {
    window._satellite = {
      track: () => undefined
    };
  });
  it('should set correct values in digital data layer for casa', () => {
    spyOn(window._satellite, 'track');
    Utils.setEventAndDigitalData(      
      {      
        wealthEvent: 'Test wealth event'
      },
      {
        wealthDigitalData: {
                page: {
                    category: {
                    primaryCategory: 'Wealth Dashboard Module',
                    subCategory1:'Assets',
                    pageType: 'Dashboard Summary'
                    },
                    pageInfo: {
                    pageName:'Wealth: My Wealth Dashboard',
                    day: 'FRIDAY'              
                    }
                },
                user: {
                    loginStatus:'logged-in',
                    memberLoginType:'repeat',
                    customerType:'ETB'            
                }   
           }               
      }
    );
    expect(window.digitalData.page.pagename).toEqual('Wealth: My Wealth Dashboard');
    expect(window._satellite.track).toHaveBeenCalledWith('Test wealth event');
  });
});
