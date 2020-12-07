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
  const [playerIndex, setPlayerIndex] = useState<number>(0)
  const [playerSelected, setPlayerSelected] = useState<Player>()

  const checkTie = (): Player[] => {
    const vote = new Map<Player, number>()
    for (let player of game.players) {
      let voteCount: number | undefined
      if (player.vote) {
        voteCount = vote.get(player.vote)

        if (voteCount) {
          vote.set(player.vote, voteCount + 1)
        } else {
          vote.set(player.vote, 1)
        }
      }
    }

    let maxVote = 0
    let playersElected: Player[] = []
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
    <View>
      <Text style={styles.title}>{game.players[playerIndex].name}</Text>

      {game.players
        .filter((_player, index) => {
          return index != 0 && index != playerIndex
        })
        .map((player, index) => (
          <TouchableOpacity
            key={index}
            style={
              player === playerSelected
                ? styles.buttonTouchable
                : styles.buttonTouchableDisabled
            }
            disabled={player === playerSelected}
            onPress={() => {
              setPlayerSelected(player)
            }}
          >
            <Text style={styles.buttonText}>{player.name}</Text>
          </TouchableOpacity>
        ))}

      {playerSelected === undefined ? null : (
        <TouchableOpacity
          style={{ ...styles.buttonTouchable, backgroundColor: "white" }}
          onPress={() => {
            let updatedPlayers = [...game.players]
            updatedPlayers[playerIndex].vote = playerSelected
            game.setPlayers(updatedPlayers)
            if (playerIndex < game.players.length - 1) {
              setPlayerSelected(undefined)
              setPlayerIndex(playerIndex + 1)
            } else {
              let playersElected = checkTie()

              if (playersElected.length === 1) {
                navigation.replace("Home") //, playersElected[0])
              } else {
                navigation.replace("Tie", playersElected)
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
