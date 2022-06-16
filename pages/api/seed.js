import prisma from '../../lib/prisma';

export default async (req, res) => {
  try {
    await prisma.$transaction([
      prisma.user.deleteMany({}),
      prisma.post.deleteMany({})
    ]);
    const newUser1 = await prisma.user.create({
      data: seedUser1,
    });

    const newUser2 = await prisma.user.create({
      data: seedUser2,
    });

    res.status(201).json([newUser1, newUser2]);
  } catch (error) {
    console.error(error);
    return res.status(500).end();
  }
};

const seedUser1 = {
  email: 'jane@prisma.io',
  name: 'Jane',
  bio: 'I am a fullstack developer',
  posts: {
    create: [
      {
        title:
          'Comparing Database Types: How Database Types Evolved to Meet Different Needs',
        content:
          'https://www.prisma.io/blog/comparison-of-database-models-1iz9u29nwn37/',
      },
      {
        title: 'Analysing Sleep Patterns: The Quantified Self',
        content: 'https://quantifiedself.com/get-started/',
      },
    ],
  },
};

const seedUser2 = {
  email: 'toru@prisma.io',
  name: 'Toru Takemitsu',
  bio: 'Senior Frontend Engineer at Prisma',
  posts: {
    create: [
      {
        title: 'Requiem for String Orchestra',
        content: '',
      },
      {
        title: 'Music of Tree',
        content: '',
      },
      {
        title: 'Waves for clarinet, horn, two trombones and bass drum ',
        content: '',
      },
    ],
  },
};
