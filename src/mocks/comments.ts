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
    id: 'fd693434-a41a-4711-8674-b0dc885a9edb',
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
    id: 'fd693434-a41a-4711-8674-b0dc885a9edb',
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
    id: '3f51d7e6-4454-4c2f-aaba-79c01d450979',
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
    id: '5604b95d-92d7-4b6f-a2ca-5ccb5483b9b9',
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
