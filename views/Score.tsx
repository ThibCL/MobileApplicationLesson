import React, { FunctionComponent, useContext, useEffect } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { StackNavigationProp } from "@react-navigation/stack"
import { StackParamList } from "../App"
import { GameContext, Player, Role } from "../GameContext"
import { RouteProp } from "@react-navigation/native"
import { styles } from "../generalStyle"

type ScreenNavigationProp = StackNavigationProp<StackParamList, "Score">
type ScreenRouteProp = RouteProp<StackParamList, "Score">

interface ScoreProps {
  navigation: ScreenNavigationProp
  route: ScreenRouteProp
}

export const Score: FunctionComponent<ScoreProps> = ({
  navigation,
  route,
}: ScoreProps) => {
  const game = useContext(GameContext)
  const playerElected = route.params

  useEffect(() => {
    const players = computeScore(game.players, true, playerElected)
    game.setPlayers(players)
  }, [])

  return (
    <View style={styles.container}>
      {game.players.map((player, index) => (
        <Text key={index} style={styles.title}>
          {player.name} {player.score} ({player.scoreVar < 0 ? "-" : "+"}{" "}
          {player.scoreVar})
        </Text>
      ))}
      <TouchableOpacity
        style={{ ...styles.buttonTouchable, backgroundColor: "white" }}
        onPress={() => {
          navigation.replace("Home")
        }}
      >
        <Text style={{ ...styles.buttonText, color: "#338A3E" }}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ ...styles.buttonTouchable, backgroundColor: "white" }}
        onPress={() => {
          navigation.replace("Roles")
        }}
      >
        <Text style={{ ...styles.buttonText, color: "#338A3E" }}>
          Play again
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const computeScore = (
  players: Player[],
  wordFound: boolean,
  playerElected: Player
): Player[] => {
  const updatedPlayers = [...players]
  for (let player of updatedPlayers) {
    switch (player.role) {
      case Role.Master:
        if (wordFound) player.scoreVar += 5
        if (playerElected.role === Role.Traitor) player.scoreVar += 5
        if (player.vote?.role === Role.Traitor) player.scoreVar += 5
        break
      case Role.Citizen:
        if (wordFound) player.scoreVar += 5
        if (playerElected.role === Role.Traitor) player.scoreVar += 5
        if (player.vote?.role === Role.Traitor) player.scoreVar += 5
        break
      case Role.Traitor:
        if (!wordFound) player.scoreVar -= 10
        if (playerElected.role === Role.Traitor) player.scoreVar -= 5
        else player.scoreVar += 15

        break
      default:
        player.scoreVar = 0
        break
    }
    player.score += player.scoreVar
  }
  return updatedPlayers
}
