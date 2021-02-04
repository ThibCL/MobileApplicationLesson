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
import { Footer } from "../components/Footer"
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
        flex: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <View
        style={{
          flex: 2,
          justifyContent: "center",
          margin: 5,
        }}
      >
        <View
          style={{
            borderRadius: 50,
            backgroundColor: "#004d40",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
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
            trackColor={{ true: "white", false: "grey" }}
            thumbColor="pink"
            onValueChange={() => {
              setIsEnabled(!isEnabled)
            }}
            value={isEnabled}
          />
        </View>
      </View>

      <View style={{ flex: 8 }}>
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
          flex: 2,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <View style={{ flex: 1, justifyContent: "center" }}>
          <TouchableOpacity
            disabled={index <= 0}
            style={{
              ...styles.arrowLeftButton,
              backgroundColor: index <= 0 ? "grey" : "pink",
            }}
            onPress={() => {
              setIsEnabled(false)
              setIndex(index - 1)
            }}
          >
            <Text style={{ ...styles.buttonTextGreen }}>PREVIOUS</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1, justifyContent: "center" }}>
          <TouchableOpacity
            style={{ ...styles.arrowRightButton }}
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
            <Text style={styles.buttonTextGreen}>
              {index < listPlayers.length - 1 ? "NEXT" : "BEGIN"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Footer />
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
        borderColor: "#004d40",
        margin: 5,
      }}
    >
      <Text
        style={{ fontSize: 20, color: "#004d40", textAlign: "center", flex: 1 }}
      >
        During the game, your will be:
      </Text>
      <Text
        style={{
          fontSize: 20,
          color: "pink",
          fontWeight: "bold",
          textAlign: "center",
          textAlignVertical: "center",
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
                        fontSize: 20,
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
