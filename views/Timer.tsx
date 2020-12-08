import React, { FunctionComponent, useContext } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { StackNavigationProp } from "@react-navigation/stack"
import { StackParamList } from "../App"
import { styles } from "../generalStyle"
import { GameContext } from "../GameContext"

type ScreenNavigationProp = StackNavigationProp<StackParamList, "Timer">

interface TimerProps {
   navigation: ScreenNavigationProp
   this.state ={
     time: 360,
     isOn: false

   }
 }

 export const Timer: FunctionComponent<TimerProps> = ({
   navigation,
 }: TimerProps) => {
   const StartTimer = () => {this.setState({
    isOn: true})
    setInterval(() => this.setState({
      time: this.state.time-1
    }), 1000);)
   }
  

   return (
     <View style={styles.container}>
       <TouchableOpacity style={styles.buttonTouchable} onPress={() => StartTimer>
        <Text style={styles.buttonText}>Start/Pause</Text>
      </TouchableOpacity>
     </View>
   )
 }
