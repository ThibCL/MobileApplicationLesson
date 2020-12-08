import React, { FunctionComponent, useContext } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { StackNavigationProp } from "@react-navigation/stack"
import { StackParamList } from "../App"
import { styles } from "../generalStyle"
import { GameContext } from "../GameContext"

// //Change every FILE to the name of the view
// //Don't forget to add the route in the App.tsx file

type ScreenNavigationProp = StackNavigationProp<StackParamList, "Timer">

interface TimerProps {
   navigation: ScreenNavigationProp
 }

 export const Timer: FunctionComponent<TimerProps> = ({
   navigation,
 }: TimerProps) => {
   return (
     <View style={styles.container}>
       <TouchableOpacity style={styles.buttonTouchable} onPress={() => StartTimer>
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>
     </View>
   )
 }
