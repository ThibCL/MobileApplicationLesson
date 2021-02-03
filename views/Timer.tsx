import React, {
  FunctionComponent,
  useContext,
  useState,
  useEffect,
} from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { CountdownCircleTimer } from "react-native-countdown-circle-timer"
import { StackNavigationProp } from "@react-navigation/stack"
import { StackParamList } from "../App"
import { styles } from "../generalStyle"
import { GameContext } from "../GameContext"

type ScreenNavigationProp = StackNavigationProp<StackParamList, "Timer">

interface TimerProps {
  navigation: ScreenNavigationProp
}

export const Timer: FunctionComponent<TimerProps> = ({
  navigation,
}: TimerProps) => {
  const game = useContext(GameContext)
  const [time, setTime] = useState(0)
  const [isOn, setIsOn] = useState(false)
  const [found, setFound] = useState(false)
  const [timer, setTimer] = useState(game.options.time * 60)

  useEffect(() => {
    if (isOn && time < timer) {
      const interval = setInterval(() => {
        setTime(time + 1)
      }, 1000)
      return () => clearInterval(interval)
    }
    if (time == timer) {
      if (game.options.vote_anyway || found) {
        navigation.replace("Votes")
      } else {
        game.setPlayersElected([-1])
        navigation.replace("Score")
      }
    }
  })

  return (
    <View
      style={{ ...styles.container, display: "flex", flexDirection: "column" }}
    >
      <View style={{ flex: 4 }}>
        <Text
          style={{
            ...styles.title,
            color: "white",
            textAlign: "center",
            textAlignVertical: "center",
            margin: 10,
            borderRadius: 50,
            backgroundColor: "#004d40",
          }}
        >
          {!found ? " Question time!" : "It's time for debate"}
        </Text>
      </View>

      <View style={{ flex: 7, alignItems: "center" }}>
        <CountdownCircleTimer
          key={found ? "found" : "notFound"}
          trailColor="pink"
          isPlaying={isOn}
          duration={timer - time}
          colors={[["#004d40", 1]]}
        >
          <Text style={{ fontSize: 25, color: "pink", fontWeight: "bold" }}>
            {Math.floor((timer - time) / 60)}:
            {(timer - time) % 60 < 10 ? "0" : ""}
            {(timer - time) % 60}
          </Text>
        </CountdownCircleTimer>
      </View>

      <View style={{ flex: 2, display: "flex", flexDirection: "row" }}>
        <TouchableOpacity
          style={{ ...styles.buttonTouchable, flex: 1 }}
          onPress={() => {
            setIsOn(!isOn)
          }}
        >
          <Text style={styles.buttonText}>{isOn ? "Pause" : "Start"}</Text>
        </TouchableOpacity>

        {isOn ? (
          !found ? (
            <TouchableOpacity
              style={{ ...styles.buttonTouchable, flex: 1 }}
              onPress={() => {
                setTimer(time)
                setTime(0)
                setFound(true)
                game.setWordFound(true)
              }}
            >
              <Text style={styles.buttonText}>Word Found</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{ ...styles.buttonTouchable, flex: 1 }}
              onPress={() => {
                setTime(timer)
              }}
            >
              <Text style={styles.buttonText}>Skip</Text>
            </TouchableOpacity>
          )
        ) : null}
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
