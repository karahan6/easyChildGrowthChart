import moment, { Moment } from 'moment';
import * as React from 'react';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { IChild } from '../../models/IChild';
import { Gender } from '../../models/Gender';
import { useStoreActions, useStoreState } from '../../store';

export default function ChartScreen() {
  const saveChild = useStoreActions(actions => actions.child.saveChild);
  const childName = useStoreState(state => state.child.childName);

  useEffect(() => {
    // Update the document title using the browser API
    var date: string = moment().format("YYYY-MM-DD");
    var child : IChild ={
      name: "Asım",
      birthDay: date,
      gender: Gender.Boy,
      isSent: false,
      notes: "first record",
      photo: "test"
    };
    saveChild(child);
  });
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Charts</Text>
      <Text style={styles.title}>ChildName:{childName}</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/ChartScreen.js" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
