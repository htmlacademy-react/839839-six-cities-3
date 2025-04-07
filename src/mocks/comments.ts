import { CommentsType } from '../types/comments';

const AVATAR_URL = 'https://i.pravatar.cc/1';

export const comments: CommentsType = [
  {
    id: 'b67ddfd5-b953-4a30-8c8d-bd083cd6b62a',
    date: '2019-05-08T14:13:56.569Z',
    user: {
      name: 'Oliver Conner',
      avatarUrl: `${AVATAR_URL}?rnd=${Math.random()}`,
      isPro: false
    },
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    rating: 4
  },
  {
    id: 'a12bc34d-5678-90ef-ghij-klmnopqrstuv',
    date: '2024-03-10T18:45:22.456Z',
    user: {
      name: 'Emma Watson',
      avatarUrl: `${AVATAR_URL}?rnd=${Math.random()}`,
      isPro: true,
    },
    comment: 'Great location with amazing views! The host was very welcoming and helpful.',
    rating: 5,
  },
  {
    id: 'c56de78f-9012-3456-7890-abcdef123456',
    date: '2024-02-28T08:12:33.789Z',
    user: {
      name: 'John Smith',
      avatarUrl: `${AVATAR_URL}?rnd=${Math.random()}`,
      isPro: false,
    },
    comment: 'The apartment was clean and comfortable, but the WiFi was a bit slow.',
    rating: 3,
  },
  {
    id: 'd23ef45g-6789-0123-hijk-lmnopqrstuvw',
    date: '2024-02-15T14:22:11.321Z',
    user: {
      name: 'Sophia Johnson',
      avatarUrl: `${AVATAR_URL}?rnd=${Math.random()}`,
      isPro: true,
    },
    comment: 'Perfect stay! Everything was exactly as described. Will definitely come back.',
    rating: 5,
  },
  {
    id: 'e34fg56h-7890-1234-ijkl-mnopqrstuvwx',
    date: '2024-01-30T20:05:17.654Z',
    user: {
      name: 'Michael Brown',
      avatarUrl: `${AVATAR_URL}?rnd=${Math.random()}`,
      isPro: false,
    },
    comment: 'Nice place, but the neighborhood was a bit noisy at night.',
    rating: 3,
  },
];
