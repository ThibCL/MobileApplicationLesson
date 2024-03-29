import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react"
import { View, Text, TouchableOpacity, FlatList } from "react-native"
import { StackNavigationProp } from "@react-navigation/stack"
import { StackParamList } from "../App"
import { styles } from "../generalStyle"
import { GameContext, Player, Role } from "../GameContext"
import { Footer } from "../components/Footer"
import Icon from "react-native-vector-icons/Entypo"

type ScreenNavigationProp = StackNavigationProp<StackParamList, "RecapVotes">

interface RecapVotesProps {
  navigation: ScreenNavigationProp
}

export const RecapVotes: FunctionComponent<RecapVotesProps> = ({
  navigation,
}: RecapVotesProps) => {
  const game = useContext(GameContext)

  const [listPlayers, setListPlayers] = useState<Player[]>(game.players)
  const [numVote, setNumVote] = useState<Array<number>>([])
  useEffect(() => {
    const numVote: Array<number> = []
    for (let i = 0; i < game.players.length; i++) {
      numVote[i] = 0
    }
    game.players.forEach((elem) => {
      numVote[elem.vote || 0] += 1
    })
    setNumVote(numVote)
  }, [])

  return (
    <View
      style={{
        ...styles.container,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <View style={{ flex: 1 }}></View>
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
                flexDirection: "column",
              }}
            >
              <View
                style={{
                  backgroundColor: "#004d40",
                  margin: 5,
                  borderRadius: 50,
                  flex: 1,
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                {item.role === Role.Traitor ? (
                  <Icon
                    style={{ margin: 5, alignSelf: "center", flex: 1 }}
                    name="mask"
                    color="white"
                    size={20}
                  />
                ) : null}
                {index === game.playersElected[0] ? (
                  <Icon
                    style={{ margin: 5, alignSelf: "center", flex: 1 }}
                    name="remove-user"
                    color="white"
                    size={20}
                  />
                ) : null}
                <Text
                  style={{
                    flex: 10,
                    textAlign: "center",
                    textAlignVertical: "center",
                    fontSize: 20,
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  {item.name}
                </Text>
              </View>
              <Text
                style={{
                  flex: 1,
                  textAlign: "center",
                  textAlignVertical: "center",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                {item.role === Role.Master
                  ? " You were the Master"
                  : " " + numVote[index] + " player(s) voted for you"}
              </Text>
            </View>
          )}
        />
      </View>

      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={{
            ...styles.leafButtonPink,
            flex: 3,
          }}
          onPress={() => {
            navigation.replace("Score")
          }}
        >
          <Text style={{ ...styles.buttonTextGreen }}>Next </Text>
        </TouchableOpacity>
      </View>

      <Footer />
    </View>
  )
}
