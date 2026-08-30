import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

interface FeaturedCreature {
  archiveNumber: string;
  name: string;
  culture: string;
  fear: string;
  slug: string;
  image: string;
}

interface AtlasRegion {
  id: string;
  number: string;
  label: string;
  culture: string;
  description: string;
  image: string;
  positionClass: string;
  creatures: Array<{
    name: string;
    slug: string;
    image: string;
  }>;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  readonly activeAtlasRegion = signal('slavic');

  readonly featuredCreatures: FeaturedCreature[] = [
    {
      archiveNumber: '004',
      name: 'Банши',
      culture: 'Кельтская традиция',
      fear: 'Неизбежность утраты',
      slug: 'banshee',
      image: 'assets/creatures/banshee-main.jpg',
    },
    {
      archiveNumber: '011',
      name: 'Юки-онна',
      culture: 'Японский фольклор',
      fear: 'Холод и одиночество',
      slug: 'yuki-onna',
      image: 'assets/creatures/yuki-onna-main.png',
    },
    {
      archiveNumber: '019',
      name: 'Ла Йорона',
      culture: 'Латинская Америка',
      fear: 'Вина и потеря',
      slug: 'la-llorona',
      image: 'assets/creatures/la-llorona-main.jpg',
    },
  ];

  readonly atlasRegions: AtlasRegion[] = [
    {
      id: 'slavic',
      number: '01',
      label: 'Славянский мир',
      culture: 'Славянская традиция',
      description: 'Лесные границы, домашние запреты и возвращение мёртвых.',
      image: 'assets/editorial/forest-remember.webp',
      positionClass: 'atlas-node--slavic',
      creatures: [
        { name: 'Баба-яга', slug: 'baba-yaga', image: 'assets/creatures/baba-yaga-main.jpg' },
        { name: 'Леший', slug: 'leshy', image: 'assets/creatures/leshy-main.jpg' },
        { name: 'Упырь', slug: 'upyr', image: 'assets/creatures/upyr-main.png' },
      ],
    },
    {
      id: 'japan',
      number: '02',
      label: 'Япония',
      culture: 'Японский фольклор',
      description: 'Духи зимы, воды и превращения знакомой формы.',
      image: 'assets/creatures/yuki-onna-main.png',
      positionClass: 'atlas-node--japan',
      creatures: [
        { name: 'Юки-онна', slug: 'yuki-onna', image: 'assets/creatures/yuki-onna-main.png' },
        { name: 'Они', slug: 'oni', image: 'assets/creatures/oni-main.png' },
        { name: 'Тэнгу', slug: 'tengu', image: 'assets/creatures/tengu-main.png' },
      ],
    },
    {
      id: 'celtic',
      number: '03',
      label: 'Кельтские земли',
      culture: 'Кельтская традиция',
      description: 'Предвестники смерти, всадники и зыбкие границы мира.',
      image: 'assets/editorial/archive-guide.webp',
      positionClass: 'atlas-node--celtic',
      creatures: [
        { name: 'Банши', slug: 'banshee', image: 'assets/creatures/banshee-main.jpg' },
        { name: 'Дуллахан', slug: 'dullahan', image: 'assets/creatures/dullahan-main.png' },
        { name: 'Пука', slug: 'puca', image: 'assets/creatures/puca-main.png' },
      ],
    },
    {
      id: 'north',
      number: '04',
      label: 'Север Европы',
      culture: 'Скандинавская традиция',
      description: 'Холод, море, древние мертвецы и непримиримая природа.',
      image: 'assets/editorial/about-mountains.webp',
      positionClass: 'atlas-node--north',
      creatures: [
        { name: 'Драугр', slug: 'draugr', image: 'assets/creatures/draugr-main.png' },
        { name: 'Мара', slug: 'mara', image: 'assets/creatures/mara-main.png' },
        { name: 'Нёкк', slug: 'nokk', image: 'assets/creatures/nokk-main.png' },
      ],
    },
    {
      id: 'arabic',
      number: '05',
      label: 'Ближний Восток',
      culture: 'Арабская и исламская традиция',
      description: 'Огонь, пустыня, запретное знание и сверхъестественная воля.',
      image: 'assets/creatures/ifrit-main.png',
      positionClass: 'atlas-node--arabic',
      creatures: [
        { name: 'Джинн', slug: 'djinn', image: 'assets/creatures/djinn-main.png' },
        { name: 'Ифрит', slug: 'ifrit', image: 'assets/creatures/ifrit-main.png' },
        { name: 'Гуль', slug: 'ghoul', image: 'assets/creatures/ghoul-main.png' },
      ],
    },
    {
      id: 'latin',
      number: '06',
      label: 'Латинская Америка',
      culture: 'Латиноамериканская традиция',
      description: 'Плач, вина, ночные дороги и память о нарушенном порядке.',
      image: 'assets/creatures/la-llorona-main.jpg',
      positionClass: 'atlas-node--latin',
      creatures: [
        { name: 'Ла Йорона', slug: 'la-llorona', image: 'assets/creatures/la-llorona-main.jpg' },
        { name: 'Эль Сильбон', slug: 'el-silbon', image: 'assets/creatures/el-silbon-main.png' },
        { name: 'Пиштако', slug: 'pishtaco', image: 'assets/creatures/pishtako-main.png' },
      ],
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

  setAtlasRegion(regionId: string): void {
    this.activeAtlasRegion.set(regionId);
  }

  isAtlasRegionActive(regionId: string): boolean {
    return this.activeAtlasRegion() === regionId;
  }
}
