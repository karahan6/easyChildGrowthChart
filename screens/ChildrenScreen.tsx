import { AntDesign as Icon } from "@expo/vector-icons";
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { ChildrenList } from "./ChildrenList";
import { navigationService } from "../navigation/NavigationService";

const ChildrenScreen = () => {
  return (
    <View style={styles.mainContainer}>
      
      <ChildrenList/>
      <TouchableOpacity
        style={{
          alignSelf: 'flex-end',
          bottom: 20,
          right: 20,
        }}
        onPress={()=>navigationService.navigate("ChildFormScreen", {id:0})}
      >
        <Icon name="pluscircle" size={48} color="#3987BF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
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

ChildrenScreen.navigationOptions = {
  headerTitle: 'Children'
};

export default ChildrenScreen;