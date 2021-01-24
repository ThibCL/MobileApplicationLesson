import React, { FunctionComponent, useContext, useEffect } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { StackNavigationProp } from "@react-navigation/stack"
import { StackParamList } from "../App"
import { GameContext, Player, Role } from "../GameContext"
import { styles } from "../generalStyle"

type ScreenNavigationProp = StackNavigationProp<StackParamList, "Score">

interface ScoreProps {
  navigation: ScreenNavigationProp
}

export const Score: FunctionComponent<ScoreProps> = ({
  navigation,
}: ScoreProps) => {
  const game = useContext(GameContext)

  useEffect(() => {
    const players = computeScore(
      game.players,
      game.wordFound,
      game.playersElected[0]
    )
    game.setPlayers(players)
  }, [])

  return (
    <View style={{ ...styles.container, ...styles.view }}>
      {game.players.map((player, index) => (
        <Text
          key={index}
          style={{ fontSize: 24, margin: 5, fontWeight: "bold" }}
        >
          <Text>{player.name} </Text>
          <Text style={{ color: "grey" }}>{player.score} </Text>
          <Text style={{ color: player.scoreVar < 0 ? "red" : "green" }}>
            ({player.scoreVar < 0 ? "" : "+"}
            {player.scoreVar})
          </Text>
        </Text>
      ))}
      <TouchableOpacity
        style={{ ...styles.buttonTouchable, backgroundColor: "white" }}
        onPress={async () => {
          navigation.replace("Home")
          await game.apiClient.saveGame(game.token, game.gameId!, game.players)
          game.eraseGame()
        }}
      >
        <Text style={{ ...styles.buttonText, color: "#338A3E" }}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ ...styles.buttonTouchable, backgroundColor: "white" }}
        onPress={async () => {
          navigation.replace("CreatePlayer")
          await game.apiClient.saveGame(game.token, game.gameId!, game.players)
          game.playAgain()
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
  playerElected: number
): Player[] => {
  const updatedPlayers = [...players]
  for (let player of updatedPlayers) {
    player.scoreVar = 0
    switch (player.role) {
      case Role.Master:
        if (wordFound) player.scoreVar += 5
        if (players[playerElected].role === Role.Traitor) player.scoreVar += 5
        if (player.vote && players[player.vote].role === Role.Traitor)
          player.scoreVar += 5
        break
      case Role.Citizen:
        if (wordFound) player.scoreVar += 5
        if (players[playerElected].role === Role.Traitor) player.scoreVar += 5
        if (player.vote && players[player.vote].role === Role.Traitor)
          player.scoreVar += 5
        break
      case Role.Traitor:
        if (!wordFound) player.scoreVar -= 10
        if (players[playerElected].role === Role.Traitor) player.scoreVar -= 5
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
