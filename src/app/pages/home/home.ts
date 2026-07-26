import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface FeaturedCreature {
  archiveNumber: string;
  name: string;
  culture: string;
  fear: string;
  slug: string;
  image: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  readonly featuredCreatures: FeaturedCreature[] = [
    {
      archiveNumber: '004',
      name: 'Банши',
      culture: 'Кельтская традиция',
      fear: 'Неизбежность утраты',
      slug: 'banshee',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23',
    },
    {
      archiveNumber: '011',
      name: 'Юки-онна',
      culture: 'Японский фольклор',
      fear: 'Холод и одиночество',
      slug: 'yuki-onna',
      image: 'https://images.unsplash.com/photo-1511497584788-876760111969',
    },
    {
      archiveNumber: '019',
      name: 'Ла Йорона',
      culture: 'Латинская Америка',
      fear: 'Вина и потеря',
      slug: 'la-llorona',
      image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
    },
  ];

  readonly fearCategories = [
    {
      number: '01',
      name: 'Страх смерти',
      description:
        'Образы, предупреждающие о приближении смерти или возвращающиеся из мира мёртвых.',
    },
    {
      number: '02',
      name: 'Страх темноты',
      description:
        'Существа ночи, скрывающиеся за пределами человеческого зрения.',
    },
    {
      number: '03',
      name: 'Страх воды',
      description:
        'Духи рек, озёр и морей, воплощающие неизвестность глубины.',
    },
    {
      number: '04',
      name: 'Страх потери контроля',
      description:
        'Одержимость, превращение и разрушение привычной человеческой формы.',
    },
  ];
}