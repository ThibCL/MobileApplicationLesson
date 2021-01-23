import React, {
  FunctionComponent,
  useContext,
  useState,
  useEffect,
} from "react"
import { View, Text, TouchableOpacity } from "react-native"
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
      navigation.replace("Votes")
    }
  })

  return (
    <View style={{ ...styles.container, ...styles.view }}>
      {!found ? (
        <Text style={styles.title}>Find the word !</Text>
      ) : (
        <Text style={styles.title}>Debate to find the impostor</Text>
      )}
      <Text>
        {Math.floor((timer - time) / 60)}:{(timer - time) % 60}
      </Text>

      <TouchableOpacity
        style={styles.buttonTouchable}
        onPress={() => {
          setIsOn(!isOn)
        }}
      >
        <Text style={styles.buttonText}>{isOn ? "Pause" : "Start"}</Text>
      </TouchableOpacity>

      {!found ? (
        <TouchableOpacity
          style={styles.buttonTouchable}
          onPress={() => {
            setTimer(time)
            setTime(0)
            setFound(true)
            game.setWordFound(true)
          }}
        >
          <Text style={styles.buttonText}>Word Found</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  )
}
