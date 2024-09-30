import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'issues-list-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './issues-list-page.component.html',
})
export default class IssuesListPageComponent {}
