import React, { FunctionComponent, useContext, useState } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { StackNavigationProp } from "@react-navigation/stack"
import { StackParamList } from "../App"
import { GameContext, Player } from "../GameContext"
import { styles } from "../generalStyle"
import { Footer } from "../components/Footer"

type ScreenNavigationProp = StackNavigationProp<StackParamList, "Tie">

interface TieProps {
  navigation: ScreenNavigationProp
}

export const Tie: FunctionComponent<TieProps> = ({ navigation }: TieProps) => {
  const game = useContext(GameContext)
  const [playerSelected, setPlayerSelected] = useState<number>()
  const [listPlayers, setListPlayers] = useState<Player[]>(game.players)
  const [playersElected, setPlayersElected] = useState<number[]>(
    game.playersElected
  )

  return (
    <View style={{ ...styles.container, flexDirection: "column" }}>
      <View style={{ flex: 1, justifyContent: "center", padding: 5 }}>
        <Text
          style={{
            ...styles.title,
            backgroundColor: "#004d40",
            borderRadius: 50,
            color: "white",
            textAlignVertical: "center",
            textAlign: "center",
          }}
        >
          {listPlayers[0].name}
        </Text>
      </View>

      <View
        style={{ flex: 7, borderWidth: 3, borderColor: "#004d40", margin: 5 }}
      >
        <Text
          style={{
            textAlign: "center",
            textAlignVertical: "center",
            color: "#004d40",
            fontWeight: "bold",
            margin: 10,
          }}
        >
          There is a tie, you have to vote
        </Text>
        {playersElected.map((player, index) => (
          <TouchableOpacity
            key={index}
            style={
              index === playerSelected
                ? styles.buttonVote
                : styles.buttonVoteDisabled
            }
            disabled={index === playerSelected}
            onPress={() => {
              setPlayerSelected(index)
            }}
          >
            <Text
              style={{
                ...styles.buttonTextPink,
                color: index === playerSelected ? "#dcbeba" : "white",
              }}
            >
              {listPlayers[player].name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ flex: 3, justifyContent: "center", margin: 10 }}>
        {playerSelected != undefined ? (
          <TouchableOpacity
            style={{
              ...styles.leafButtonPink,
            }}
            onPress={() => {
              game.setPlayersElected([game.playersElected[playerSelected]])
              navigation.replace("RecapVotes")
            }}
          >
            <Text style={{ ...styles.buttonTextGreen }}>Confirm</Text>
          </TouchableOpacity>
        ) : null}
      </View>
      <Footer />
    </View>
  )
}
