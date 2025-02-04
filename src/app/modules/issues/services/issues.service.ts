import { Injectable, signal } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { getIssues, getLabels } from '../actions';
import { State } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class IssuesService {
  selectedState = signal<State>(State.All);
  selectedLabels = signal(new Set<string>());

  labelsQuery = injectQuery(() => ({
    queryKey: ['labels'],
    queryFn: () => getLabels(),
  }));

  issuesQuery = injectQuery(() => ({
    queryKey: [
      'issues',
      {
        state: this.selectedState(),
        selectedLabels: [...this.selectedLabels()],
      },
    ],
    queryFn: () => getIssues(this.selectedState(), [...this.selectedLabels()]),
  }));

  showIssuesByState(state: State) {
    this.selectedState.set(state);
  }

  toggleLabel(label: string) {
    const labels = this.selectedLabels();

    if (labels.has(label)) {
      labels.delete(label);
    } else {
      labels.add(label);
    }

    // putting this.selectedLabels.set(new Set(labels)), in place of this.selectedLabels.set(labels)
    // We broke the reference to the old Set and we send a new Set with new values
    this.selectedLabels.set(new Set(labels));
  }
}
