import React from "react";
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


export const ChildrenList = () => {
  var children = [
    {
      id: 1,
      name: "Elif"
    },
    {
      id: 2,
      name: "Ali"
    }
  ];
  return (
    <Container>
      <ScrollView contentContainerStyle={styles.list}>
        <View style={styles.container}>
          {children.map(child => {
            var backgroundColor = child.id === 1 ? "pink" : "#3987BF";
            return (
              <TouchableOpacity
                key={child.id}
                onPress={() => {
                  
                }}
              >
                <View
                  key={child.id}
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
                    {child.id === 1 ? <Image  style={styles.image} source={require("../../assets/images/girl.png")}/> :  
                      <Image  style={styles.image} source={require("../../assets/images/boy.png")}/>}
                    </View>
                  <View style={{ flex: 0.8 }}>
                    <ListItem
                      containerStyle={{ backgroundColor: backgroundColor }}
                      contentContainerStyle={{ marginLeft: 5 }}
                      titleStyle={{ color: "white" }}
                      subtitleStyle={{ color: "white", fontSize: 10 }}
                      key={child.id}
                      title={child.name}
                      
                      subtitle={
                        child.id === 1 ? "Girl"  : "Boy"
                      }
                      bottomDivider
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
