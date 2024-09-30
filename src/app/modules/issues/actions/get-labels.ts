import { sleep } from '@helpers/sleep';
import { GithubLabel } from '../interfaces/github-label.interface';

export const getLabels = async (): Promise<GithubLabel[]> => {
  await sleep(1500);

  try {
    const resp = await fetch('https://api.github.com/angular/angular/labels');

    if (!resp.ok) throw new Error("Can't load labels");

    const labels: GithubLabel[] = await resp.json();
    return labels;
  } catch (error) {
    throw new Error("Can't load labels");
  }
};