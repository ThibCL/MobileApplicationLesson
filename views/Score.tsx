import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react"
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

  const [maxScore, setMaxScore] = useState<number>(0)

  useEffect(() => {
    const players = computeScore(
      game.players,
      game.wordFound,
      game.playersElected[0]
    )
    game.setPlayers(players)

    let max = 0
    for (let player of players) {
      if (player.score > max) {
        max = player.score
      }
    }
    if (max >= game.options.score_limit) {
      game.setGame({ ...game.game, finished: true })
    }
    setMaxScore(max)
  }, [])

  return (
    <View
      style={{
        ...styles.container,
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <Text style={{ ...styles.title }}>
        {game.game.name}
        {game.game.finished ? " is finished" : null}
      </Text>
      {game.players.map((player, index) => (
        <Text
          key={index}
          style={{
            fontSize: 24,
            margin: 5,
            fontWeight: "bold",
            borderColor: "red",
            borderWidth:
              player.score === maxScore && game.game.finished ? 2 : 0,
          }}
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
          await game.apiClient.saveGame(
            game.token,
            game.game,
            game.players,
            game.options
          )
          navigation.replace("Home")
        }}
      >
        <Text style={{ ...styles.buttonText, color: "#338A3E" }}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ ...styles.buttonTouchable, backgroundColor: "white" }}
        onPress={async () => {
          await game.apiClient.saveGame(
            game.token,
            game.game,
            game.players,
            game.options
          )
          if (game.game.finished) {
            game.newGame(game.game, game.players, game.options)
          } else {
            game.playAgain()
          }
          navigation.replace("CreatePlayer")
        }}
      >
        <Text style={{ ...styles.buttonText, color: "#338A3E" }}>
          {game.game.finished ? "New game" : "Play again"}
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
        if (playerElected > 0 && players[playerElected].role === Role.Traitor)
          player.scoreVar += 5
        if (player.vote && players[player.vote].role === Role.Traitor)
          player.scoreVar += 5
        break
      case Role.Citizen:
        if (wordFound) player.scoreVar += 5
        if (playerElected > 0 && players[playerElected].role === Role.Traitor)
          player.scoreVar += 5
        if (player.vote && players[player.vote].role === Role.Traitor)
          player.scoreVar += 5
        break
      case Role.Traitor:
        if (!wordFound) player.scoreVar -= 20
        if (playerElected > 0 && players[playerElected].role === Role.Traitor)
          player.scoreVar -= 5
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
