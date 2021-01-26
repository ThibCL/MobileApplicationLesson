import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react"
import { View, Text, FlatList, TouchableOpacity } from "react-native"
import { StackNavigationProp } from "@react-navigation/stack"
import { StackParamList } from "../App"
import { Game, GameContext, Options, Player } from "../GameContext"
import { styles } from "../generalStyle"

type ScreenNavigationProp = StackNavigationProp<StackParamList, "History">

interface HistoryProps {
  navigation: ScreenNavigationProp
}

export const History: FunctionComponent<HistoryProps> = ({
  navigation,
}: HistoryProps) => {
  const game = useContext(GameContext)
  const [games, setGames] = useState<
    { id: number; name: string; players: Player[]; option: Options }[]
  >([])
  const [gameExpanded, setGameExpanded] = useState<number>(0)

  const getGames = async () => {
    const listGames = await game.apiClient.listGames(game.token)
    console.log(listGames)
    setGames(listGames)
  }

  useEffect(() => {
    getGames()
  }, [])

  return (
    <View style={{ ...styles.container }}>
      <FlatList
        ListHeaderComponent={
          <Text style={{ ...styles.title, color: "black" }}>
            Previous games
          </Text>
        }
        data={games}
        renderItem={({ item }) => (
          <View
            style={{
              borderColor: "black",
              borderWidth: 1,
              margin: 5,
              borderRadius: 5,
              backgroundColor: "#DDDDDD",
            }}
            key={item.id}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                padding: 5,
                borderBottomWidth: 1,
              }}
              onPress={() => {
                if (item.id === gameExpanded) {
                  setGameExpanded(0)
                } else {
                  setGameExpanded(item.id)
                }
              }}
            >
              {item.name}
            </Text>
            {gameExpanded === item.id ? (
              <GameDisplayer players={item.players}></GameDisplayer>
            ) : null}
            <View style={{ display: "flex", flexDirection: "row" }}>
              <TouchableOpacity
                style={{ ...styles.buttonTouchable, width: "45%" }}
                onPress={() => {
                  console.log(item)
                  game.setGame(item)
                  game.setPlayers(item.players)
                  game.setOptions(item.option)
                  navigation.pop()
                  navigation.replace("CreatePlayer")
                }}
              >
                <Text style={styles.buttonText}>Continue</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ ...styles.buttonTouchable, width: "45%" }}
                onPress={async () => {
                  await game.apiClient.deleteGame(
                    game.token,
                    item.id.toString()
                  )
                  setGames(await game.apiClient.listGames(game.token))
                }}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  )
}

interface GameDisplayerProps {
  players: Player[]
}

const GameDisplayer: FunctionComponent<GameDisplayerProps> = ({
  players,
}: GameDisplayerProps) => {
  return (
    <View>
      {players.map((value) => (
        <Text
          key={value.id}
          style={{
            fontSize: 14,
            padding: 5,
          }}
        >
          {value.name} : {value.score}
        </Text>
      ))}
    </View>
  )
}
