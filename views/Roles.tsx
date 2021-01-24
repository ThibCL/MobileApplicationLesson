import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react"
import { View, Text, Switch } from "react-native"
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

    console.log(playersUpdated)
    game.setPlayers(playersUpdated)
  }

  useEffect(() => {
    distributeRoles()
  }, [])

  return (
    <View style={{ ...styles.container, ...styles.view }}>
      <View
        style={{
          width: "80%",
          borderWidth: 1,
          backgroundColor: "#CCCCCC",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            borderBottomWidth: 1,
          }}
        >
          <Text style={{ ...styles.title, flex: 1 }}>
            {game.players[index].name}
          </Text>
          <Switch
            style={{ flex: 1 }}
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
      </View>
      <View
        style={{
          width: "80%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          disabled={index <= 0}
          style={{
            ...(index <= 0
              ? styles.buttonTouchableDisabled
              : styles.buttonTouchable),
            width: "100%",
          }}
          onPress={() => {
            setIsEnabled(false)
            setIndex(index - 1)
          }}
        >
          <Text style={{ ...styles.buttonText }}>Prievous</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles.buttonTouchable, width: "100%" }}
          onPress={() => {
            if (index < game.players.length - 1) {
              setIsEnabled(false)
              setIndex(index + 1)
            } else {
              game.setWord(words[wordSelected])
              game.setWordFound(false)
              navigation.replace("Timer")
            }
          }}
        >
          <Text style={styles.buttonText}>
            {index < game.players.length - 1 ? "Next" : "Begin"}
          </Text>
        </TouchableOpacity>
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
    <View style={{ alignItems: "center" }}>
      <Text style={{ fontSize: 20, color: "black" }}>{player.role}</Text>

      {player.role === Role.Master
        ? words.map((word, index) => (
            <TouchableOpacity
              key={index}
              style={{
                ...(index === wordSelected
                  ? styles.buttonTouchable
                  : styles.buttonTouchableDisabled),
              }}
              disabled={index === wordSelected}
              onPress={() => {
                setWordSelected(index)
              }}
            >
              <Text style={{ ...styles.buttonText }}>{word.toUpperCase()}</Text>
            </TouchableOpacity>
          ))
        : null}

      {player.role === Role.Traitor ? <Text>{words[wordSelected]}</Text> : null}
    </View>
  )
}
