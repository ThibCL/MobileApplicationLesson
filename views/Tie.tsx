import React, { FunctionComponent, useContext, useState } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { StackNavigationProp } from "@react-navigation/stack"
import { StackParamList } from "../App"
import { GameContext, Player } from "../GameContext"
import { styles } from "../generalStyle"

type ScreenNavigationProp = StackNavigationProp<StackParamList, "Tie">

interface TieProps {
  navigation: ScreenNavigationProp
}

export const Tie: FunctionComponent<TieProps> = ({ navigation }: TieProps) => {
  const game = useContext(GameContext)
  const [playerSelected, setPlayerSelected] = useState<number>()
  const [listPlayers, setListPlayers] = useState<Player[]>(game.players)
  const [playersElected, setPlayersElected] = useState<number[]>(
    game.playersElected
  )

  return (
    <View style={{ ...styles.container }}>
      <Text style={styles.title}>{listPlayers[0].name}</Text>
      <Text>There is a tie, you have to vote</Text>
      {playersElected.map((player, index) => (
        <TouchableOpacity
          key={index}
          style={
            index === playerSelected
              ? styles.buttonTouchable
              : styles.buttonTouchableDisabled
          }
          disabled={index === playerSelected}
          onPress={() => {
            setPlayerSelected(index)
          }}
        >
          <Text style={styles.buttonText}>{listPlayers[player].name}</Text>
        </TouchableOpacity>
      ))}
      {playerSelected != undefined ? (
        <TouchableOpacity
          style={{ ...styles.buttonTouchable, backgroundColor: "white" }}
          onPress={() => {
            game.setPlayersElected([game.playersElected[playerSelected]])
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
