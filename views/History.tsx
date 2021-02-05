import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react"
import { View, Text, FlatList, TouchableOpacity } from "react-native"
import Icon from "react-native-vector-icons/AntDesign"
import { StackNavigationProp } from "@react-navigation/stack"
import { StackParamList } from "../App"
import { GameContext, Options, Player } from "../GameContext"
import { styles } from "../generalStyle"
import { Footer } from "../components/Footer"

type ScreenNavigationProp = StackNavigationProp<StackParamList, "History">

interface HistoryProps {
  navigation: ScreenNavigationProp
}

export const History: FunctionComponent<HistoryProps> = ({
  navigation,
}: HistoryProps) => {
  const game = useContext(GameContext)
  const [loading, setLoading] = useState<boolean>(true)
  const [games, setGames] = useState<
    {
      id: number
      name: string
      finished: boolean
      players: Player[]
      option: Options
    }[]
  >([])
  const [gameExpanded, setGameExpanded] = useState<number>(0)

  const getGames = async () => {
    setLoading(true)
    const listGames = await game.apiClient.listGames(game.token)
    setGames(listGames)
    setLoading(false)
  }

  useEffect(() => {
    getGames()
  }, [])

  return (
    <View
      style={{ ...styles.container, display: "flex", flexDirection: "column" }}
    >
      <View style={{ flex: 9 }}>
        <FlatList
          keyExtractor={(item) => {
            return item.id.toString()
          }}
          onRefresh={async () => {
            await getGames()
          }}
          refreshing={loading}
          data={games}
          renderItem={({ item }) => (
            <View
              style={{
                display: "flex",
              }}
            >
              <TouchableOpacity
                style={{ ...styles.buttonVote }}
                activeOpacity={1.0}
                onPress={() => {
                  if (item.id === gameExpanded) {
                    setGameExpanded(0)
                  } else {
                    setGameExpanded(item.id)
                  }
                }}
              >
                <View
                  style={{
                    padding: 5,
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Text
                    style={{
                      ...styles.buttonTextGreen,
                      color: "white",
                      margin: 0,
                      padding: 0,
                      flex: 3,
                    }}
                  >
                    {item.name}
                  </Text>

                  <View
                    style={{
                      ...styles.buttonVote,
                      backgroundColor: item.finished ? "#dcbeba" : "#004d40",
                      flex: 2,
                    }}
                  >
                    {item.finished ? (
                      <Text
                        style={{
                          ...styles.buttonTextGreen,
                          fontSize: 12,
                        }}
                      >
                        FINISHED
                      </Text>
                    ) : null}
                  </View>

                  <View
                    style={{
                      flex: 1,
                      alignItems: "flex-end",
                      justifyContent: "center",
                    }}
                  >
                    {gameExpanded === item.id ? (
                      <Icon name="down" size={25} color="white" />
                    ) : (
                      <Icon name="left" size={25} color="white" />
                    )}
                  </View>
                </View>
              </TouchableOpacity>

              {gameExpanded === item.id ? (
                <GameDisplayer players={item.players}></GameDisplayer>
              ) : null}
              <View style={{ display: "flex", flexDirection: "row" }}>
                <TouchableOpacity
                  style={{
                    ...styles.buttonVote,
                    backgroundColor: "transparent",
                    borderWidth: 2,
                    borderColor: "#004d40",
                    flex: 1,
                  }}
                  onPress={() => {
                    if (item.finished) {
                      game.newGame(item, item.players, item.option)
                    } else {
                      game.setGame(item)
                      game.setPlayers(item.players)
                      game.setOptions(item.option)
                    }
                    navigation.pop()
                    navigation.replace("CreatePlayer")
                  }}
                >
                  <Text style={styles.buttonTextGreen}>
                    {item.finished ? "New game" : "Continue"}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    ...styles.buttonVote,
                    backgroundColor: "transparent",
                    borderWidth: 2,
                    borderColor: "#004d40",
                    flex: 1,
                  }}
                  onPress={async () => {
                    await game.apiClient.deleteGame(
                      game.token,
                      item.id.toString()
                    )
                    setGames(await game.apiClient.listGames(game.token))
                  }}
                >
                  <Text style={styles.buttonTextGreen}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
      <Footer />
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
    <View style={{ borderWidth: 3, borderColor: "#004d40", margin: 5 }}>
      {players.map((value) => (
        <Text
          key={value.id?.toString()}
          style={{
            ...styles.buttonTextGreen,
          }}
        >
          {value.name} : {value.score}
        </Text>
      ))}
    </View>
  )
}
