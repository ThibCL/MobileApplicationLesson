import React, { FunctionComponent, useContext, useState } from "react"
import { View, Text, TouchableOpacity, Button, FlatList } from "react-native"
import { StackNavigationProp } from "@react-navigation/stack"
import { StackParamList } from "../App"
import { GameContext, Player } from "../GameContext"
import { styles } from "../generalStyle"
import Icon from "react-native-vector-icons/Entypo"

type ScreenNavigationProp = StackNavigationProp<StackParamList, "Votes">

interface VotesProps {
  navigation: ScreenNavigationProp
}

export const Votes: FunctionComponent<VotesProps> = ({
  navigation,
}: VotesProps) => {
  const game = useContext(GameContext)
  const [listPlayers, setListPlayers] = useState<Player[]>(game.players)
  const [playerIndex, setPlayerIndex] = useState<number>(0)
  const [playerSelected, setPlayerSelected] = useState<number>()

  const checkTie = (): number[] => {
    const vote = new Map<number, number>()
    for (let player of listPlayers) {
      let voteCount: number | undefined
      if (player.vote != undefined) {
        voteCount = vote.get(player.vote)

        if (voteCount) {
          vote.set(player.vote, voteCount + 1)
        } else {
          vote.set(player.vote, 1)
        }
      }
    }

    let maxVote = 0
    let playersElected: number[] = []
    for (let [player, count] of vote) {
      if (count > maxVote) {
        playersElected = [player]
        maxVote = count
      } else if (count === maxVote) {
        playersElected.push(player)
      }
    }
    return playersElected
  }

  return (
    <View
      style={{ ...styles.container, display: "flex", flexDirection: "column" }}
    >
      <View style={{ justifyContent: "center", flex: 2 }}>
        <Text
          style={{
            ...styles.title,
            textAlign: "center",
            textAlignVertical: "center",
            color: "white",
            margin: 10,
            backgroundColor: "#004d40",
            borderRadius: 50,
          }}
        >
          {listPlayers[playerIndex].name}
          <Icon name="flashlight" size={20} color="white" />
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
          Who do you think is the traitor?
        </Text>
        <FlatList
          keyExtractor={(item, value) => {
            return item.id?.toString() || ""
          }}
          data={listPlayers}
          renderItem={({ item, index }) =>
            index != 0 && index != playerIndex ? (
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
                <Text style={styles.buttonText}>{item.name}</Text>
              </TouchableOpacity>
            ) : null
          }
        />
      </View>

      {playerSelected === undefined ? null : (
        <TouchableOpacity
          style={{
            ...styles.buttonTouchable,
            backgroundColor: "pink",
            flex: 3,
            borderTopRightRadius: 0,
            borderBottomLeftRadius: 0,
          }}
          onPress={() => {
            let updatedPlayers = [...listPlayers]
            updatedPlayers[playerIndex].vote = playerSelected
            setListPlayers(updatedPlayers)
            if (playerIndex < listPlayers.length - 1) {
              setPlayerSelected(undefined)
              setPlayerIndex(playerIndex + 1)
            } else {
              let playersElected = checkTie()
              game.setPlayersElected(playersElected)
              game.setPlayers(listPlayers)

              if (playersElected.length === 1) {
                navigation.replace("RecapVotes")
              } else {
                navigation.replace("Tie")
              }
            }
          }}
        >
          <Text style={{ ...styles.buttonText, color: "#004d40" }}>
            That is my final answer!
          </Text>
        </TouchableOpacity>
      )}
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
