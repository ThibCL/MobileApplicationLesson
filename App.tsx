import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { GameProvider } from "./GameContext"
import { Home } from "./views/Home"
import { Rules } from "./views/Rules"
import { Roles } from "./views/Roles"
import { Votes } from "./views/Votes"

export type StackParamList = {
  Home: undefined
  Rules: undefined
  Roles: undefined
  Votes: undefined
}

const Stack = createStackNavigator<StackParamList>()

export default function App() {
  return (
    <GameProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Votes">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Rules" component={Rules} />
          <Stack.Screen name="Roles" component={Roles} />
          <Stack.Screen name="Votes" component={Votes} />
        </Stack.Navigator>
      </NavigationContainer>
    </GameProvider>
  )
}
