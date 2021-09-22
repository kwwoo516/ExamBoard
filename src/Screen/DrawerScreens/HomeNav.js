import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from './Home';
import Examlist from './Examlist';
import Todolist from './Todolist';

 
const Stack = createStackNavigator();

const HomeNav = () => {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen 
                name="Home" 
                component={Home}
                options={{headerShown: false}}
            />
            <Stack.Screen 
                name="Examlist" 
                component={Examlist}
                options={{headerShown: false}}
            />
            <Stack.Screen 
                name="Todolist" 
                component={Todolist}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    )
}
 
export default HomeNav;