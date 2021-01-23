import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { GameProvider, Player } from "./GameContext"
import { Home } from "./views/Home"
import { Rules } from "./views/Rules"
import { History } from "./views/History"
import { Roles } from "./views/Roles"
import { Votes } from "./views/Votes"
import { Tie } from "./views/Tie"
import { Score } from "./views/Score"
import { Timer } from "./views/Timer"
import { Option } from "./views/Option"
import { CreatePlayer } from "./views/CreatePlayer"
import { RecapVotes } from "./views/RecapVotes"
import { Auth } from "./views/Auth"
import { navigatorStyle } from "./generalStyle"

export type StackParamList = {
  Home: undefined
  History: undefined
  Rules: undefined
  Roles: undefined
  Votes: undefined
  Score: undefined
  Tie: undefined
  Timer: undefined
  CreatePlayer: undefined
  Option: undefined
  RecapVotes: undefined
  Auth: undefined
}

const Stack = createStackNavigator<StackParamList>()

export default function App() {
  return (
    <GameProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Auth">
          <Stack.Screen
            name="Home"
            options={{ ...navigatorStyle, title: "Insider" }}
            component={Home}
          />
          <Stack.Screen
            name="Rules"
            options={{ ...navigatorStyle }}
            component={Rules}
          />
          <Stack.Screen
            name="History"
            options={{ ...navigatorStyle }}
            component={History}
          />
          <Stack.Screen
            name="Roles"
            options={{ ...navigatorStyle }}
            component={Roles}
          />
          <Stack.Screen
            name="Votes"
            options={{ ...navigatorStyle }}
            component={Votes}
          />
          <Stack.Screen
            name="Tie"
            options={{ ...navigatorStyle }}
            component={Tie}
          />
          <Stack.Screen
            name="Score"
            options={{ ...navigatorStyle }}
            component={Score}
          />
          <Stack.Screen
            name="Timer"
            options={{ ...navigatorStyle }}
            component={Timer}
          />
          <Stack.Screen
            name="CreatePlayer"
            options={{ ...navigatorStyle }}
            component={CreatePlayer}
          />
          <Stack.Screen
            name="Option"
            options={{ ...navigatorStyle }}
            component={Option}
          />
          <Stack.Screen
            name="RecapVotes"
            options={{ ...navigatorStyle, title: "Votes result" }}
            component={RecapVotes}
          />
          <Stack.Screen
            name="Auth"
            options={{ ...navigatorStyle }}
            component={Auth}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GameProvider>
  )
}
