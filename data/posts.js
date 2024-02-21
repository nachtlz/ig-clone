import { USERS } from "./users";

export const POSTS = [
  {
    imageUrl: 'https://i.imgur.com/9FG4AiJ.jpg',
    user: USERS[3].user,
    likes: 7870,
    caption: "Spent the day wandering through the enchanting streets of Barcelona, soaking in the vibrant colors, rich history, and captivating architecture! 🇪🇸✨ Feeling grateful for this unforgettable experience! #Barcelona #TravelDiaries #ExploreTheWorld",
    profile_picture: USERS[3].image,
    comments: [
      {
        user: "theqazman",
        comment: "Wow! This build looks fire. Super excited about it!",
      },
      {
        user: "amaanath.dew",
        comment: "Once I wake up, I'll finally be ready to code this up!",
      },
    ],
  },
  {
    imageUrl: 'https://i.imgur.com/TdsdNtA.jpg',
    user: USERS[1].user,
    likes: 4820,
    caption: "Mesmerizing view of the tranquil lake nestled amidst majestic mountains! 🏞️✨ #Nature #MountainViews #SereneBeauty",
    profile_picture: USERS[1].image,
    comments: [
      {
        user: "cleverqazi",
        comment: "Incredible view!",
      },
      {
        user: "sugashaw",
        comment: "I prefer to be in my bed sleeping till night",
      },
    ],
  },
];
