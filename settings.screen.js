// @flow
// I forgot to add "flow in presets of .babelrc. so it didn't flow in babel.... "
// it seems I also need to add flow
// now flow seems to work perfectly while now I don't have flow installed in the babelrc. I give up, I don't understand shit!
//Whatever... The most important is that it kinda works now! I won't struggle with this much tomorrow.

import * as React from 'react';
import { View, Text } from 'react-native';

const a = (c: string): string => {
  return `b ${c}`;
};

export default class HomeScreen extends React.Component<{}> {
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'brown',
        }}>
        <Text style={{ fontSize: 40 }}>settings. {a('jaja')}</Text>
      </View>
    );
  }
}
//I thought flow was working... -_- need to have another look at that soon. :-/ at least it works at the server, but I should probably find another docs to install it on expo in the most easy way.
