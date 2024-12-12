import { NgStyle } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GithubIssue, State } from '../../interfaces';
import { IssueService } from '../../services/issue.service';

@Component({
  selector: 'issue-item',
  standalone: true,
  imports: [RouterLink, NgStyle],
  templateUrl: './issue-item.component.html',
  styles: ``,
})
export class IssueItemComponent {
  issue = input.required<GithubIssue>();
  issueService = inject(IssueService);

  get isOpen() {
    return this.issue().state === State.Open;
  }

  prefetchData() {
    this.issueService.prefetchIssue(this.issue().number.toString());
  }
}
