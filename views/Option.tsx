import React, { FunctionComponent, useContext, useState } from "react"
import { View, Text, TouchableOpacity, Switch } from "react-native"
import { StackNavigationProp } from "@react-navigation/stack"
import { StackParamList } from "../App"
import { styles } from "../generalStyle"
import { GameContext, Options } from "../GameContext"
import { RouteProp } from "@react-navigation/native"

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
            ...(numChoice < 2
              ? styles.buttonTouchableDisabled
              : styles.buttonTouchable),
            flex: 1,
          }}
          onPress={() => {
            setNumChoice(numChoice - 1)
          }}
        >
          <Text style={{ ...styles.buttonText, flex: 1 }}>-</Text>
        </TouchableOpacity>
        <Text
          style={{ flex: 1, textAlign: "center", textAlignVertical: "center" }}
        >
          {numChoice} words
        </Text>

        <TouchableOpacity
          disabled={numChoice > 6}
          style={{
            ...(numChoice > 6
              ? styles.buttonTouchableDisabled
              : styles.buttonTouchable),
            flex: 1,
          }}
          onPress={() => {
            setNumChoice(numChoice + 1)
          }}
        >
          <Text style={styles.buttonText}>+</Text>
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
              ? styles.buttonTouchableDisabled
              : styles.buttonTouchable),
            flex: 1,
          }}
          onPress={() => {
            setTimerDuration(timerDuration - 1)
          }}
        >
          <Text style={{ ...styles.buttonText, flex: 1 }}>-</Text>
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
              ? styles.buttonTouchableDisabled
              : styles.buttonTouchable),

            flex: 1,
          }}
          onPress={() => {
            setTimerDuration(timerDuration + 1)
          }}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <Text style={{ ...styles.textNormal }}>Number of points to win</Text>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          disabled={scoreLimit <= 20}
          style={{
            ...(scoreLimit <= 20
              ? styles.buttonTouchableDisabled
              : styles.buttonTouchable),
            flex: 1,
          }}
          onPress={() => {
            setScoreLimit(scoreLimit - 5)
          }}
        >
          <Text style={{ ...styles.buttonText, flex: 1 }}>-</Text>
        </TouchableOpacity>
        <Text
          style={{ flex: 1, textAlignVertical: "center", textAlign: "center" }}
        >
          {scoreLimit} points
        </Text>

        <TouchableOpacity
          style={{
            ...styles.buttonTouchable,
            flex: 1,
          }}
          onPress={() => {
            setScoreLimit(scoreLimit + 5)
          }}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.buttonTouchable}
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
        <Text style={styles.buttonText}>Validate options </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonTouchable}
        onPress={() => {
          navigation.goBack()
        }}
      >
        <Text style={styles.buttonText}>Cancel changes </Text>
      </TouchableOpacity>
      <View
        style={{
          backgroundColor: "#004d40",
          flex: 1,
        }}
      ></View>
    </View>
  )
}
