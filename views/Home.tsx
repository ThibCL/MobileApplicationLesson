import React, { FunctionComponent, useContext } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { StackNavigationProp } from "@react-navigation/stack"
import { StackParamList } from "../App"
import { styles } from "../generalStyle"
import { GameContext } from "../GameContext"

type ScreenNavigationProp = StackNavigationProp<StackParamList, "Home">

interface HomeProps {
  navigation: ScreenNavigationProp
}

export const Home: FunctionComponent<HomeProps> = ({
  navigation,
}: HomeProps) => {
  const game = useContext(GameContext)
  console.log(game.players)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Insider</Text>
      <TouchableOpacity
        style={styles.buttonTouchable}
        onPress={() => {
          navigation.replace("Roles")
        }}
      >
        <Text style={styles.buttonText}>Play</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonTouchable}>
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
