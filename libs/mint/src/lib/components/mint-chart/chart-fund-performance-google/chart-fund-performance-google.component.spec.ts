import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, SimpleChange } from '@angular/core';
import { ChartFundPerformanceGoogleComponent } from './chart-fund-performance-google.component';
import { constant } from 'lodash-es';


const mockData:any = {
  past1Mnth:{
    "thirtyDaysNavPriceHistory": [
      [
        "Jul 19",
        1.8418
      ],
      [
        "Jul 20",
        1.8627
      ],
      [
        "Jul 21",
        1.8681
      ],
      [
        "Jul 22",
        1.8672
      ],
      [
        "Jul 25",
        1.866
      ]
    ]
  },
  past3Mnth:{
    "ninetyDaysNavPriceHistory": [
      [
        "May 20",
        1.9213
      ],
      [
        "May 23",
        1.9193
      ],
      [
        "May 24",
        1.9043
      ],
      [
        "May 25",
        1.8988
      ],
      [
        "May 26",
        1.8946
      ],
      [
        "May 27",
        1.9048
      ],
      [
        "May 30",
        1.9298
      ]
    ]
  }
}
const mockZeroData :any = {
  past1Mnth:{
    "thirtyDaysNavPriceHistory": [
      [
        "Jul 19",
        0
      ],
      [
        "Jul 20",
        0
      ],
      [
        "Jul 21",
        0
      ],
      [
        "Jul 22",
        0
      ],
      [
        "Jul 25",
        0
      ]
    ]
  },
  past3Mnth:{
    "ninetyDaysNavPriceHistory": [
      [
        "May 20",
        0
      ],
      [
        "May 23",
        0
      ],
      [
        "May 24",
        0
      ],
      [
        "May 25",
        0
      ],
      [
        "May 26",
        0
      ],
      [
        "May 27",
        0
      ],
      [
        "May 30",
        0
      ]
    ]
  }
}

describe('ChartFundPerformanceGoogleComponent', () => {
  let component: ChartFundPerformanceGoogleComponent;
  let fixture: ComponentFixture<ChartFundPerformanceGoogleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartFundPerformanceGoogleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartFundPerformanceGoogleComponent);
    component = fixture.componentInstance;
    component.past1Mnth = mockData.past1Mnth;
    component.past3Mnth = mockData.past3Mnth;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('ChartFundPerformanceGoogleComponent ngOnInit -  Called', () => {
    expect(component.ngOnInit()).toBeUndefined();
  });
  it('should ngOnChanges with non-zero data', () => {

    component.ngOnChanges({
      holdingData: new SimpleChange(undefined, mockData, true),
    });

    expect(component).toBeTruthy();
  });
  it('should ngOnChanges with zero data', () => {

    component.ngOnChanges({
      holdingData: new SimpleChange(mockData, mockZeroData, true),
    });

    expect(component).toBeTruthy();
  });

  it('should ngOnChanges undefined data', () => {

    component.ngOnChanges({
      holdingData: undefined
    });

    expect(component).toBeTruthy();
  });

  it('toogleData 1month',() => {
    
    expect(component.toogleData(component.past1Mnth)).toHaveBeenCalled();
  });
  it('toogleData 3month',() => {
    
    expect(component.toogleData(component.past3Mnth)).toHaveBeenCalled();
  });

  it('showChart to have been called',() =>{

    expect(component.showChart(true)).toBeTruthy();
  })

});
