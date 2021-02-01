import React, { FunctionComponent, useContext, useState } from "react"
import { View, Text, TouchableOpacity, Button } from "react-native"
import { StackNavigationProp } from "@react-navigation/stack"
import { StackParamList } from "../App"
import { GameContext, Player } from "../GameContext"
import { styles } from "../generalStyle"

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
    <View style={{ ...styles.container, ...styles.view }}>
      <Text style={styles.title}>{listPlayers[playerIndex].name}</Text>

      {listPlayers.map((player, index) =>
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
            <Text style={styles.buttonText}>{player.name}</Text>
          </TouchableOpacity>
        ) : null
      )}

      {playerSelected === undefined ? null : (
        <TouchableOpacity
          style={{ ...styles.buttonTouchable, backgroundColor: "white" }}
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
          <Text style={{ ...styles.buttonText, color: "#338A3E" }}>
            Confirm
          </Text>
        </TouchableOpacity>
      )}
    </View>
  )
}
