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

  const validation = (): Boolean => {
    let i = 0
    while (i < listPlay.length - 1) {
      for (let j = i + 1; j < listPlay.length; j++) {
        if (listPlay[i].name.toLowerCase() == listPlay[j].name.toLowerCase()) {
          return false
        }
      }
      i++
    }

    return true
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Insert Players Names</Text>
      {listPlay.map((elem, index) => (
        <View style={{ flexDirection: "row" }}>
          <TextInput
            key={index}
            placeholder="name"
            style={{ justifyContent: "flex-start" }}
            onChangeText={(text) => {
              let temp = [...listPlay]
              temp[index].name = text
              setListPlay(temp)
            }}
            value={elem.name}
          />

          {listPlay.length > 3 ? (
            <TouchableOpacity
              style={styles.buttonTouchableRight}
              onPress={async () => {
                let temporaire = [...listPlay]
                temporaire.splice(index, 1)
                if (elem.id != undefined) {
                  await game.apiClient.deletePlayer(
                    game.token,
                    game.gameId,
                    elem.id
                  )
                }
                setListPlay(temporaire)
              }}
            >
              <Text style={styles.buttonText}>Delete Player</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.buttonTouchableDisabled}>
              <Text style={styles.buttonText}>Delete Player</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}

      <TouchableOpacity
        style={styles.buttonTouchable}
        onPress={() => {
          if (listPlay.length < 10) {
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
          }
        }}
      >
        <Text style={styles.buttonText}>AddPlayer</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonTouchable}
        onPress={async () => {
          const allDifferent = validation()
          if (allDifferent) {
            const addGame = await game.apiClient.saveGame(
              game.token,
              game.gameId,
              listPlay
            )
            game.setGameId(addGame.id)
            game.setPlayers(addGame.players)
            navigation.replace("Roles")
          } else {
            alert("2 players cannot have the same name")
          }
        }}
      >
        <Text style={styles.buttonText}>Validate</Text>
      </TouchableOpacity>
    </View>
  )
}
