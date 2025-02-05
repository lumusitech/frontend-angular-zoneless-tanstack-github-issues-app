# Tanstack Github Issues App

This Angular project is designed to practice using TanStack features within a GitHub issue application. It utilizes Tailwind CSS, ngx-markdown, and the experimental TanStack Query library for Angular.

For more info about TanStack, visit [TanStack query docs](https://tanstack.com/query/latest/docs/framework/angular/overview).

For more info about Tailwind, visit [Tailwindcss docs](https://tailwindcss.com/).

For more info about NGX Markdown, visit [Markdown docs](https://www.npmjs.com/package/ngx-markdown).

After clone, run:

1. Create environments:

   ```bash
   ng g environments
   ```

2. Add baseUrl and githubToken props to environment files:

   ```javascript
   export const environment = {
     baseUrl: "https://api.github.com/repos/angular/angular",
     githubToken: "your_github_token",
   };
   ```

3. Run project:

   ```bash
   ng s -o
   ```

## Build Details

1. Create project

   ```bash
   ng new [project name]
   ```

   - Choose CSS as the stylesheet format.
   - Disable SSR (Server-Side Rendering) as it's not required for this application.

2. Install and add the required app providers:

   ```bash
   pnpm add @tanstack/angular-query-experimental
   pnpm i ngx-markdown
   ```

   ```javascript
   export const appConfig: ApplicationConfig = {
     providers: [
       // provideZoneChangeDetection({ eventCoalescing: true }),
       provideRouter(routes),
       provideExperimentalZonelessChangeDetection(),
       provideAngularQuery(new QueryClient()),
       provideMarkdown(),
     ],
   };
   ```

## Info about folders structure

📁 **helpers:** This directory contains utility functions for reuse throughout the app.

📁 **modules:** SoC (Separation of Concerns). This project applies the Separation of Concerns principle by isolating the GitHub issues feature within its own module.

📁 **issues/actions:** This directory contains a collection of framework-agnostic functions designed to interact with external services or execute asynchronous calls to the GitHub API. These functions are independent of any specific framework, promoting code reusability.

📁 **issues/components:** This directory contains reusable components for the issues pages.

📁 **issues/interfaces:** This directory contains issues interfaces.

📁 **issues/pages:** This directory contains issues pages.

📁 **issues/services:** This directory contains services that utilize TanStack Query to manage HTTP requests related to issues, including caching. These services reuse functions defined in issues/actions for query functions, promoting code reusability.

## Testing

While TanStack lacks specific Angular testing documentation, we follow Fernando Herrera's recommendations.

Testing Angular services that interact with TanStack Query requires the injection of a QueryClient instance. To simplify the initial setup of the testing environment, the use of the VS Code snippet for services is recommended.

```javascript
import { TestBed } from "@angular/core/testing";
import { provideAngularQuery, QueryClient } from "@tanstack/angular-query-experimental";
import { IssueService } from "./issue.service";

describe("IssueService", () => {
  let service: IssueService;
  const queryClient = new QueryClient();

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Teardown prevents the QueryClient from being destroyed after each test,
      // avoiding the "Injector has already been destroyed" error (NG0205).
      teardown: { destroyAfterEach: false },
      providers: [provideAngularQuery(queryClient)],
    });
    service = TestBed.inject(IssueService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
```
