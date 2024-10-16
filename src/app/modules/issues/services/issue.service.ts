import { Injectable, signal } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { getIssueByNumber } from '../actions';

@Injectable({
  providedIn: 'root',
})
export class IssueService {
  issueNumber = signal<string | null>(null);

  issueQuery = injectQuery(() => ({
    queryKey: ['issue', this.issueNumber()],
    queryFn: () => getIssueByNumber(this.issueNumber()!),
    enabled: !!this.issueNumber(),
  }));

  setIssueNumber(issueId: string) {
    this.issueNumber.set(issueId);
  }
}
