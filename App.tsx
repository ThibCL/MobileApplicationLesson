import React, { useContext } from "react"
import { NavigationContainer } from "@react-navigation/native"
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack"
import { GameContext, GameProvider, Player } from "./GameContext"
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
import { Alert, Button } from "react-native"

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
  Option: { default: boolean }
  RecapVotes: undefined
  Auth: undefined
}

const Stack = createStackNavigator<StackParamList>()

export default function App() {
  const game = useContext(GameContext)

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
            options={({ navigation }) => ({
              ...navigatorStyle,
              headerRight: () => (
                <Button
                  color="#7F0000"
                  title="Home"
                  onPress={() => {
                    Alert.alert(
                      "Return home",
                      "Are you sure you wanna quit? The game will be lost.",
                      [
                        {
                          text: "Yes",
                          onPress: () => {
                            navigation.replace("Home")
                          },
                        },
                        { text: "Cancel", onPress: () => {} },
                      ]
                    )
                  }}
                />
              ),
            })}
            component={Roles}
          />
          <Stack.Screen
            name="Votes"
            options={({ navigation }) => ({
              ...navigatorStyle,
              headerRight: () => (
                <Button
                  color="#7F0000"
                  title="Home"
                  onPress={() => {
                    Alert.alert(
                      "Return home",
                      "Are you sure you wanna quit? The game will be lost.",
                      [
                        {
                          text: "Yes",
                          onPress: () => {
                            navigation.replace("Home")
                          },
                        },
                        { text: "Cancel", onPress: () => {} },
                      ]
                    )
                  }}
                />
              ),
            })}
            component={Votes}
          />
          <Stack.Screen
            name="Tie"
            options={({ navigation }) => ({
              ...navigatorStyle,
              headerRight: () => (
                <Button
                  color="#7F0000"
                  title="Home"
                  onPress={() => {
                    Alert.alert(
                      "Return home",
                      "Are you sure you wanna quit? The game will be lost.",
                      [
                        {
                          text: "Yes",
                          onPress: () => {
                            navigation.replace("Home")
                          },
                        },
                        { text: "Cancel", onPress: () => {} },
                      ]
                    )
                  }}
                />
              ),
            })}
            component={Tie}
          />
          <Stack.Screen
            name="Score"
            options={{ ...navigatorStyle }}
            component={Score}
          />
          <Stack.Screen
            name="Timer"
            options={({ navigation }) => ({
              ...navigatorStyle,
              headerRight: () => (
                <Button
                  color="#7F0000"
                  title="Home"
                  onPress={() => {
                    Alert.alert(
                      "Return home",
                      "Are you sure you wanna quit? The game will be lost.",
                      [
                        {
                          text: "Yes",
                          onPress: () => {
                            navigation.replace("Home")
                          },
                        },
                        { text: "Cancel", onPress: () => {} },
                      ]
                    )
                  }}
                />
              ),
            })}
            component={Timer}
          />
          <Stack.Screen
            name="CreatePlayer"
            options={({ navigation }) => ({
              ...navigatorStyle,
              headerRight: () => (
                <Button
                  color="#7F0000"
                  title="Home"
                  onPress={() => {
                    Alert.alert(
                      "Return home",
                      "Are you sure you wanna quit? The game will be lost.",
                      [
                        {
                          text: "Yes",
                          onPress: () => {
                            navigation.replace("Home")
                          },
                        },
                        { text: "Cancel", onPress: () => {} },
                      ]
                    )
                  }}
                />
              ),
            })}
            component={CreatePlayer}
          />
          <Stack.Screen
            name="Option"
            options={{ ...navigatorStyle }}
            component={Option}
          />
          <Stack.Screen
            name="RecapVotes"
            options={({ navigation }) => ({
              ...navigatorStyle,
              title: "Votes result",
              headerRight: () => (
                <Button
                  color="#7F0000"
                  title="Home"
                  onPress={() => {
                    Alert.alert(
                      "Return home",
                      "Are you sure you wanna quit? The game will be lost.",
                      [
                        {
                          text: "Yes",
                          onPress: () => {
                            navigation.replace("Home")
                          },
                        },
                        { text: "Cancel", onPress: () => {} },
                      ]
                    )
                  }}
                />
              ),
            })}
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
