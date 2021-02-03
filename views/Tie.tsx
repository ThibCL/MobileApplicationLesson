import React, { FunctionComponent, useContext, useState } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { StackNavigationProp } from "@react-navigation/stack"
import { StackParamList } from "../App"
import { GameContext, Player } from "../GameContext"
import { styles } from "../generalStyle"

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
                ? styles.buttonTouchable
                : styles.buttonTouchableDisabled
            }
            disabled={index === playerSelected}
            onPress={() => {
              setPlayerSelected(index)
            }}
          >
            <Text style={styles.buttonText}>{listPlayers[player].name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ flex: 3 }}>
        {playerSelected != undefined ? (
          <TouchableOpacity
            style={{
              ...styles.buttonTouchable,
              backgroundColor: "pink",
              flex: 3,
              borderTopRightRadius: 0,
              borderBottomLeftRadius: 0,
            }}
            onPress={() => {
              game.setPlayersElected([game.playersElected[playerSelected]])
              navigation.replace("RecapVotes")
            }}
          >
            <Text style={{ ...styles.buttonText, color: "#338A3E" }}>
              Confirm
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
      <View
        style={{
          backgroundColor: "#004d40",
          flex: 1,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            color: "white",
            textAlign: "center",
          }}
        >
          Insider Online boardgame
        </Text>
      </View>
    </View>
  )
}
