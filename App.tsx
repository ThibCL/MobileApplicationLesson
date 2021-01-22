import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { GameProvider, Player } from "./GameContext"
import { Home } from "./views/Home"
import { Rules } from "./views/Rules"
import { Roles } from "./views/Roles"
import { Votes } from "./views/Votes"
import { Tie } from "./views/Tie"
import { Score } from "./views/Score"
import { Timer } from "./views/Timer"
import { Option } from "./views/Option"
import { CreatePlayer } from "./views/CreatePlayer"

export type StackParamList = {
  Home: undefined
  Rules: undefined
  Roles: undefined
  Votes: undefined
  Score: undefined
  Tie: Player[]
  Timer : undefined 
  CreatePlayer: undefined
  Option : undefined
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
          <Stack.Screen name="Votes" component={Votes} />
          <Stack.Screen name="Tie" component={Tie} />
          <Stack.Screen name="Score" component={Score} />
          <Stack.Screen name="Timer" component={Timer} />
          <Stack.Screen name="CreatePlayer" component={CreatePlayer} />
          <Stack.Screen name="Option" component={Option} />
        </Stack.Navigator>
      </NavigationContainer>
    </GameProvider>
  )
}
