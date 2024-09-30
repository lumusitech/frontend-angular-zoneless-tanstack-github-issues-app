import { NgStyle } from '@angular/common';
import { Component, input } from '@angular/core';
import { GithubLabel } from '../../interfaces';

@Component({
  selector: 'issues-labels-selector',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './labels-selector.component.html',
})
export class LabelsSelectorComponent {
  labels = input.required<GithubLabel[]>();
}
