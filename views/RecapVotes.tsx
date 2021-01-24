import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { StackNavigationProp } from "@react-navigation/stack"
import { StackParamList } from "../App"
import { styles } from "../generalStyle"
import { GameContext, Role } from "../GameContext"

type ScreenNavigationProp = StackNavigationProp<StackParamList, "RecapVotes">

interface RecapVotesProps {
  navigation: ScreenNavigationProp
}

export const RecapVotes: FunctionComponent<RecapVotesProps> = ({
  navigation,
}: RecapVotesProps) => {
  const game = useContext(GameContext)
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
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {game.players.map((elem, index) => (
        <Text
          key={index}
          style={{
            fontSize: 22,
            margin: 7,
            textAlign: "center",
            flex: 1,
          }}
        >
          <Text
            style={{
              color: elem.role == Role.Traitor ? "red" : "green",
            }}
          >
            {elem.name}
          </Text>
          {elem.role === Role.Master
            ? " You were the Master"
            : " " + numVote[index] + " player(s) voted for you"}
        </Text>
      ))}
      <TouchableOpacity
        style={{ ...styles.buttonTouchable }}
        onPress={() => {
          navigation.replace("Score")
        }}
      >
        <Text style={{ ...styles.buttonText }}>Next </Text>
      </TouchableOpacity>
    </View>
  )
}
