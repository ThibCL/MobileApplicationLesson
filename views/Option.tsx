import React, { FunctionComponent, useContext, useState } from "react"
import { View, Text, TouchableOpacity, Switch, ScrollView } from "react-native"
import { StackNavigationProp } from "@react-navigation/stack"
import { StackParamList } from "../App"
import { styles } from "../generalStyle"
import { GameContext, Options } from "../GameContext"
import { RouteProp } from "@react-navigation/native"
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
        flex: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <View style={{ flex: 10 }}>
        <ScrollView>
          <View
            style={{
              flex: 2,
              display: "flex",
              flexDirection: "column",
              margin: 10,
            }}
          >
            <View style={{ ...styles.buttonVote, flex: 1 }}>
              <Text style={{ ...styles.buttonTextGreen, color: "white" }}>
                Number of words to choose from
              </Text>
            </View>
            <View style={{ display: "flex", flexDirection: "row", flex: 1 }}>
              <TouchableOpacity
                disabled={numChoice < 2}
                style={{
                  ...(numChoice < 2
                    ? { ...styles.buttonVoteDisabled, backgroundColor: "grey" }
                    : { ...styles.buttonVote, backgroundColor: "#dcbeba" }),
                  flex: 1,
                }}
                onPress={() => {
                  setNumChoice(numChoice - 1)
                }}
              >
                <Text style={{ ...styles.buttonTextGreen, color: "white" }}>
                  -
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  ...styles.buttonTextGreen,
                  flex: 1,
                }}
              >
                {numChoice} words
              </Text>
              <TouchableOpacity
                disabled={numChoice > 6}
                style={{
                  ...(numChoice > 6
                    ? { ...styles.buttonVoteDisabled, backgroundColor: "grey" }
                    : { ...styles.buttonVote, backgroundColor: "#dcbeba" }),
                  flex: 1,
                }}
                onPress={() => {
                  setNumChoice(numChoice + 1)
                }}
              >
                <Text style={{ ...styles.buttonTextGreen, color: "white" }}>
                  +
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",

              margin: 10,
            }}
          >
            <View style={{ ...styles.buttonVote, flex: 1 }}>
              <Text style={{ ...styles.buttonTextGreen, color: "white" }}>
                Always vote
              </Text>
            </View>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Text style={{ ...styles.buttonTextGreen, flex: 1 }}>No</Text>
              <Switch
                onValueChange={() => {
                  setAlwaysVote(!alwaysVote)
                }}
                value={alwaysVote}
              />
              <Text style={{ ...styles.buttonTextGreen, flex: 1 }}>YES</Text>
            </View>
          </View>

          <View style={{ flex: 2, margin: 10 }}>
            <View style={{ ...styles.buttonVote, flex: 1 }}>
              <Text style={{ ...styles.buttonTextGreen, color: "white" }}>
                Duration of timer
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                disabled={timerDuration < 2}
                style={{
                  ...(timerDuration < 2
                    ? { ...styles.buttonVoteDisabled, backgroundColor: "grey" }
                    : { ...styles.buttonVote, backgroundColor: "#dcbeba" }),
                  flex: 1,
                }}
                onPress={() => {
                  setTimerDuration(timerDuration - 1)
                }}
              >
                <Text
                  style={{ ...styles.buttonTextGreen, color: "white", flex: 1 }}
                >
                  -
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  ...styles.buttonTextGreen,
                  flex: 1,
                }}
              >
                {timerDuration} minutes
              </Text>

              <TouchableOpacity
                disabled={timerDuration > 10}
                style={{
                  ...(timerDuration > 10
                    ? { ...styles.buttonVoteDisabled, backgroundColor: "grey" }
                    : { ...styles.buttonVote, backgroundColor: "#dcbeba" }),
                  flex: 1,
                }}
                onPress={() => {
                  setTimerDuration(timerDuration + 1)
                }}
              >
                <Text style={{ ...styles.buttonTextGreen, color: "white" }}>
                  +
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              flex: 2,
              margin: 10,
            }}
          >
            <View style={{ ...styles.buttonVote, flex: 1 }}>
              <Text style={{ ...styles.buttonTextGreen, color: "white" }}>
                Number of points to win
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                disabled={scoreLimit <= 20}
                style={{
                  ...(scoreLimit <= 20
                    ? { ...styles.buttonVoteDisabled, backgroundColor: "grey" }
                    : { ...styles.buttonVote, backgroundColor: "#dcbeba" }),
                  flex: 1,
                }}
                onPress={() => {
                  setScoreLimit(scoreLimit - 5)
                }}
              >
                <Text
                  style={{ ...styles.buttonTextGreen, color: "white", flex: 1 }}
                >
                  -
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  ...styles.buttonTextGreen,
                  flex: 1,
                }}
              >
                {scoreLimit} points
              </Text>

              <TouchableOpacity
                style={{
                  ...styles.buttonVote,
                  backgroundColor: "#dcbeba",
                  flex: 1,
                }}
                onPress={() => {
                  setScoreLimit(scoreLimit + 5)
                }}
              >
                <Text
                  style={{ ...styles.buttonTextGreen, color: "white", flex: 1 }}
                >
                  +
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ flex: 1, display: "flex", flexDirection: "row" }}>
            <TouchableOpacity
              style={{ ...styles.leafButtonPink, flex: 1 }}
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
              <Text style={{ ...styles.buttonTextGreen }}>
                Validate options{" "}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ ...styles.leafButtonPink, flex: 1 }}
              onPress={() => {
                navigation.goBack()
              }}
            >
              <Text style={styles.buttonTextGreen}>Cancel changes </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      <Footer />
    </View>
  )
}
