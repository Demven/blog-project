import { Connection } from 'mongoose';
import * as Promise from 'bluebird';
import Category from '../models/category';
import Image from '../models/image';
import Article from '../models/article';
import HomepageSection from '../models/homepage-section';
import connectToDatabase, { closeConnection } from '../../dal';

function createCategories() {
  return Category.create([
    {
      title: 'robotics',
      slug: 'robotics',
      color: 'blue',
    },
    {
      title: 'programming',
      slug: 'programming',
      color: 'green',
    },
    {
      title: 'thoughts',
      slug: 'thoughts',
      color: 'red',
    },
  ]);
}

function createImages() {
  return Image.create([
    {
      url: 'http://fotohost.by/images/2017/05/06/hectapod.jpg',
      description: 'spider',
      credits: 'Google Images',
    },
    {
      url: 'http://fotohost.by/images/2017/05/15/article-image.jpg',
      description: 'This is how it looks like to be a humanoid bot',
      credits: 'Google Images',
    },
  ]);
}

function createArticles([categories, images]: [Array<Object>, Array<Object>]) {
  return Article.create([
    {
      title: 'Octagon Nine: how to make a personal spider',
      slug: 'octagon-nine-how-to-make-a-personal-spider',
      image: images[0],
      category: categories[0],
      views: 0,
      body: [
        {
          type: 'text',
          text: `
            Robotics is the interdisciplinary branch of engineering and science that includes mechanical engineering,
            electrical engineering, computer science, and others. Robotics deals with the design, construction,
            operation, and use of robots,[1] as well as computer systems for their control, sensory feedback, and
            information processing.
          `,
        },
        {
          type: 'text',
          text: `
            These technologies are used to develop machines that can substitute for humans. Robots can be used in any
            situation and for any purpose, but today many are used in dangerous environments (including bomb detection
            and de-activation), manufacturing processes, or where humans cannot survive. Robots can take on any form
            but some are made to resemble humans in appearance. This is said to help in the acceptance of a robot in
            certain replicative behaviors usually performed by people. Such robots attempt to replicate walking,
            lifting, speech, cognition, and basically anything a human can do. Many of today's robots are inspired by
            nature, contributing to the field of bio-inspired robotics.
          `,
        },
        {
          type: 'inline-image',
          url: 'http://fotohost.by/images/2017/05/15/article-image.jpg',
          credits: 'Google Images',
          description: 'This is how it looks like to be a humanoid bot',
        },
        {
          type: 'text',
          text: `
            The concept of creating machines that can operate autonomously dates back to classical times, but research
            into the functionality and potential uses of robots did not grow substantially until the 20th century.
            Throughout history, it has been frequently assumed that robots will one day be able to mimic human
            behavior and manage tasks in a human-like fashion. Today, robotics is a rapidly growing field, as
            technological advances continue; researching, designing, and building new robots serve various practical
            purposes, whether domestically, commercially, or militarily. Many robots are built to do jobs that are
            hazardous to people such as defusing bombs, finding survivors in unstable ruins, and exploring mines and
            shipwrecks. Robotics is also used in STEM (Science, Technology, Engineering, and Mathematics).
          `,
        },
      ],
    },
  ])
    .then(articles => [categories, images, articles]);
}

function createHomepageSections([categories, images, articles]: [Array<Object>, Array<Object>, Array<Object>]) {
  return HomepageSection.create([
    {
      category: categories[0],
      articles: [articles[0], articles[0], articles[0], articles[0], articles[0]],
    },
    {
      category: categories[1],
      articles: [articles[0], articles[0], articles[0], articles[0], articles[0]],
    },
    {
      category: categories[2],
      articles: [articles[0], articles[0], articles[0], articles[0], articles[0]],
    },
  ]);
}

function dropDatabase(connection:Connection) {
  return new Promise(resolve => {
    console.info('Drop database...');
    connection.db.dropDatabase(() => {
      console.info('Dropped');
      resolve();
    });
  });
}

connectToDatabase()
  .then(dropDatabase)
  .then(closeConnection)
  .then(connectToDatabase)
  .then(() => {
    return Promise
      .all([
        createCategories(),
        createImages(),
      ])
      .then(createArticles)
      .then(createHomepageSections)
      .then(() => {
        console.info('Database is seeded with the new data');
        closeConnection();
      })
      .catch((e:Error) => {
        global.console.error(e);
        closeConnection();
      });
  })
  .catch((e:Error) => {
    global.console.error(e);
    closeConnection();
  });
