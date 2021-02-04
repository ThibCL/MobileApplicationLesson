import React, { FunctionComponent } from "react"
import { NavigationContainer } from "@react-navigation/native"
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack"
import { GameProvider } from "./GameContext"
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
import { Alert, TouchableOpacity } from "react-native"
import { MenuProvider } from "react-native-popup-menu"
import Icon from "react-native-vector-icons/Entypo"
import { useFonts } from "expo-font"
import { AppLoading } from "expo"

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

type ScreenNavigationProp = StackNavigationProp<StackParamList, "Home">

interface HeaderButtonProps {
  navigation: ScreenNavigationProp
}
const HeaderButton: FunctionComponent<HeaderButtonProps> = ({
  navigation,
}: HeaderButtonProps) => {
  return (
    <TouchableOpacity
      style={{ padding: 10 }}
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
    >
      <Icon name="home" size={20} color="white" />
    </TouchableOpacity>
  )
}

export default function App() {
  let [fontsLoaded] = useFonts({
    "Big-Shoulder": require("./assets/fonts/BigShouldersDisplay-Regular.ttf"),
  })
  if (!fontsLoaded) {
    return <AppLoading />
  } else {
    return (
      <MenuProvider
        style={{ justifyContent: "center" }}
        customStyles={{ backdrop: { backgroundColor: "red" } }}
      >
        <GameProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Auth">
              <Stack.Screen
                name="Home"
                options={{
                  ...navigatorStyle,
                  title: "Insider Online Board Game",
                }}
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
                  title: "Your roles",
                  headerRight: () => <HeaderButton navigation={navigation} />,
                })}
                component={Roles}
              />
              <Stack.Screen
                name="Votes"
                options={({ navigation }) => ({
                  ...navigatorStyle,
                  title: "Time to vote",
                  headerRight: () => <HeaderButton navigation={navigation} />,
                })}
                component={Votes}
              />
              <Stack.Screen
                name="Tie"
                options={({ navigation }) => ({
                  ...navigatorStyle,
                  headerRight: () => <HeaderButton navigation={navigation} />,
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
                  headerRight: () => <HeaderButton navigation={navigation} />,
                })}
                component={Timer}
              />
              <Stack.Screen
                name="CreatePlayer"
                options={({ navigation }) => ({
                  ...navigatorStyle,
                  title: "Players",
                  headerRight: () => <HeaderButton navigation={navigation} />,
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
                  headerRight: () => <HeaderButton navigation={navigation} />,
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
      </MenuProvider>
    )
  }
}
