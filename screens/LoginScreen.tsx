import { Button } from 'native-base';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import {Text} from "../components/Themed";

export default function LoginScreen() {

    const save = () =>{
      SecureStore.setItemAsync("token", "test");
    }
    return (
      <View style={styles.container}>
          <Text>Login Screen</Text>
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