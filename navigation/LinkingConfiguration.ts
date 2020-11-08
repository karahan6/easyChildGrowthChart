import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Children: {
            screens: {
              ChildrenScreen: 'one',
            },
          },
          Chart: {
            screens: {
              ChartScreen: 'two',
            },
          },
          Table: {
            screens: {
              TableScreen: 'three',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
