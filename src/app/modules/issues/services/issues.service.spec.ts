import { TestBed } from '@angular/core/testing';
import {
  provideAngularQuery,
  QueryClient,
} from '@tanstack/angular-query-experimental';
import { State } from '../interfaces';
import { IssuesService } from './issues.service';

describe('IssueService', () => {
  let service: IssuesService;
  const queryClient = new QueryClient();

  beforeEach(() => {
    TestBed.configureTestingModule({
      // teardown is for avoid that the queryClient is destroyed after each test
      // without this, we will get an error like
      // RuntimeError: NG0205: Injector has already been destroyed.
      teardown: { destroyAfterEach: false },
      providers: [provideAngularQuery(queryClient)],
    });
    service = TestBed.inject(IssuesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load labels', async () => {
    // This ensures labels are reloaded, preventing undefined errors.
    const { data } = await service.labelsQuery.refetch();

    expect(data?.length).toBe(30);

    // it takes the first label of labels array
    const [label] = data!;

    expect(typeof label.color).toBe('string');
    expect(typeof label.default).toBe('boolean');
    expect(typeof label.description).toBe('string');
    expect(typeof label.id).toBe('number');
    expect(typeof label.name).toBe('string');
    expect(typeof label.node_id).toBe('string');
    expect(typeof label.url).toBe('string');
  });

  it('should set selected state - OPEN, CLOSED and ALL', async () => {
    service.showIssuesByState(State.Closed);
    expect(service.selectedState()).toBe(State.Closed);

    const { data: dataClosed } = await service.issuesQuery.refetch();

    dataClosed?.forEach((issue) => {
      expect(issue.state).toBe(State.Closed);
    });

    service.showIssuesByState(State.Open);
    const { data: dataOpen } = await service.issuesQuery.refetch();

    dataOpen?.forEach((issue) => {
      expect(issue.state).toBe(State.Open);
    });
  });

  it('should set selected labels', async () => {
    service.toggleLabel('Accessibility');
    expect(service.selectedLabels().has('Accessibility')).toBeTruthy();

    service.toggleLabel('Accessibility');
    expect(service.selectedLabels().has('Accessibility')).toBeFalsy();
  });

  it('should set selectedLabels and get issues by label', async () => {
    const label = 'Accessibility';
    service.toggleLabel(label);
    expect(service.selectedLabels().has(label)).toBeTruthy();

    const { data } = await service.issuesQuery.refetch();

    data?.forEach((issue) => {
      const hasLabel = issue.labels.some((l) => l.name === label);
      expect(hasLabel).toBeTruthy();
    });
  });
});
