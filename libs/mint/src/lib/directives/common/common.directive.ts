declare global {
    interface Window {          
      _satellite: any;
      digitalData: any;        
    }
  }
  
import {
    Directive    
  } from '@angular/core';
  
  @Directive({
    selector: '[cimbCommonDirective]'    
  })
  export class CommonDirective {
         
  }