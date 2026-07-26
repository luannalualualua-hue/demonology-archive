import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Демонология — образы страха в культурах мира',
    loadComponent: () =>
      import('./pages/home/home').then((component) => component.Home),
  },
  {
    path: 'encyclopedia',
    title: 'Энциклопедия | Демонология',
    loadComponent: () =>
      import('./pages/encyclopedia/encyclopedia').then(
        (component) => component.Encyclopedia,
      ),
  },
  {
    path: 'encyclopedia/:slug',
    title: 'Существо | Демонология',
    loadComponent: () =>
      import('./pages/creature-details/creature-details').then(
        (component) => component.CreatureDetails,
      ),
  },
  {
    path: 'gallery',
    title: 'Галерея | Демонология',
    loadComponent: () =>
      import('./pages/gallery/gallery').then(
        (component) => component.Gallery,
      ),
  },
  {
    path: 'glossary',
    title: 'Словарь | Демонология',
    loadComponent: () =>
      import('./pages/glossary/glossary').then(
        (component) => component.Glossary,
      ),
  },
  {
    path: 'blog',
    title: 'Исследования | Демонология',
    loadComponent: () =>
      import('./pages/blog/blog').then((component) => component.Blog),
  },
  {
    path: 'blog/:slug',
    title: 'Статья | Демонология',
    loadComponent: () =>
      import('./pages/article-details/article-details').then(
        (component) => component.ArticleDetails,
      ),
  },
  {
    path: 'about',
    title: 'О проекте | Демонология',
    loadComponent: () =>
      import('./pages/about/about').then((component) => component.About),
  },
  {
  path: '**',
  title: 'Страница не найдена | Демонология',
  loadComponent: () =>
    import('./pages/not-found/not-found').then(
      (component) => component.NotFound,
    ),
},
];