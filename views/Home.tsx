import React, { FunctionComponent, useContext, useEffect } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { StackNavigationProp } from "@react-navigation/stack"
import { StackParamList } from "../App"
import { styles } from "../generalStyle"
import { GameContext } from "../GameContext"
import * as Google from "expo-google-app-auth"
import RNExitApp from "react-native-exit-app"
import Icon from "react-native-vector-icons/Entypo"
import {
  Menu,
  MenuTrigger,
  MenuOption,
  MenuOptions,
} from "react-native-popup-menu"

type ScreenNavigationProp = StackNavigationProp<StackParamList, "Home">

interface HomeProps {
  navigation: ScreenNavigationProp
}

export const Home: FunctionComponent<HomeProps> = ({
  navigation,
}: HomeProps) => {
  const game = useContext(GameContext)

  const getOption = async () => {
    try {
      const option = await game.apiClient.getDefaultOption(game.token)
      if (option != undefined) {
        game.setOptions(option)
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getOption()
    game.eraseGame()
  }, [])

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Menu>
          <MenuTrigger
            children={
              <View style={{ paddingRight: 10 }}>
                <Icon name="dots-three-vertical" color="white" size={20} />
              </View>
            }
            customStyles={{}}
          />
          <MenuOptions>
            <MenuOption
              onSelect={async () => {
                await Google.logOutAsync({
                  androidClientId:
                    "578157949333-l0ufg3vlp0l0msbbdloq3nna5bdm2r66.apps.googleusercontent.com",
                  iosClientId:
                    "578157949333-gdsu9a0325a42eiqf5mqt042gijhim3v.apps.googleusercontent.com",
                  accessToken: game.token,
                })
                navigation.replace("Auth")
              }}
            >
              <Text style={{ color: "red" }}>Deconnection</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
      ),
    })
  })
  return (
    <View
      style={{
        backgroundColor: "#004d40",
        display: "flex",
        flex: 1,
      }}
    >
      <View
        style={{
          ...styles.container,
          flex: 9,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <TouchableOpacity
            style={{ ...styles.homeButton }}
            onPress={() => {
              let opt = game.options
              opt.id = 0
              game.setOptions(opt)
              navigation.replace("CreatePlayer")
            }}
          >
            <Text style={styles.buttonTextGreen}>PLAY</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <TouchableOpacity
            style={{ ...styles.homeButton }}
            onPress={() => {
              navigation.navigate("History")
            }}
          >
            <Text style={styles.buttonTextGreen}>CONTINUE</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <TouchableOpacity
            style={{ ...styles.homeButton }}
            onPress={() => {
              navigation.navigate("Rules")
            }}
          >
            <Text style={styles.buttonTextGreen}>RULES</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          ...styles.footer,
        }}
      >
        <TouchableOpacity
          style={{ alignSelf: "center", flex: 1 }}
          onPress={() => {
            navigation.navigate("Option", { default: true })
          }}
        >
          <Icon name="cog" color="white" size={30} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ alignSelf: "center", flex: 1 }}
          onPress={() => {
            RNExitApp.exitApp()
          }}
        >
          <Icon
            style={{ textAlign: "right" }}
            name="log-out"
            color="white"
            size={30}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}
