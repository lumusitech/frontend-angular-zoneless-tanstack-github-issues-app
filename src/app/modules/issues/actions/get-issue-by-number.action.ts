import { sleep } from '@helpers/sleep';
import { environment } from 'src/environments/environment.development';
import { GithubIssue } from '../interfaces';

const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.githubToken;

export const getIssueByNumber = async (
  issueNumber: string
): Promise<GithubIssue> => {
  console.log('Get issue by number called');

  await sleep(1500);

  try {
    const resp = await fetch(`${BASE_URL}/issues/${issueNumber}`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });

    if (!resp.ok) throw new Error("Can't load issue");

    const issue: GithubIssue = await resp.json();
    console.log({ issue });

    return issue;
  } catch (error) {
    throw `Can't load issue ${issueNumber}`;
  }
};
