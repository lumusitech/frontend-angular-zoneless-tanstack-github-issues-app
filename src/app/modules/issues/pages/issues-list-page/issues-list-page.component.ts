import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'issues-list-page',
  standalone: true,
  imports: [],
  templateUrl: './issues-list-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IssuesListPageComponent {}
