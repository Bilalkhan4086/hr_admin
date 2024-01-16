import { sample } from 'lodash';
import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

export const users = [...Array(24)].map((_, index) => ({
  id: faker.string.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: faker.person.firstName(),
  company: faker.company.name(),
  role: sample([
    'Leader',
    'Hr Manager',
    'UI Designer',
    'UX Designer',
    'UI/UX Designer',
    'Project Manager',
    'Backend Developer',
    'Full Stack Designer',
    'Front End Developer',
    'Full Stack Developer',
  ]),
}));

export const Details = [
  {
    name: 'Ahmad Hashmi',
    fullName: 'admin99',
    email: 'admin99@gmail.com',
    img: '../../public/assets/images/avatars/avatar_1.jpg',
  },
  {
    name: 'Shamir Iqbal Shah',
    fullName: 'admin99',
    email: 'admin99@gmail.com',
    img: '../../public/assets/images/avatars/avatar_2.jpg',
  },
  {
    name: 'awais Akbar',
    fullName: 'admin99',
    email: 'admin99@gmail.com',
    img: '../../public/assets/images/avatars/avatar_3.jpg',
  },
  {
    name: 'akbar jamal',
    fullName: 'admin99',
    email: 'admin99@gmail.com',
    img: '../../public/assets/images/avatars/avatar_4.jpg',
  },

  {
    name: 'Muhammad Nouman',
    fullName: 'admin99',
    email: 'admin99@gmail.com',
    img: '../../public/assets/images/avatars/avatar_5.jpg',
  },
  {
    name: 'Nadeem Ikram',
    fullName: 'admin99',
    email: 'admin99@gmail.com',
    img: '../../public/assets/images/avatars/avatar_6.jpg',
  },
];
export const Profile = [
  '../../public/assets/images/avatars/avatar_1.jpg',
  '../../public/assets/images/avatars/avatar_2.jpg',
  '../../public/assets/images/avatars/avatar_3.jpg',
  '../../public/assets/images/avatars/avatar_4.jpg',
  '../../public/assets/images/avatars/avatar_5.jpg',
  '../../public/assets/images/avatars/avatar_6.jpg',
  '../../public/assets/images/avatars/avatar_7.jpg',
  '../../public/assets/images/avatars/avatar_8.jpg',
  '../../public/assets/images/avatars/avatar_9.jpg',
  '../../public/assets/images/avatars/avatar_10.jpg',
];
