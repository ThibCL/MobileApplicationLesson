import React, { FunctionComponent, useContext, useState } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { StackNavigationProp } from "@react-navigation/stack"
import { StackParamList } from "../App"
import { GameContext } from "../GameContext"
import { styles } from "../generalStyle"

type ScreenNavigationProp = StackNavigationProp<StackParamList, "Tie">

interface TieProps {
  navigation: ScreenNavigationProp
}

export const Tie: FunctionComponent<TieProps> = ({ navigation }: TieProps) => {
  const game = useContext(GameContext)
  const [playerSelected, setPlayerSelected] = useState<number>()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{game.players[0].name}</Text>
      <Text>There is a tie, you have to vote</Text>
      {game.playersElected.map((player, index) => (
        <TouchableOpacity
          key={index}
          style={
            index === playerSelected
              ? styles.buttonTouchable
              : styles.buttonTouchableDisabled
          }
          disabled={index === playerSelected}
          onPress={() => {
            setPlayerSelected(player)
          }}
        >
          <Text style={styles.buttonText}>{game.players[player].name}</Text>
        </TouchableOpacity>
      ))}
      {playerSelected ? (
        <TouchableOpacity
          style={{ ...styles.buttonTouchable, backgroundColor: "white" }}
          onPress={() => {
            game.setPlayersElected([playerSelected])
            navigation.replace("RecapVotes")
          }}
        >
          <Text style={{ ...styles.buttonText, color: "#338A3E" }}>
            Confirm
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  )
}
