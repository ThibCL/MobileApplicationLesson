import React, { FunctionComponent, useContext, useState } from "react"
import { View, Text, TouchableOpacity, Switch } from "react-native"
import { StackNavigationProp } from "@react-navigation/stack"
import { StackParamList } from "../App"
import { styles } from "../generalStyle"
import { GameContext, Options } from "../GameContext"
import { RouteProp } from "@react-navigation/native"
import { color } from "react-native-reanimated"
import { Footer } from "../components/Footer"

type ScreenNavigationProp = StackNavigationProp<StackParamList, "Option">
type ScreenRouteProp = RouteProp<StackParamList, "Option">

interface OptionsProps {
  navigation: ScreenNavigationProp
  route: ScreenRouteProp
}

export const Option: FunctionComponent<OptionsProps> = ({
  navigation,
  route,
}: OptionsProps) => {
  const game = useContext(GameContext)
  const [alwaysVote, setAlwaysVote] = useState<boolean>(
    game.options.vote_anyway
  )
  const [timerDuration, setTimerDuration] = useState<number>(game.options.time)
  const [numChoice, setNumChoice] = useState<number>(
    game.options.number_choices
  )
  const [scoreLimit, setScoreLimit] = useState<number>(game.options.score_limit)

  return (
    <View
      style={{
        ...styles.container,
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Text style={{ ...styles.textNormal }}>
        Number of words to choose from
      </Text>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          disabled={numChoice < 2}
          style={{
            ...(numChoice < 2 ? styles.buttonVote : styles.buttonVoteDisabled),
            flex: 1,
          }}
          onPress={() => {
            setNumChoice(numChoice - 1)
          }}
        >
          <Text style={{ ...styles.buttonTextGreen, color: "white", flex: 1 }}>
            -
          </Text>
        </TouchableOpacity>
        <Text
          style={{ flex: 1, textAlign: "center", textAlignVertical: "center" }}
        >
          {numChoice} words
        </Text>

        <TouchableOpacity
          disabled={numChoice > 6}
          style={{
            ...(numChoice > 6 ? styles.buttonVoteDisabled : styles.buttonVote),
            flex: 1,
          }}
          onPress={() => {
            setNumChoice(numChoice + 1)
          }}
        >
          <Text style={{ ...styles.buttonTextGreen, color: "white" }}>+</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.textNormal}>Always vote</Text>
      <Switch
        onValueChange={() => {
          setAlwaysVote(!alwaysVote)
        }}
        value={alwaysVote}
      />
      <Text style={styles.textNormal}>Duration of timer </Text>

      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          disabled={timerDuration < 2}
          style={{
            ...(timerDuration < 2
              ? styles.buttonVoteDisabled
              : styles.buttonVote),
            flex: 1,
          }}
          onPress={() => {
            setTimerDuration(timerDuration - 1)
          }}
        >
          <Text style={{ ...styles.buttonTextGreen, color: "white", flex: 1 }}>
            -
          </Text>
        </TouchableOpacity>
        <Text
          style={{ flex: 1, textAlignVertical: "center", textAlign: "center" }}
        >
          {timerDuration} minutes
        </Text>

        <TouchableOpacity
          disabled={timerDuration > 10}
          style={{
            ...(timerDuration > 10
              ? styles.buttonVoteDisabled
              : styles.buttonVote),

            flex: 1,
          }}
          onPress={() => {
            setTimerDuration(timerDuration + 1)
          }}
        >
          <Text style={{ ...styles.buttonTextGreen, color: "white" }}>+</Text>
        </TouchableOpacity>
      </View>

      <Text style={{ ...styles.textNormal }}>Number of points to win</Text>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          disabled={scoreLimit <= 20}
          style={{
            ...(scoreLimit <= 20
              ? styles.buttonVoteDisabled
              : styles.buttonVote),
            flex: 1,
          }}
          onPress={() => {
            setScoreLimit(scoreLimit - 5)
          }}
        >
          <Text style={{ ...styles.buttonTextGreen, color: "white", flex: 1 }}>
            -
          </Text>
        </TouchableOpacity>
        <Text
          style={{ flex: 1, textAlignVertical: "center", textAlign: "center" }}
        >
          {scoreLimit} points
        </Text>

        <TouchableOpacity
          style={{
            ...styles.buttonVote,
            flex: 1,
          }}
          onPress={() => {
            setScoreLimit(scoreLimit + 5)
          }}
        ></TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.buttonVote}
        onPress={async () => {
          const opt: Options = {
            id: game.options.id,
            time: timerDuration,
            vote_anyway: alwaysVote,
            number_choices: numChoice,
            score_limit: scoreLimit,
          }
          game.setOptions(opt)
          if (route.params.default) {
            try {
              console.log(opt)
              await game.apiClient.saveDefaultOption(game.token, opt)
            } catch (e) {
              console.log(e)
            }
          }
          navigation.goBack()
        }}
      >
        <Text style={{ ...styles.leafButtonPink }}>Validate options </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonVote}
        onPress={() => {
          navigation.goBack()
        }}
      >
        <Text style={styles.buttonTextGreen}>Cancel changes </Text>
      </TouchableOpacity>
      <Footer />
    </View>
  )
}
