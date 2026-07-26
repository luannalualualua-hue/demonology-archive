import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface ProjectPrinciple {
  number: string;
  title: string;
  description: string;
}

interface AudienceItem {
  title: string;
  description: string;
}

interface ProjectStage {
  number: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  readonly principles: ProjectPrinciple[] = [
    {
      number: '01',
      title: 'Культурный контекст',
      description:
        'Каждый образ рассматривается внутри конкретной традиции, региона и исторической среды.',
    },
    {
      number: '02',
      title: 'Образ страха',
      description:
        'Существа классифицируются не только по происхождению, но и по страху, который они воплощают.',
    },
    {
      number: '03',
      title: 'Визуальная система',
      description:
        'Особое внимание уделяется повторяющимся чертам: силуэту, деформации, цвету, среде и поведению.',
    },
    {
      number: '04',
      title: 'Творческое применение',
      description:
        'Материалы адаптированы для сценаристов, художников и гейм-дизайнеров.',
    },
  ];

  readonly audience: AudienceItem[] = [
    {
      title: 'Гейм-дизайнеры',
      description:
        'Для создания существ, игровых механик, локаций и правил поведения противников.',
    },
    {
      title: 'Сценаристы',
      description:
        'Для разработки конфликтов, образов, сюжетных мотивов и сверхъестественных правил.',
    },
    {
      title: 'Художники',
      description:
        'Для поиска визуальных форм, исторических мотивов и культурных деталей.',
    },
    {
      title: 'Исследователи',
      description:
        'Для сравнительного анализа мифологии, фольклора и визуальной культуры.',
    },
  ];

  readonly stages: ProjectStage[] = [
    {
      number: '01',
      title: 'Сбор материалов',
      description:
        'Поиск энциклопедических, музейных, фольклорных и исследовательских источников.',
    },
    {
      number: '02',
      title: 'Классификация',
      description:
        'Распределение образов по культуре, типу, среде и символическому страху.',
    },
    {
      number: '03',
      title: 'Визуальный анализ',
      description:
        'Выявление повторяющихся форм, цветов, силуэтов и способов изображения.',
    },
    {
      number: '04',
      title: 'Адаптация',
      description:
        'Перевод исследовательского материала в формат, удобный для творческих задач.',
    },
  ];
}