import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import {Text} from "../components/Themed";

export default function SignupScreen() {
    return (
      <View style={styles.container}>
          <Text>Signup Screen</Text>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }
  });