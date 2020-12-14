import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ChildrenScreen from '../screens/Children/ChildrenScreen';
import ChildFormScreen from '../screens/Children/ChildFromScreen';
import ChartScreen from '../screens/Chart/ChartScreen';
import { BottomTabParamList, ChildrenParamList, ChartParamList, TableParamList, FAQParamList, AuthParamList, AppStackParamList } from '../types';
import { Alert, Platform, TouchableOpacity, View } from 'react-native';
import FAQScreen from '../screens/FAQScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import SignupScreen from '../screens/Auth/SignupScreen';
import { navigationService } from './NavigationService';
import { ChildDetailScreen } from '../screens/Children/ChildDetailScreen';
import MeasurementFormScreen from '../screens/Children/MeasurementFromScreen';


const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="Home" component={BottomTabNavigator} />
      <Drawer.Screen name="FAQ" component={FAQNavigator} />
    </Drawer.Navigator>
  );
}



const ChildrenStack = createStackNavigator<ChildrenParamList>();

function ChildrenNavigator() {
  return (
    <ChildrenStack.Navigator>
      <ChildrenStack.Screen
        name="ChildrenScreen"

        component={ChildrenScreen}
        options={({ navigation }) => ({
          headerTitle: 'Children',
          headerLeft: () => <View style={{ marginLeft: 20 }}>
            <TouchableOpacity onPress={navigation.toggleDrawer}>
              <MaterialCommunityIcons name="menu" size={32} color="grey" />
            </TouchableOpacity>
          </View>,
          headerRight: () => <View style={{ marginRight: 20 }}>
            <TouchableOpacity onPress={() => navigationService.navigate("LoginScreen", { id: 0 })}>
              <MaterialCommunityIcons name="login" size={32} color="grey" />
            </TouchableOpacity>
          </View>
        })
        }
      />
      <ChildrenStack.Screen
        name="ChildFormScreen"
        component={ChildFormScreen}
      />
      <ChildrenStack.Screen
        name="ChildDetailScreen"
        component={ChildDetailScreen}
      />
      <ChildrenStack.Screen
        name="MeasurementFormScreen"
        component={MeasurementFormScreen}
      />
      <ChildrenStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          headerShown: false,
        }

        }
      />
      <ChildrenStack.Screen
        name="SignupScreen"
        component={SignupScreen}
      />
    </ChildrenStack.Navigator>
  );
}


const ChartStack = createStackNavigator<ChartParamList>();

function ChartNavigator() {
  return (
    <ChartStack.Navigator>
      <ChartStack.Screen
        name="ChartScreen"
        component={ChartScreen}
        options={({ navigation }) => ({
          headerTitle: 'Chart',
          headerLeft: () => <View style={{ marginLeft: 20 }}>
            <TouchableOpacity onPress={navigation.toggleDrawer}>
              <Ionicons name="md-menu" size={32} color="grey" />
            </TouchableOpacity>
          </View>
        })
        }
      />
    </ChartStack.Navigator>
  );
}

const TableStack = createStackNavigator<TableParamList>();

function TableNavigator() {
  return (
    <TableStack.Navigator>
      <TableStack.Screen
        name="TableScreen"
        component={ChartScreen}
        options={({ navigation }) => ({
          headerTitle: 'Table',
          headerLeft: () => <View style={{ marginLeft: 20 }}>
            <TouchableOpacity onPress={navigation.toggleDrawer}>
              <Ionicons name="md-menu" size={32} color="grey" />
            </TouchableOpacity>
          </View>

        })
        }
      />
    </TableStack.Navigator>
  );
}


const BottomTab = createBottomTabNavigator<BottomTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Children"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Children"
        component={ChildrenNavigator}
        options={({ navigation, route }) => ({
          tabBarIcon: ({ color }) => <TabBarIcon name="child-care" color={color} />,
          tabBarVisible: shouldTabBarVisible(navigation),
        })}
      />
      <BottomTab.Screen
        name="Chart"
        component={ChartNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="insert-chart" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Table"
        component={TableNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="view-list" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <MaterialIcons size={30} style={{ marginBottom: -3 }} {...props} />;
}


const FAQStack = createStackNavigator<FAQParamList>();

function FAQNavigator() {
  return (
    <FAQStack.Navigator>
      <FAQStack.Screen
        name="FAQScreen"
        component={FAQScreen}
        options={({ navigation }) => ({
          headerTitle: 'FAQ',
          headerLeft: () => <View style={{ marginLeft: 20 }}>
            <TouchableOpacity onPress={navigation.toggleDrawer}>
              <Ionicons name="md-menu" size={32} color="grey" />
            </TouchableOpacity>
          </View>
        })
        }
      />
    </FAQStack.Navigator>
  );
}


const shouldTabBarVisible = (navigation: any) => {
  const state = navigation.dangerouslyGetState();
  let actualRoute = state.routes[state.index];

  while (actualRoute.state) {
    actualRoute = actualRoute.state.routes[actualRoute.state.index];
  }
  if (actualRoute.name === "LoginScreen") {
    return false;
  }
  return true;
};