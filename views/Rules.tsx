import React, { FunctionComponent, useContext } from "react"
import { View, Text } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import { GameContext } from "../GameContext"

interface RulesProps {}

export const Rules: FunctionComponent<RulesProps> = ({}: RulesProps) => {
  const game = useContext(GameContext)

  return (
    <View>
      <Text>Rules</Text>
      <FlatList
        data={game.players}
        renderItem={({ item }) => <Text>{item}</Text>}
      ></FlatList>
    </View>
  )
}
