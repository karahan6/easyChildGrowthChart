import React, { useEffect, useMemo } from "react";
import { AntDesign as Icon, MaterialIcons as MatIcon } from "@expo/vector-icons";
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity
} from "react-native";

import { Container } from "native-base";
import { Button, Divider } from "react-native-elements";
import { useStoreActions, useStoreState } from "../../store";
import { Avatar } from "react-native-paper";
import { navigationService } from "../../navigation/NavigationService";
import { StackNavigationProp } from "@react-navigation/stack";
import { ChildrenParamList } from "../../types";
import { RouteProp } from "@react-navigation/native";
import MeasurementList from "./MeasurementList";
import useChild from "../../hooks/useChild";

type ChildDetailScreenNavigationProp = StackNavigationProp<ChildrenParamList, 'ChildFormScreen'>;
type ChildDetailScreenRouteProp = RouteProp<ChildrenParamList, 'ChildFormScreen'>;

type ChildDetailScreenProps = {
  navigation: ChildDetailScreenNavigationProp;
  route: ChildDetailScreenRouteProp
};

export const ChildDetailScreen = ({ navigation, route }: ChildDetailScreenProps) => {
  let clearChild = useStoreActions(actions => actions.child.clearChild);
  let child = useChild(route.params.id);
  var backgroundColor = child?.gender === 1 ? "#FFDFE5" : "#a4cce8";
  return (
    <Container>
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          {

            child && <View style={{ backgroundColor: "#f6f6f6", marginBottom: 20 }}>
              <View
                key={child.birthDay?.toString() + child.name}
                style={{
                  backgroundColor: backgroundColor,
                  height: 55,
                  flexDirection: "row",
                  borderRadius: 5,
                  overflow: "hidden",
                  marginBottom: 50
                }}
              />
              <View
                style={{
                  justifyContent: 'center',
                  position: 'absolute',
                  left: 10,
                  top: 30,
                  width: '100%',
                  height: 40,
                }}
              >
                <Avatar.Image source={{ uri: child.photo }} style={{ marginTop: 10, marginLeft: 10, marginBottom: 10 }} />

              </View>
              <View style={{flexDirection: "row", marginBottom:10}}>
                <View style={{ marginLeft: 20, flex: 0.6 }}>

                  <Text>{child.name}</Text>
                  <Text >{child.birthDay?.toString()}</Text>
                  <Text >BMI</Text>
                </View>
                <View style={{ flex: 0.4, justifyContent:"center", alignItems:"center" }}>
                  <TouchableOpacity
                    onPress={()=>{
                      navigationService.navigate("ChildFormScreen", {id:child?.id});
                      
                    }}
                    style={{backgroundColor: "#3987BF",
                      height:48,
                      width: 48,
                      borderRadius: 24,
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <MatIcon name="edit" size={36} color="white"/>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          }
          <MeasurementList childId={route.params.id}/>
        </View>
        <TouchableOpacity
          style={{
            alignSelf: 'flex-end',
            bottom: 20,
            right: 20,
          }}
          onPress={() => navigationService.navigate("MeasurementFormScreen", { id: 0, childId:child?.id })}

        >
          <Icon name="pluscircle" size={48} color="#3987BF" />
        </TouchableOpacity>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',

  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    margin: 15
  },
  text: {
    fontWeight: "bold",
    fontSize: 13,
    color: "#8A8A8A",
    marginBottom: 20
  },
  list: {
    justifyContent: "center"
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  }
});
