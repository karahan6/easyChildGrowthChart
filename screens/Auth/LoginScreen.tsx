import { Button } from 'react-native-elements';
import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Animated, ScrollView, Keyboard } from 'react-native';
import { TextInput } from "react-native-paper";
import { Text } from "../../components/Themed";
import { TranslatedText } from '../../components/TranslatedText';
import { formatMessage } from '../../helpers/i18n';
import { PasswordInput } from '../../components/PasswordInput';
import { navigationService } from '../../navigation/NavigationService';
import { Container } from 'native-base';
import { useStoreActions, useStoreState } from '../../store';

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const currentLocale = useStoreState(state => state.locale.currentLocale);
  const setLocale = useStoreActions(actions => actions.locale.setLocale);

  const [maxHeight, setMaxHeight] = useState("30%");
  const [marginTop, setMarginTop] = useState(50);

  const inputTheme = {
    colors: {
      primary: "#119DD8"
    }
  };
  const keyboardListenerShow = Keyboard.addListener("keyboardDidShow", () => {
    setMaxHeight("30%");
    setMarginTop(40);
  });
  const keyboardListenerHide = Keyboard.addListener("keyboardDidHide", () => {
    setMaxHeight("30%");
    setMarginTop(50);
  });

  return (

    <ScrollView contentContainerStyle={styles.contentContainer}>

      <Container style={styles.container}>
        <Animated.View
          style={[
            styles.imageView,
            { maxHeight: maxHeight, maxWidth: "100%" }
          ]}
        >
        </Animated.View>
        <View style={{ marginTop: marginTop }}>

          <View style={styles.cardView}>
            <TranslatedText style={styles.welcomeText} id="Login.welcome" />
            <TranslatedText style={styles.messageText} id="Login.welcomeDirective" />

            <TextInput
              label={formatMessage("Login.emailAddress.label")}
              value={email}
              onChangeText={setEmail}
              style={{
                paddingHorizontal: 0,
                backgroundColor: "white",
                fontSize: 14
              }}
              theme={inputTheme}
            />

            <PasswordInput
              theme={inputTheme}
              value={password}
              onChangeText={setPassword}
              style={{
                fontSize: 14
              }}
            />

              <Button
                buttonStyle={{ marginTop: 10, backgroundColor: "#119DD8" }}
                title={formatMessage("Login.submitButton.label")}
                onPress={() => navigationService.navigate("ChildrenScreen", {})}
              />
            
              <Button
                buttonStyle={{ marginTop: 10, backgroundColor: "#119DD8" }}
                title={formatMessage("Login.googleSubmitButton.label")}
                onPress={() => navigationService.navigate("ChildrenScreen", {})}
              />
          </View>
        </View>
      </Container>
    </ScrollView>


  );
}

const styles = StyleSheet.create({
  cardView: {
    shadowColor: "#00000014",
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 5,
    backgroundColor: "white",
    padding: 25
  },
  welcomeText: {
    color: "#000000",
    fontSize: 18
  },
  messageText: {
    color: "#8B898D",
    fontSize: 20,
    marginBottom: 15
  },
  container: {
    flex: 1,
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: "flex-start"
  },
  imageView: {
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    resizeMode: "contain"
  },
  contentContainer: {
    paddingTop: 30,
    overflow: "visible"
  }
});