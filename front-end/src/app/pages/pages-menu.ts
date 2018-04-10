import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Anamneses', // menu title
    icon: 'nb-person',
    link: '/pages/anamnese', // menu icon
    home: true,
  },
  {
    title: 'Pacientes', // menu title
    icon: 'fa fa fa-book',
    link: '/pages/clientes', // menu icon
  },
  {
    title: 'Postagens', // menu title
    icon: 'nb-layout-centre',
    link: '/pages/222', // menu icon
  },
  {
    title: 'Consulta', // menu title
    icon: 'nb-compose',
    link: '/pages/1', // menu icon
  },

  {
    title: 'Configuração', // menu title
    icon: 'nb-gear',
    link: '/pages/3', // menu icon
  },
];
