import React from 'react';

// Import Navigators from React Navigation
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

// Import Screens
import Home from './DrawerScreens/Home';
import Addinfo from './DrawerScreens/Addinfo';
import Examlist from './DrawerScreens/Examlist';
import Settings from './DrawerScreens/Settings';
import Todolist from './DrawerScreens/Todolist';
import Userinfo from './DrawerScreens/Userinfo';
import CustomSidebarMenu from './Components/CustomSidebarMenu';
import NavigationDrawerHeader from './Components/NavigationDrawerHeader';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const homeScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Home', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#307ecc', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};

const settingScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="Settings"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#307ecc', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          title: 'Settings', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

const ExamlistScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="Examlist"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#307ecc', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="Examlist"
        component={Examlist}
        options={{
          title: 'Examlist', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

const todolistScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="Todolist"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#307ecc', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="Todolist"
        component={Todolist}
        options={{
          title: 'Todolist', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

const addInfoScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="Addinfo"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#307ecc', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="Addinfo"
        component={Addinfo}
        options={{
          title: 'Addinfo', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

const userinfoScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="Userinfo">
      <Stack.Screen
        name="Userinfo"
        component={Userinfo}
        options={{
          title: 'Userinfo', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#307ecc', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};

const DrawerNavigatorRoutes = (props) => {
  return (
    <Drawer.Navigator
      drawerContentOptions={{
        activeTintColor: '#cee1f2',
        color: '#cee1f2',
        itemStyle: {marginVertical: 5, color: 'white'},
        labelStyle: {
          color: '#d8d8d8',
        },
      }}
      screenOptions={{headerShown: false}}
      drawerContent={CustomSidebarMenu}>
      <Drawer.Screen
        name="homeScreenStack"
        options={{drawerLabel: 'Home Screen'}}
        component={homeScreenStack}
      />
      <Drawer.Screen
        name="addInfoScreenStack"
        options={{drawerLabel: 'Add Info Screen'}}
        component={addInfoScreenStack}
      />
      <Drawer.Screen
        name="ExamlistScreenStack"
        options={{drawerLabel: 'Examlist Screen'}}
        component={ExamlistScreenStack}
      />
      <Drawer.Screen
        name="todolistScreenStack"
        options={{drawerLabel: 'Todolist Screen'}}
        component={todolistScreenStack}
      />
      <Drawer.Screen
        name="userinfoScreenStack"
        options={{drawerLabel: 'Userinfo Screen'}}
        component={userinfoScreenStack}
      />
      <Drawer.Screen
        name="settingScreenStack"
        options={{drawerLabel: 'Setting Screen'}}
        component={settingScreenStack}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigatorRoutes;