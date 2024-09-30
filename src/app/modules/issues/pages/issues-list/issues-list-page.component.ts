import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IssuesService } from '../../services/issues.service';

@Component({
  selector: 'issues-list-page',
  standalone: true,
  imports: [RouterLink, JsonPipe],
  templateUrl: './issues-list-page.component.html',
})
export default class IssuesListPageComponent {
  public issuesService = inject(IssuesService);

  get labelsQuery() {
    return this.issuesService.labelsQuery;
  }
}
