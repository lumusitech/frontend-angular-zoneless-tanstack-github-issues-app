import { TestBed } from '@angular/core/testing';
import {
  provideAngularQuery,
  QueryClient,
} from '@tanstack/angular-query-experimental';
import { IssueService } from './issue.service';

describe('IssueService', () => {
  let service: IssueService;
  const queryClient = new QueryClient();

  beforeEach(() => {
    TestBed.configureTestingModule({
      // teardown is for avoid that the queryClient is destroyed after each test
      // without this, we will get an error like
      // RuntimeError: NG0205: Injector has already been destroyed.
      teardown: { destroyAfterEach: false },
      providers: [provideAngularQuery(queryClient)],
    });
    service = TestBed.inject(IssueService);
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
});
