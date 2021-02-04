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
    <View style={{ ...styles.container }}>
      <FlatList
        keyExtractor={(item) => {
          return item.id.toString()
        }}
        ListHeaderComponent={
          <Text style={{ ...styles.title, color: "black" }}>
            Previous games
          </Text>
        }
        ListEmptyComponent={<Text>You have no previous game</Text>}
        onRefresh={async () => {
          await getGames()
        }}
        refreshing={loading}
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
          >
            <TouchableOpacity
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
                  borderBottomWidth: 1,
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: "bold", flex: 3 }}>
                  {item.name}
                </Text>
                {item.finished ? (
                  <Text
                    style={{
                      flex: 1,
                      textAlign: "center",
                      color: "grey",
                      borderWidth: 1,
                      borderColor: "grey",
                      borderRadius: 10,
                      backgroundColor: "lightgrey",
                    }}
                  >
                    Finished
                  </Text>
                ) : null}
                {gameExpanded === item.id ? (
                  <Icon name="down" size={20} />
                ) : (
                  <Icon name="left" size={20} />
                )}
              </View>
            </TouchableOpacity>

            {gameExpanded === item.id ? (
              <GameDisplayer players={item.players}></GameDisplayer>
            ) : null}
            <View style={{ display: "flex", flexDirection: "row" }}>
              <TouchableOpacity
                style={{
                  ...styles.buttonVote,
                  width: "45%",
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
                <Text style={styles.buttonTextPink}>
                  {item.finished ? "New game" : "Continue"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ ...styles.buttonVote, width: "45%" }}
                onPress={async () => {
                  await game.apiClient.deleteGame(
                    game.token,
                    item.id.toString()
                  )
                  setGames(await game.apiClient.listGames(game.token))
                }}
              >
                <Text style={styles.buttonTextPink}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
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
    <View>
      {players.map((value) => (
        <Text
          key={value.id?.toString()}
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
