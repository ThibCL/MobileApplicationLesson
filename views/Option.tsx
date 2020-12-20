import React, { FunctionComponent, useContext, useState} from "react"
import { View, Text, TouchableOpacity, Switch  } from "react-native"
import { StackNavigationProp } from "@react-navigation/stack"
import { StackParamList } from "../App"
import { styles } from "../generalStyle"
import { GameContext, Options } from "../GameContext"
import { Timer } from "./Timer"


type ScreenNavigationProp = StackNavigationProp<StackParamList, "Option">

interface OptionsProps {
  navigation: ScreenNavigationProp
}

export const Option: FunctionComponent<OptionsProps> = ({
  navigation,
}: OptionsProps) => {
    
    const game = useContext(GameContext)
    const [alwaysVote, setAlwaysVote] = useState(game.options.voteAnyway)
    const [timerDuration,setTimerDuration] = useState (game.options.time)
    const [numChoice,setNumChoice] = useState (game.options.numberChoices)
   

    return(
    <View style={styles.container}>
    <Text style={styles.title}>Options</Text>
    <Text style={styles.textNormal}>Number of words to choose from</Text>
    <View style={{flexDirection:"row"}} > 
    <TouchableOpacity
          disabled={numChoice<2}
          style={{
            ...(numChoice<2
              ? styles.buttonTouchableDisabled
              : styles.buttonTouchable),
          }}
          onPress={() =>   {setNumChoice(numChoice-1) }}
        >
          <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
        <Text style ={{flex : 1}}>{numChoice} words</Text>
        
        <TouchableOpacity
          disabled={numChoice>6}
          style={{
            ...(numChoice>6
              ? styles.buttonTouchableDisabled
              : styles.buttonTouchable),
          }}
          onPress={() =>   {setNumChoice(numChoice+1) }}
        >
          <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
    </View>
    <Text style={styles.textNormal}>Always vote</Text>
    <Switch
          onValueChange={() => {
            setAlwaysVote(!alwaysVote)
          }}
          value={alwaysVote} />
    <Text style={styles.textNormal}>Duration of timer </Text>
    
     
    <View style={{flexDirection:"row"}} > 
    <TouchableOpacity
          disabled={timerDuration<2}
          style={{
            ...(timerDuration<2
              ? styles.buttonTouchableDisabled
              : styles.buttonTouchable),
          }}
          onPress={() =>   {setTimerDuration(timerDuration-1) }}
        >
          <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
        <Text style ={{flex : 1}}>{timerDuration} minutes</Text>
        
        <TouchableOpacity
          disabled={timerDuration>10}
          style={{
            ...(timerDuration>10
              ? styles.buttonTouchableDisabled
              : styles.buttonTouchable),
          }}
          onPress={() =>   {setTimerDuration(timerDuration+1) }}
        >
          <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
    </View>
   
    <TouchableOpacity 
        style={styles.buttonTouchable } 
        onPress={() =>   {game.setOptions({time : timerDuration*60, voteAnyway : alwaysVote, numberChoices : numChoice })
        
                          navigation.replace("Home") }}      >
          <Text style={styles.buttonText}>Validate options </Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={styles.buttonTouchable } 
        onPress={() =>  {navigation.replace("Home") }}      >
          <Text style={styles.buttonText}>Cancel changes </Text>
        </TouchableOpacity>
    </View>)
}