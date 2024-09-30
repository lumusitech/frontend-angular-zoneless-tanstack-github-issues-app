import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LabelsSelectorComponent } from '../../components/labels-selector/labels-selector.component';
import { IssuesService } from '../../services/issues.service';

@Component({
  selector: 'issues-list-page',
  standalone: true,
  imports: [RouterLink, JsonPipe, LabelsSelectorComponent],
  templateUrl: './issues-list-page.component.html',
})
export default class IssuesListPageComponent {
  public issuesService = inject(IssuesService);

  get labelsQuery() {
    return this.issuesService.labelsQuery;
  }
}
