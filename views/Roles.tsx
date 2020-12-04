import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react"
import { View, Text, Switch, Button } from "react-native"
import { StackNavigationProp } from "@react-navigation/stack"
import { StackParamList } from "../App"
import { GameContext, Player, Role } from "../GameContext"
import { styles } from "../generalStyle"
import { TouchableOpacity } from "react-native-gesture-handler"
var randomWords = require("random-words")

type ScreenNavigationProp = StackNavigationProp<StackParamList, "Roles">

const distribution: { role: Role; number: number }[] = [
  { role: Role.Master, number: 1 },
  { role: Role.Traitor, number: 1 },
]

interface RolesProps {
  navigation: ScreenNavigationProp
}

export const Roles: FunctionComponent<RolesProps> = ({
  navigation,
}: RolesProps) => {
  const game = useContext(GameContext)

  const [words, setWords] = useState<string[]>(
    randomWords(game.options.numberChoices)
  )
  const [wordSelected, setWordSelected] = useState<number>(0)
  const [index, setIndex] = useState<number>(0)
  const [isEnabled, setIsEnabled] = useState<boolean>(false)

  const distributeRoles = () => {
    let masterIndex = 0
    let roles: Role[] = Array(game.players.length).fill(Role.Citizen)
    let total = 0
    for (let dist of distribution) {
      roles.fill(dist.role, total, total + dist.number)
      total += dist.number
    }

    const playersUpdated = [...game.players]
    for (let i = 0; i < playersUpdated.length; i++) {
      let rd = Math.floor(roles.length * Math.random())
      let role = roles.splice(rd, 1)[0]
      playersUpdated[i].role = role

      if (role === Role.Master) {
        masterIndex = i
      }
    }

    const mstr = playersUpdated[masterIndex]
    playersUpdated[masterIndex] = playersUpdated[0]
    playersUpdated[0] = mstr

    game.setPlayers(playersUpdated)
  }

  useEffect(() => {
    distributeRoles()
  }, [])

  return (
    <View style={styles.container}>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Text style={styles.title}>{game.players[index].name}</Text>
        <Switch
          onValueChange={() => {
            setIsEnabled(!isEnabled)
          }}
          value={isEnabled}
        />
      </View>
      {isEnabled ? (
        <RoleDisplayer
          player={game.players[index]}
          words={words}
          wordSelected={wordSelected}
          setWordSelected={setWordSelected}
        />
      ) : null}

      <View style={{ display: "flex", flexDirection: "row" }}>
        <TouchableOpacity
          disabled={index <= 0}
          style={{
            ...(index <= 0
              ? styles.buttonTouchableDisabled
              : styles.buttonTouchable),
          }}
          onPress={() => {
            setIsEnabled(false)
            setIndex(index - 1)
          }}
        >
          <Text style={styles.buttonText}>Prievous</Text>
        </TouchableOpacity>
        {index < game.players.length - 1 ? (
          <TouchableOpacity
            style={{ ...styles.buttonTouchable }}
            onPress={() => {
              setIsEnabled(false)
              setIndex(index + 1)
            }}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{ ...styles.buttonTouchable }}
            onPress={() => {
              game.setWord(words[wordSelected])
              navigation.replace("Votes")
            }}
          >
            <Text style={styles.buttonText}>Begin</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

interface RoleDisplayerProps {
  player: Player
  words: string[]
  wordSelected: number
  setWordSelected: (index: number) => void
}

const RoleDisplayer: FunctionComponent<RoleDisplayerProps> = ({
  player,
  words,
  wordSelected,
  setWordSelected,
}: RoleDisplayerProps) => {
  return (
    <View>
      <Text>{player.role}</Text>

      {player.role === Role.Master
        ? words.map((word, index) => (
            <TouchableOpacity
              key={index}
              style={
                index === wordSelected
                  ? styles.buttonTouchable
                  : styles.buttonTouchableDisabled
              }
              disabled={index === wordSelected}
              onPress={() => {
                setWordSelected(index)
              }}
            >
              <Text style={styles.buttonText}>{word}</Text>
            </TouchableOpacity>
          ))
        : null}

      {player.role === Role.Traitor ? <Text>{words[wordSelected]}</Text> : null}
    </View>
  )
}
