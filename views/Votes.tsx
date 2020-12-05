import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react"
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
        <TieVotes navigation={navigation} />
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
  const [playerSelected, setPlayerSelected] = useState<string>("")

  const checkTie = (): string[] => {
    const vote = new Map<string, number>()
    for (let player of game.players) {
      let voteCount: number | undefined
      if (player.vote) {
        voteCount = vote.get(player.vote.name)

        if (voteCount) {
          vote.set(player.vote.name, voteCount + 1)
        } else {
          vote.set(player.vote.name, 1)
        }
      }
    }

    let maxVote = 0
    let playersElected = []
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

  const playersElected = checkTie()

  return (
    <View style={styles.container}>
      {playersElected.length === 1 ? navigation.replace("Home") : null}
      <Text style={styles.title}>{game.players[0].name}</Text>
      <Text>There is a tie, you have to vote</Text>
      {playersElected.map((player) => (
        <TouchableOpacity
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
          <Text style={styles.buttonText}>{player}</Text>
        </TouchableOpacity>
      ))}
      {playerSelected === "" ? null : (
        <TouchableOpacity
          style={{ ...styles.buttonTouchable, backgroundColor: "white" }}
          onPress={() => {
            navigation.replace("Home")
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
