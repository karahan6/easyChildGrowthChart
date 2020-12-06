import React, { useEffect } from "react";
import { AntDesign as Icon } from "@expo/vector-icons";
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity
} from "react-native";

import { Container } from "native-base";
import { ListItem } from "react-native-elements";
import { useStoreActions, useStoreState } from "../../store";
import { Avatar } from "react-native-paper";
import { navigationService } from "../../navigation/NavigationService";
import { StackNavigationProp } from "@react-navigation/stack";
import { ChildrenParamList } from "../../types";
import { RouteProp } from "@react-navigation/native";
import MeasurementList from "./MeasurementList";

type ChildDetailScreenNavigationProp = StackNavigationProp<ChildrenParamList, 'ChildFormScreen'>;
type ChildDetailScreenRouteProp = RouteProp<ChildrenParamList, 'ChildFormScreen'>;

type ChildDetailScreenProps = {
  navigation: ChildDetailScreenNavigationProp;
  route: ChildDetailScreenRouteProp
};

export const ChildDetailScreen= ({ navigation, route }: ChildDetailScreenProps) => {
  const getChild = useStoreActions(actions => actions.child.getChild);
  const child = useStoreState(state => state.child.child);
  useEffect(()=>{
    let id = route.params.id;
    getChild(id);
  },[route.params.id]);

  useEffect(()=> {
    if(child != null){
        navigation.setOptions({ title: child.name });
    }
  }, [child])
  var backgroundColor = child?.gender === 1 ? "#FFDFE5" : "#3987BF";
  return (
      <Container>
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          {
            
            child &&
              <TouchableOpacity
                key={child.birthDay?.toString() + child.name }
                onPress={() => {
                  
                }}
              >
                <View
                  key={child.birthDay?.toString() + child.name}
                  style={{
                    backgroundColor: backgroundColor,
                    flexDirection: "row",
                    borderRadius: 5,
                    overflow: "hidden",
                    marginBottom: 20
                  }}
                >
                  <View
                    style={{
                      flex: 0.2
                    }}
                    
                  >
                                  <Avatar.Image source={{uri:child.photo}} style={{marginTop: 8, marginLeft: 8, marginBottom: 8}} />

                    </View>
                  <View style={{ flex: 0.6 }}>
                    <ListItem
                      containerStyle={{ backgroundColor: backgroundColor }}
                      contentContainerStyle={{ marginLeft: 5 }}
                      titleStyle={{ color: "black" }}
                      
                      key={child.birthDay?.toString() + child.name}
                      title={child.name}
                      
                      subtitle={<View >
                        <Text style={{ color: "gray", fontSize: 10 }}>{child.birthDay?.toString()}</Text>
                        <Text style={{ color: "gray", fontSize: 10 }}>BMI</Text>
                        </View>
                      }
                      
                    />
                  </View>
                  <View
                            style={{justifyContent: "center", alignItems: "center", flex:0.2}}


                  >
                            <TouchableOpacity
        onPress={()=>navigationService.navigate("ChildFormScreen", {id:0})}
        
      >
        <Icon name="edit" size={48} color="black" />
      </TouchableOpacity>
                    </View>
                </View>
              </TouchableOpacity>
            
          }
          
          <MeasurementList/>
          </View>
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
      </Container>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',

  },
  container: {
    flex:1,
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
