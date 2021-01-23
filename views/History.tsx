import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react"
import { View, Text, FlatList, TouchableOpacity } from "react-native"
import { StackNavigationProp } from "@react-navigation/stack"
import { StackParamList } from "../App"
import { GameContext, Player } from "../GameContext"
import { styles } from "../generalStyle"

type ScreenNavigationProp = StackNavigationProp<StackParamList, "History">

interface HistoryProps {
  navigation: ScreenNavigationProp
}

export const History: FunctionComponent<HistoryProps> = ({
  navigation,
}: HistoryProps) => {
  const game = useContext(GameContext)
  const [games, setGames] = useState<{ id: number; players: Player[] }[]>([])

  const getGames = async () => {
    const listGames = await game.apiClient.listGames(game.token)
    console.log(listGames)
    setGames(listGames)
  }

  useEffect(() => {
    getGames()
  }, [])

  return (
    <View style={{ ...styles.container, alignItems: "center" }}>
      <FlatList
        ListHeaderComponent={
          <Text style={{ ...styles.title, color: "black" }}>
            Previous games
          </Text>
        }
        data={games}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity
              style={styles.buttonTouchable}
              onPress={async () => {
                game.setGameId(item.id)
                game.setPlayers(item.players)
                navigation.pop()
                navigation.replace("CreatePlayer")
              }}
            >
              <View>
                <Text style={styles.buttonText}>{item.id}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonTouchable}
              onPress={async () => {
                await game.apiClient.deleteGame(game.token, item.id.toString())
                setGames(await game.apiClient.listGames(game.token))
              }}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  )
}
