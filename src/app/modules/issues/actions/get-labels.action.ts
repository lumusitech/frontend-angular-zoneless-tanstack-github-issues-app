import { sleep } from '@helpers/sleep';
import { environment } from 'src/environments/environment.development';
import { GithubLabel } from '../interfaces/github-label.interface';

const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.githubToken;

export const getLabels = async (): Promise<GithubLabel[]> => {
  await sleep(1500);

  try {
    const resp = await fetch(`${BASE_URL}/labels`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });

    if (!resp.ok) throw new Error("Can't load labels");

    const labels: GithubLabel[] = await resp.json();
    return labels;
  } catch (error) {
    throw new Error("Can't load labels");
  }
};