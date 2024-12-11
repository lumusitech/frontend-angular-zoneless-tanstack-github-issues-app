import { Component, input } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { GithubIssue } from '../../interfaces';

@Component({
  selector: 'issue-comment',
  standalone: true,
  imports: [MarkdownModule],
  templateUrl: './issue-comment.component.html',
  styles: ``,
})
export class IssueCommentComponent {
  issue = input.required<GithubIssue>();
}
