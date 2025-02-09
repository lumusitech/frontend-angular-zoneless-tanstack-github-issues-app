import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, tap } from 'rxjs';
import { IssueCommentComponent } from '../../components/issue-comment/issue-comment.component';
import { IssueService } from '../../services/issue.service';

@Component({
  selector: 'issue-page',
  standalone: true,
  imports: [RouterLink, IssueCommentComponent],
  templateUrl: './issue-page.component.html',
})
export default class IssuePageComponent {
  route = inject(ActivatedRoute);
  issueService = inject(IssueService);

  issueNumber = toSignal<string>(
    this.route.paramMap.pipe(
      map((param) => param.get('number') ?? ''),
      tap((number) => this.issueService.setIssueNumber(number))
    )
  );

  public issueQuery = this.issueService.issueQuery;
  public issueCommentsQuery = this.issueService.issueCommentsQuery;
}
