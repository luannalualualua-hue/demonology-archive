import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Creature } from '../../../core/models/creature.model';

@Component({
  selector: 'app-creature-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './creature-card.html',
  styleUrl: './creature-card.scss',
})
export class CreatureCard {
  readonly creature = input.required<Creature>();
}