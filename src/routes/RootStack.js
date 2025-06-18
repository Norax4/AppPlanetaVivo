import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

export function RootStack() {
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="HomeScreen">

            </Stack.Navigator>
        </NavigationContainer>
    );
}