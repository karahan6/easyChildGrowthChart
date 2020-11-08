import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import Children from '../screens/ChildrenScreen';
import ChartScreen from '../screens/ChartScreen';
import { BottomTabParamList, ChildrenParamList, ChartParamList, TableParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Children"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Children"
        component={ChildrenNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Chart"
        component={ChartNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Table"
        component={TableNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const ChildrenStack = createStackNavigator<ChildrenParamList>();

function ChildrenNavigator() {
  return (
    <ChildrenStack.Navigator>
      <ChildrenStack.Screen
        name="ChildrenScreen"
        component={Children}
        options={{ headerTitle: 'Tab One Title' }}
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
        options={{ headerTitle: 'Tab Two Title' }}
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
        options={{ headerTitle: 'Tab Two Title' }}
      />
    </TableStack.Navigator>
  );
}