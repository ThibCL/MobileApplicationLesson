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
    randomWords(game.options.number_choices)
  )
  const [wordSelected, setWordSelected] = useState<number>(0)
  const [index, setIndex] = useState<number>(0)
  const [isEnabled, setIsEnabled] = useState<boolean>(false)
  const [listPlayers, setListPlayers] = useState<Player[]>(game.players)

  const distributeRoles = () => {
    let masterIndex = 0
    let roles: Role[] = Array(listPlayers.length).fill(Role.Citizen)
    let total = 0
    for (let dist of distribution) {
      roles.fill(dist.role, total, total + dist.number)
      total += dist.number
    }

    const playersUpdated = [...listPlayers]
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

    setListPlayers(playersUpdated)
  }

  useEffect(() => {
    distributeRoles()
  }, [])

  return (
    <View
      style={{
        ...styles.container,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
      }}
    >
      <View
        style={{
          flex: 1,
          alignSelf: "center",
          justifyContent: "center",
          width: "95%",
        }}
      >
        <View
          style={{
            borderRadius: 50,
            borderWidth: 1,
            backgroundColor: "#004d40",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              ...styles.title,
              textAlign: "center",
              color: "white",
              flex: 1,
            }}
          >
            {listPlayers[index].name}
          </Text>
          <Switch
            style={{ flex: 1 }}
            onValueChange={() => {
              setIsEnabled(!isEnabled)
            }}
            value={isEnabled}
          />
        </View>
      </View>
      <View style={{ flex: 7 }}>
        {isEnabled ? (
          <RoleDisplayer
            player={listPlayers[index]}
            words={words}
            wordSelected={wordSelected}
            setWordSelected={setWordSelected}
          />
        ) : null}
      </View>
      <View
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <TouchableOpacity
          disabled={index <= 0}
          style={{
            ...(index <= 0
              ? styles.buttonTouchableDisabled
              : styles.buttonTouchable),
            flex: 1,
          }}
          onPress={() => {
            setIsEnabled(false)
            setIndex(index - 1)
          }}
        >
          <Text style={{ ...styles.buttonText }}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles.buttonTouchable, flex: 1 }}
          onPress={() => {
            if (index < listPlayers.length - 1) {
              setIsEnabled(false)
              setIndex(index + 1)
            } else {
              game.setWord(words[wordSelected])
              game.setWordFound(false)
              game.setPlayers(listPlayers)
              navigation.replace("Timer")
            }
          }}
        >
          <Text style={styles.buttonText}>
            {index < listPlayers.length - 1 ? "Next" : "Begin"}
          </Text>
        </TouchableOpacity>
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
    <View
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        borderWidth: 5,
        margin: 5,
      }}
    >
      <Text
        style={{ fontSize: 20, color: "#004d40", textAlign: "center", flex: 1 }}
      >
        During the game, your role will be:
      </Text>
      <Text
        style={{
          fontSize: 20,
          color: "pink",
          fontWeight: "bold",
          textAlign: "center",
          flex: 1,
        }}
      >
        {player.role}
      </Text>

      {player.role === Role.Master ? (
        <View style={{ flex: 5, display: "flex", flexDirection: "column" }}>
          <Text
            style={{
              fontSize: 20,
              color: "#004d40",
              textAlign: "center",
              flex: 1,
            }}
          >
            So, you can choose the word between:
          </Text>
          <View
            style={{
              flex: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {words.map((word, index) => (
              <Text
                key={index}
                style={
                  index === wordSelected
                    ? {
                        textAlign: "center",
                        flex: 2,
                        fontSize: 25,
                        fontWeight: "bold",
                        color: "#004d40",
                      }
                    : {
                        textAlign: "center",
                        flex: 2,
                        fontSize: 20,
                        fontWeight: "bold",
                        color: "pink",
                      }
                }
                onPress={() => {
                  setWordSelected(index)
                }}
              >
                {word.toUpperCase()}
              </Text>
            ))}
          </View>
        </View>
      ) : null}

      {player.role === Role.Traitor ? (
        <View style={{ flex: 3 }}>
          <Text style={{ fontSize: 20, textAlign: "center", color: "#004d40" }}>
            The master choose the following word:
          </Text>
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
              fontWeight: "bold",
              color: "pink",
            }}
          >
            {words[wordSelected]}
          </Text>
          <Text style={{ fontSize: 20, textAlign: "center", color: "#004d40" }}>
            No one must know that you are the traitor!
          </Text>
        </View>
      ) : null}

      {player.role === Role.Citizen ? (
        <View style={{ flex: 3 }}>
          <Text style={{ fontSize: 20, textAlign: "center", color: "#004d40" }}>
            During the game you will have to ask questions to find the Master's
            word, and tries to unmask the traitor!
          </Text>
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
              fontWeight: "bold",
              color: "pink",
            }}
          >
            HAVE FUN !
          </Text>
        </View>
      ) : null}
    </View>
  )
}
