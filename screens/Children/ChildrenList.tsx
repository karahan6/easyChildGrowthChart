import React, { useEffect } from "react";
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


export const ChildrenList = () => {
  const getChildren = useStoreActions(actions => actions.child.getChildren);
  const children = useStoreState(state => state.child.children);
  useEffect(()=>{
    getChildren();
  },[]);

  return (
    <Container>
      <ScrollView contentContainerStyle={styles.list}>
        <View style={styles.container}>
          {children.map(child => {
            var backgroundColor = child.gender === 1 ? "#FFDFE5" : "#a4cce8";
            return (
              <TouchableOpacity
                key={child.birthDay?.toString() + child.name }
                onPress={() => {
                  navigationService.navigate("ChildDetailScreen", {id:child.id})
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
                                  <Avatar.Image source={{uri:child.photo}} style={{marginTop: 10, marginLeft: 10, marginBottom: 10}} />

                    </View>
                  <View style={{ flex: 0.8 }}>
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
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
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
