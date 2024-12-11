import { sleep } from '@helpers/sleep';
import { environment } from 'src/environments/environment.development';
import { GithubIssue } from '../interfaces';

const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.githubToken;

export const getIssueCommentsByNumber = async (
  issueNumber: string
): Promise<GithubIssue[]> => {
  await sleep(1500);

  try {
    const resp = await fetch(`${BASE_URL}/issues/${issueNumber}/comments`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });

    if (!resp.ok) throw new Error("Can't load issue comments");

    const issueComments: GithubIssue[] = await resp.json();

    return issueComments;
  } catch (error) {
    throw new Error("Can't load issue comments");
  }
};
