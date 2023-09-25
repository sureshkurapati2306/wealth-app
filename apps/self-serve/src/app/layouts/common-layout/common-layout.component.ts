import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'cimb-common-layout',
  templateUrl: './common-layout.component.html',
  styleUrls: ['./common-layout.component.scss']
})
export class CommonLayoutComponent  {
  headerLogoUrl = environment.apiUrl + environment.wealth + '/image/category/1';

}
