import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'cimb-office-scheduled-downtime-table',
  templateUrl: './scheduled-downtime-table.component.html',
  styleUrls: ['./scheduled-downtime-table.component.scss']
})
export class ScheduledDowntimeTableComponent {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  displayedColumns: string[] = ['no','startDateTime', 'endDateTime', 'status', 'action'];

  goToPage() {
    this.router.navigate(['add'], {relativeTo: this.route});
  }
}
