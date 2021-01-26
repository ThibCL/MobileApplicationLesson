import React, { FunctionComponent, useContext, useEffect } from "react"
import { View, Text, TouchableOpacity, Image } from "react-native"
import { StackNavigationProp } from "@react-navigation/stack"
import { StackParamList } from "../App"
import { styles } from "../generalStyle"
import { GameContext } from "../GameContext"
import * as Google from "expo-google-app-auth"

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
  }, [])

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={async () => {
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
          <Image source={{ uri: game.user?.photoUrl, width: 50, height: 50 }} />
        </TouchableOpacity>
      ),
    })
  })
  return (
    <View style={{ ...styles.container, ...styles.view }}>
      <TouchableOpacity
        style={styles.buttonTouchable}
        onPress={() => {
          let opt = game.options
          opt.id = 0
          game.setOptions(opt)
          navigation.replace("CreatePlayer")
        }}
      >
        <Text style={styles.buttonText}>Play</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonTouchable}
        onPress={() => {
          navigation.navigate("History")
        }}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonTouchable}
        onPress={() => {
          navigation.replace("Option", { default: true })
        }}
      >
        <Text style={styles.buttonText}>Options</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonTouchable}
        onPress={() => {
          navigation.navigate("Rules")
        }}
      >
        <Text style={styles.buttonText}>Rules</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonTouchable}
        onPress={() => {
          alert("Find a way to close the app")
        }}
      >
        <Text style={styles.buttonText}>Quit</Text>
      </TouchableOpacity>
    </View>
  )
}
