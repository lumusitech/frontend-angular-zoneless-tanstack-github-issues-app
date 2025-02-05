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
});
