import React from 'react';

// Import Navigators from React Navigation
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

// Import Screens
import Home from './DrawerScreens/Home';
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
          title: '홈', //Set Header Title
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
          title: '설정', //Set Header Title
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
          title: '시험 게시판', //Set Header Title
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
          title: '시험 정보', //Set Header Title
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
          title: '사용자 정보', //Set Header Title
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
        options={{drawerLabel: '홈'}}
        component={homeScreenStack}
      />
      <Drawer.Screen
        name="ExamlistScreenStack"
        options={{drawerLabel: '시험 게시판'}}
        component={ExamlistScreenStack}
      />
      <Drawer.Screen
        name="todolistScreenStack"
        options={{drawerLabel: '시험 정보'}}
        component={todolistScreenStack}
      />
      <Drawer.Screen
        name="userinfoScreenStack"
        options={{drawerLabel: '사용자 정보'}}
        component={userinfoScreenStack}
      />
      <Drawer.Screen
        name="settingScreenStack"
        options={{drawerLabel: '설정'}}
        component={settingScreenStack}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigatorRoutes;