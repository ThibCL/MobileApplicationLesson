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
import { FlatList } from "react-native-gesture-handler"
import UserAvatar from "react-native-user-avatar"
import Icon from "react-native-vector-icons/Entypo"

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
        display: "flex",
        flexDirection: "column",
      }}
    >
      <View style={{ flex: 1, display: "flex", flexDirection: "row" }}>
        <Text style={{ ...styles.buttonTextGreen, flex: 1 }}>
          Name of the game:
        </Text>
        <TextInput
          style={{
            ...styles.buttonTextPink,
            fontWeight: "bold",
            fontSize: 20,
            textAlignVertical: "center",
            textAlign: "center",
            flex: 1,
          }}
          placeholder="Game name"
          onChangeText={(text) => setGameName(text)}
          value={gameName}
        />
      </View>

      <View style={{ flex: 7 }}>
        <FlatList
          keyExtractor={(_item, index) => {
            return index.toString()
          }}
          removeClippedSubviews={false}
          data={listPlay}
          renderItem={({ item, index }) => (
            <View
              style={{
                margin: 5,
                display: "flex",
                flexDirection: "row",
              }}
            >
              <UserAvatar
                key={item.name}
                style={{ margin: 2 }}
                size={50}
                name={item.name === "" ? "Name" : item.name}
              />
              <TextInput
                style={{
                  flex: 7,
                  padding: 2,
                  color: "white",
                  textAlign: "center",
                  backgroundColor: "#004d40",
                  borderRadius: 50,
                  borderWidth: 1,
                  borderColor: "black",
                }}
                placeholder="Name"
                placeholderTextColor="grey"
                onChangeText={(text) => {
                  let temp = [...listPlay]
                  temp[index].name = text
                  setListPlay(temp)
                }}
                value={item.name}
              />

              {listPlay.length > 3 ? (
                <TouchableOpacity
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={async () => {
                    let temporaire = [...listPlay]
                    temporaire.splice(index, 1)
                    if (item.id != undefined) {
                      await game.apiClient.deletePlayer(
                        game.token,
                        game.game.id,
                        item.id
                      )
                    }
                    setListPlay(temporaire)
                  }}
                >
                  <Icon name="trash" size={20} />
                </TouchableOpacity>
              ) : null}
            </View>
          )}
        />
      </View>
      <View style={{ display: "flex", flexDirection: "row" }}>
        {listPlay.length < 10 ? (
          <View style={{ flex: 1 }}>
            <Text style={{ ...styles.buttonTextGreen }}>More players</Text>
            <TouchableOpacity
              style={{ ...styles.buttonVote, alignSelf: "center" }}
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
              <Icon name="plus" size={30} color="white" />
            </TouchableOpacity>
            <Text style={{ ...styles.buttonTextGreen }}>More fun</Text>
          </View>
        ) : null}
        <TouchableOpacity
          style={{
            ...styles.leafButtonPink,
            flex: 1,
          }}
          onPress={async () => {
            const valid = validation()
            if (valid.different) {
              const addGame = await game.apiClient.saveGame(
                game.token,
                { ...game.game, name: gameName },
                listPlay,
                game.options
              )
              let gName = gameName
              if (gameName.trim() === "") {
                gName = "Game " + addGame.id
              }

              game.setOptions(addGame.option)
              game.setGame({ id: addGame.id, name: gName, finished: false })
              game.setPlayers(addGame.players)
              navigation.replace("Roles")
            } else {
              alert(valid.message)
            }
          }}
        >
          <Text style={{ ...styles.buttonTextGreen, fontSize: 30 }}>GO!</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          backgroundColor: "#004d40",
          flex: 1,
          padding: 10,
          display: "flex",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          style={{
            alignSelf: "center",
            flex: 1,
          }}
          onPress={() => {
            game.setGame({ ...game.game, name: gameName })
            game.setPlayers(listPlay)
            navigation.navigate("Option", { default: false })
          }}
        >
          <Icon name="cog" color="white" size={30} />
        </TouchableOpacity>
      </View>
    </View>
  )
}
