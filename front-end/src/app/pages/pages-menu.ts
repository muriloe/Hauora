import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Pacientes', // menu title
    icon: 'fa fa fa-book',
    link: '/pages/clientes', // menu icon
  },
  {
    title: 'Consultas Pendentes', // menu title
    icon: 'fa fa-users',
    link: '/pages/anamnese', // menu icon
    home: true,
  },
  {
    title: 'Consulta', // menu title
    icon: 'nb-compose',
    link: '/pages/consulta', // menu icon
  },
  {
    title: 'Postagens', // menu title
    icon: 'nb-layout-centre',
    link: '/pages/postagens', // menu icon
  },
  {
    title: 'Perfis', // menu title
    icon: 'nb-person',
    link: '/pages/perfil', // menu icon
  },
  {
    title: 'Configuração', // menu title
    icon: 'nb-gear',
    link: '/pages/3', // menu iconnb-person
  },
];
