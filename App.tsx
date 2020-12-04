import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { GameProvider } from "./GameContext"
import { Home } from "./views/Home"
import { Rules } from "./views/Rules"
import { Roles } from "./views/Roles"

export type StackParamList = {
  Home: undefined
  Rules: undefined
  Roles: undefined
}

const Stack = createStackNavigator<StackParamList>()

export default function App() {
  return (
    <GameProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Rules" component={Rules} />
          <Stack.Screen name="Roles" component={Roles} />
        </Stack.Navigator>
      </NavigationContainer>
    </GameProvider>
  )
}
