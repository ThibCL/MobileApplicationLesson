import React, { FunctionComponent, useContext, useState } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { StackNavigationProp } from "@react-navigation/stack"
import { StackParamList } from "../App"
import { GameContext, Player } from "../GameContext"
import { styles } from "../generalStyle"
import { RouteProp } from "@react-navigation/native"

type ScreenNavigationProp = StackNavigationProp<StackParamList, "Tie">
type ScreenRouteProp = RouteProp<StackParamList, "Tie">

interface TieProps {
  navigation: ScreenNavigationProp
  route: ScreenRouteProp
}

export const Tie: FunctionComponent<TieProps> = ({
  navigation,
  route,
}: TieProps) => {
  const game = useContext(GameContext)
  const [playerSelected, setPlayerSelected] = useState<Player>()
  const playersElected = route.params

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{game.players[0].name}</Text>
      <Text>There is a tie, you have to vote</Text>
      {playersElected.map((player, index) => (
        <TouchableOpacity
          key={index}
          style={
            player === playerSelected
              ? styles.buttonTouchable
              : styles.buttonTouchableDisabled
          }
          disabled={player === playerSelected}
          onPress={() => {
            setPlayerSelected(player)
          }}
        >
          <Text style={styles.buttonText}>{player.name}</Text>
        </TouchableOpacity>
      ))}
      {playerSelected ? (
        <TouchableOpacity
          style={{ ...styles.buttonTouchable, backgroundColor: "white" }}
          onPress={() => {
            navigation.replace("Score", playerSelected)
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
