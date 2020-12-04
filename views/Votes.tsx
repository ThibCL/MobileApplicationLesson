import React, { FunctionComponent, useContext, useState } from "react"
import { View, Text, TouchableOpacity, Button } from "react-native"
import { StackNavigationProp } from "@react-navigation/stack"
import { StackParamList } from "../App"
import { GameContext, Player, Role } from "../GameContext"
import { styles } from "../generalStyle"
import { NavigationContainer } from "@react-navigation/native"

type ScreenNavigationProp = StackNavigationProp<StackParamList, "Votes">

interface VotesProps {
  navigation: ScreenNavigationProp
}

export const Votes: FunctionComponent<VotesProps> = ({
  navigation,
}: VotesProps) => {
  const [votesDone, setVotesDone] = useState<boolean>(false)
  return (
    <View>
      {!votesDone ? (
        <FirstVotes setVotesDone={setVotesDone} />
      ) : (
        <TieVotes navigation={navigation}></TieVotes>
      )}
    </View>
  )
}

interface FirstVotesProps {
  setVotesDone: (votesDone: boolean) => void
}

const FirstVotes: FunctionComponent<FirstVotesProps> = ({
  setVotesDone,
}: FirstVotesProps) => {
  const game = useContext(GameContext)
  const [playerIndex, setPlayerIndex] = useState<number>(0)
  const [playerSelected, setPlayerSelected] = useState<Player>()

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
              setVotesDone(true)
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

interface TieVotesProps {
  navigation: ScreenNavigationProp
}

const TieVotes: FunctionComponent<TieVotesProps> = ({
  navigation,
}: TieVotesProps) => {
  const game = useContext(GameContext)

  const checkTie = () => {
    const vote = new Map<string, number>()
    for (let player of game.players) {
      let voteCount: number | undefined
      if (player.vote) {
        console.log(player.vote)
        voteCount = vote.get(player.vote.name)

        if (voteCount) {
          vote.set(player.vote.name, voteCount + 1)
        } else {
          vote.set(player.vote.name, 1)
        }
      }
    }
    console.log(vote)
  }
  checkTie()

  return (
    <View>
      <Text>Test</Text>
      <Button
        title="goback"
        onPress={() => {
          navigation.replace("Roles")
        }}
      />
    </View>
  )
}
