import path from '@news/constants/path';
import { MelySidebarMenu } from '@news/types';

const sidebarConfig: MelySidebarMenu[] = [
  {
    title: 'sidebar.dashboard',
    path: path.root,
  },
  {
    title: 'sidebar.product',
    path: path.products,
    children: [
      {
        title: 'sidebar.product',
        path: path.products,
      },
      {
        title: 'sidebar.package',
        path: path.productPackages,
      },
    ],
  },
  {
    title: 'sidebar.course',
    path: path.courses,
  },
  {
    title: 'sidebar.teacher',
    path: path.teachers,
  },
  {
    title: 'sidebar.student',
    path: path.students,
  },
  {
    title: 'sidebar.class',
    path: path.classes,
  },
  {
    title: 'sidebar.timetable',
    path: path.timetable,
  },
];

export default sidebarConfig;
