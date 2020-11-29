import React, { FunctionComponent, useContext } from "react"
import { View, Text, Button } from "react-native"
import { StackNavigationProp } from "@react-navigation/stack"
import { GameContext } from "../GameContext"
import { StackParamList } from "../App"

type ScreenNavigationProp = StackNavigationProp<StackParamList, "Home">

interface HomeProps {
  navigation: ScreenNavigationProp
}

export const Home: FunctionComponent<HomeProps> = ({
  navigation,
}: HomeProps) => {
  const game = useContext(GameContext)

  return (
    <View>
      <Text>Insider</Text>
      <Button title="Play" onPress={() => {}} />
      <Button title="Options" onPress={() => {}} />
      <Button
        title="Rules"
        onPress={() => {
          game.setPlayers(["Test", "de", "merde"])
          navigation.navigate("Rules")
        }}
      />
    </View>
  )
}
