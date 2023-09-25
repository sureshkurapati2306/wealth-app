import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { BreadcrumbsPath } from '../../core/models/breadcrumbs-path.model';

@Component({
  selector: 'cimb-office-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbsComponent {

  @Input() paths: BreadcrumbsPath[] = [];

}
