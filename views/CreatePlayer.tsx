import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react"
import { View, Text, TouchableOpacity, TextInput } from "react-native"
import { StackNavigationProp } from "@react-navigation/stack"
import { StackParamList } from "../App"
import { GameContext, Player, Role } from "../GameContext"
import { styles } from "../generalStyle"

type ScreenNavigationProp = StackNavigationProp<StackParamList, "CreatePlayer">

interface CreatePlayerProps {
  navigation: ScreenNavigationProp
}

export const CreatePlayer: FunctionComponent<CreatePlayerProps> = ({
  navigation,
}: CreatePlayerProps) => {
  const game = useContext(GameContext)

  const [gameName, setGameName] = useState<string>(game.game.name)
  const [listPlay, setListPlay] = useState<Player[]>([])

  useEffect(() => {
    if (game.players.length > 0) {
      setListPlay(game.players)
    } else {
      setListPlay([
        {
          id: undefined,
          name: "",
          score: 0,
          vote: undefined,
          scoreVar: 0,
          role: Role.Citizen,
        },
        {
          id: undefined,
          name: "",
          score: 0,
          vote: undefined,
          scoreVar: 0,
          role: Role.Citizen,
        },
        {
          id: undefined,
          name: "",
          score: 0,
          vote: undefined,
          scoreVar: 0,
          role: Role.Citizen,
        },
      ])
    }
  }, [])

  const validation = (): { different: Boolean; message: string } => {
    let i = 0
    while (i < listPlay.length - 1) {
      if (listPlay[i].name.trim() === "") {
        return {
          different: false,
          message: "All players should have a non empty name",
        }
      }

      for (let j = i + 1; j < listPlay.length; j++) {
        if (listPlay[i].name.toLowerCase() == listPlay[j].name.toLowerCase()) {
          return {
            different: false,
            message: "Two players can't have the same name",
          }
        }
      }
      i++
    }

    return { different: true, message: "" }
  }

  return (
    <View
      style={{
        ...styles.container,
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <TextInput
        style={{
          ...styles.title,
          textAlignVertical: "center",
          textAlign: "center",
          flex: 1,
        }}
        placeholder="Game name"
        onChangeText={(text) => setGameName(text)}
        value={gameName}
      />

      <TouchableOpacity
        style={styles.buttonTouchable}
        onPress={() => {
          game.setGame({ ...game.game, name: gameName })
          game.setPlayers(listPlay)
          navigation.replace("Option", { default: false })
        }}
      >
        <Text style={styles.buttonText}>Option</Text>
      </TouchableOpacity>

      <View style={{ flex: 7 }}>
        <Text
          style={{
            textAlign: "center",
            textAlignVertical: "center",
            fontSize: 16,
            fontWeight: "bold",
            color: "black",
            flex: 1,
          }}
        >
          Insert Players Names
        </Text>
        {listPlay.map((elem, index) => (
          <View
            key={index}
            style={{
              flex: 2,
              borderWidth: 1,
              borderColor: "#7F0000",
              margin: 5,
              justifyContent: "center",
              width: "90%",
              display: "flex",
              flexDirection: "row",
              backgroundColor: "#CCCCCC",
            }}
          >
            <TextInput
              style={{ flex: 3, textAlign: "center" }}
              placeholder="Name"
              onChangeText={(text) => {
                let temp = [...listPlay]
                temp[index].name = text
                setListPlay(temp)
              }}
              value={elem.name}
            />

            {listPlay.length > 3 ? (
              <Text
                style={{
                  flex: 1,
                  textAlign: "center",
                  textAlignVertical: "center",
                }}
                onPress={async () => {
                  let temporaire = [...listPlay]
                  temporaire.splice(index, 1)
                  if (elem.id != undefined) {
                    await game.apiClient.deletePlayer(
                      game.token,
                      game.game.id,
                      elem.id
                    )
                  }
                  setListPlay(temporaire)
                }}
              >
                X
              </Text>
            ) : null}
          </View>
        ))}
      </View>

      {listPlay.length < 10 ? (
        <TouchableOpacity
          style={styles.buttonTouchable}
          onPress={() => {
            setListPlay(
              listPlay.concat({
                id: undefined,
                name: "",
                score: 0,
                vote: undefined,
                scoreVar: 0,
                role: Role.Citizen,
              })
            )
          }}
        >
          <Text style={styles.buttonText}>AddPlayer</Text>
        </TouchableOpacity>
      ) : null}

      <TouchableOpacity
        style={styles.buttonTouchable}
        onPress={async () => {
          const valid = validation()
          if (valid.different) {
            const addGame = await game.apiClient.saveGame(
              game.token,
              game.game,
              listPlay,
              game.options
            )
            let gName = gameName
            if (gameName.trim() === "") {
              gName = "Game " + addGame.id
            }
            game.setGame({ id: addGame.id, name: gName })
            game.setPlayers(addGame.players)
            navigation.replace("Roles")
          } else {
            alert(valid.message)
          }
        }}
      >
        <Text style={styles.buttonText}>Validate</Text>
      </TouchableOpacity>
    </View>
  )
}
