import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react"
import { View, Text, TouchableOpacity, FlatList } from "react-native"
import { Bar } from "react-native-progress"
import { StackNavigationProp } from "@react-navigation/stack"
import { StackParamList } from "../App"
import { GameContext, Player, Role } from "../GameContext"
import { styles } from "../generalStyle"
import { Footer } from "../components/Footer"

type ScreenNavigationProp = StackNavigationProp<StackParamList, "Score">

interface ScoreProps {
  navigation: ScreenNavigationProp
}

export const Score: FunctionComponent<ScoreProps> = ({
  navigation,
}: ScoreProps) => {
  const game = useContext(GameContext)

  const [listPlayers, setListPlayers] = useState<Player[]>(game.players)
  const [maxScore, setMaxScore] = useState<number>(0)

  useEffect(() => {
    const players = computeScore(
      game.players,
      game.wordFound,
      game.playersElected[0]
    )
    game.setPlayers(players)
    setListPlayers(players.sort((a, b) => (a.score < b.score ? 1 : -1)))

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
        display: "flex",
        flexDirection: "column",
      }}
    >
      <View style={{ flex: 7 }}>
        <FlatList
          keyExtractor={(item, index) => {
            return item.id?.toString() || ""
          }}
          data={listPlayers}
          renderItem={({ item, index }) => (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                margin: 10,
              }}
            >
              {game.game.finished ? (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#004d40",
                    borderRadius: 50,
                    flex: 2,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 20,
                      fontWeight: "bold",
                      textAlign: "center",
                      textAlignVertical: "center",
                    }}
                  >
                    {index + 1}
                  </Text>
                </View>
              ) : null}

              <View style={{ margin: 5, flex: 9 }}>
                <Text
                  style={{
                    fontSize: 24,
                    margin: 5,
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  <Text>{item.name} </Text>

                  {game.game.finished ? null : (
                    <Text
                      style={{ color: item.scoreVar < 0 ? "red" : "green" }}
                    >
                      {item.scoreVar < 0 ? "" : "+"}
                      {item.scoreVar}
                    </Text>
                  )}
                </Text>

                {game.game.finished ? null : (
                  <Bar
                    style={{ alignSelf: "center" }}
                    width={300}
                    height={10}
                    progress={item.score / game.options.score_limit}
                    color="#004d40"
                  />
                )}
              </View>
            </View>
          )}
        />
      </View>

      <View style={{ flex: 1, display: "flex", flexDirection: "row" }}>
        <TouchableOpacity
          style={{ ...styles.leafButtonPink, flex: 1 }}
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
          <Text style={{ ...styles.buttonTextGreen }}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ ...styles.leafButtonPink, flex: 1 }}
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
          <Text style={{ ...styles.buttonTextGreen }}>
            {game.game.finished ? "New game" : "Play again"}
          </Text>
        </TouchableOpacity>
      </View>
      <Footer />
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
