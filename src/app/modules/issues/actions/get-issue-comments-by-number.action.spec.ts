import { environment } from 'src/environments/environment.development';
import { getIssueCommentsByNumber } from './get-issue-comments-by-number.action';

const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.githubToken;
const issueNumber = '123';
const mockComments: any[] = [
  {
    id: 1,
    body: 'Comment 1',
    user: {
      login: 'user1',
    },
  },
  {
    id: 2,
    body: 'Comment 2',
    user: {
      login: 'user2',
    },
  },
];

describe('getIssueCommentsByNumber action', () => {
  it('should fetch issue comments successfully', async () => {
    const requestURL = `${BASE_URL}/issues/${issueNumber}/comments`;
    const issueResponse = new Response(JSON.stringify(mockComments), {
      status: 200,
      statusText: 'OK',
    });
    spyOn(window, 'fetch').and.resolveTo(issueResponse);

    const comments = await getIssueCommentsByNumber(issueNumber);

    console.log({ comments });

    expect(window.fetch).toHaveBeenCalledWith(requestURL, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });
  });

  it('should throw an error if the response is not ok', async () => {
    const issueCommentsResponse = new Response(null, {
      status: 404,
      statusText: 'Not Found',
    });
    spyOn(window, 'fetch').and.resolveTo(issueCommentsResponse);

    try {
      const comments = await getIssueCommentsByNumber(issueNumber); // should fails
      expect(true).toBeFalse(); // to ensure test fails
    } catch (error) {
      console.error(error);
      expect(error).toBe(`Can't load issue comments`);
    }
  });
});
