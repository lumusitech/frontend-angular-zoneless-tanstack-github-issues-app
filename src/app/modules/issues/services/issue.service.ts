import { Injectable, signal } from '@angular/core';
import {
  injectQuery,
  injectQueryClient,
} from '@tanstack/angular-query-experimental';
import {
  getIssueByNumber,
  getIssueCommentsByNumber,
  getLabels,
} from '../actions';
import { GithubIssue } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class IssueService {
  private readonly issueNumber = signal<string | null>(null);
  private readonly queryClient = injectQueryClient();

  labelsQuery = injectQuery(() => ({
    queryKey: ['labels'],
    queryFn: () => getLabels(),
  }));

  issueQuery = injectQuery(() => ({
    queryKey: ['issue', this.issueNumber()],
    queryFn: () => getIssueByNumber(this.issueNumber()!),
    enabled: !!this.issueNumber(),
    staleTime: 1000 * 60 * 5,
  }));

  issueCommentsQuery = injectQuery(() => ({
    queryKey: ['issue', this.issueNumber(), 'comments'],
    queryFn: () => getIssueCommentsByNumber(this.issueNumber()!),
    enabled: !!this.issueNumber(),
  }));

  setIssueNumber(issueId: string) {
    this.issueNumber.set(issueId);
  }

  prefetchIssue(issueId: string) {
    this.queryClient.prefetchQuery({
      queryKey: ['issue', issueId],
      queryFn: () => getIssueByNumber(issueId),
      staleTime: 1000 * 60 * 5,
    });
  }

  setIssueData(issue: GithubIssue) {
    this.queryClient.setQueryData(['issue', issue.number.toString()], issue, {
      updatedAt: Date.now() + 1000 * 60,
    }); // One minute
  }
}
