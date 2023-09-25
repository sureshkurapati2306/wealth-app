import { Component, Input, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'cimb-chart-holdings',
  templateUrl: './chart-holdings.component.html',
  styleUrls: ['./chart-holdings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartHoldingsComponent implements OnChanges {

  data;
  type = 'PieChart';
  columnNames = [];
  options = {};
  finalDonutColor;

  @Input() donutColor;
  @Input() width;
  @Input() height;
  @Input() pieHole;
  @Input() holdingData;
  @Input() refreshSignal;   //to force chart redraw when switching between Assets & Liabilities tabs

  ngOnChanges(changes: SimpleChanges) {

    const myHoldingArray = [];
    
    if (changes.holdingData !== undefined) {

      let zeroValueChecker = true;
      
      const holdingData = changes.holdingData.currentValue[0].element;
      for (let j = 0; j < holdingData.length; j++) {
        const item = holdingData[j].name;
        const value = holdingData[j].value;
        myHoldingArray.push([item, value]);

        if(value > 0) {
          //at least one data is not zero/empty value
          zeroValueChecker = false;
        }
      }

      if(!zeroValueChecker) {
        //data is not empty
  
        this.data = myHoldingArray;
        this.finalDonutColor = this.donutColor;
  
      } else {
        //data are empty or contains only zero values, push dummy data into the chart with gray background color and no labels to simulate an empty chart
  
        this.data = [
          ['None', 100]
        ];
        this.finalDonutColor = ['#D5D6D7'];
  
      }

    }

    this.options = {
      width: this.width,
      height: this.height,
      chartArea: { width: '100%', height: '100%' },
      tooltip: {
        trigger: 'none'
      },
      pieHole:this.pieHole,
      legend: 'none',
      colors: this.finalDonutColor,
      pieSliceText: 'none',
      pieSliceBorderColor: "white",
      backgroundColor: 'transparent',
      enableInteractivity: false,
    };

  }
}
