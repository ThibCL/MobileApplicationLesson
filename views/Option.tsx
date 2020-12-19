import React, { FunctionComponent, useContext, useState} from "react"
import { View, Text, TouchableOpacity, Switch  } from "react-native"
import { StackNavigationProp } from "@react-navigation/stack"
import { StackParamList } from "../App"
import { styles } from "../generalStyle"
import { GameContext, Options } from "../GameContext"


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
    {(numChoice>1) ? (<TouchableOpacity 
        style={styles.buttonTouchablePetit } 
        onPress={() =>   {setNumChoice(numChoice-1) }}      >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity> ) : (<TouchableOpacity 
        style={styles.buttonTouchablePetitDisabled } >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>)}
        <Text style ={{flex : 1}}>{numChoice} words</Text>
        {(numChoice<6) ? (<TouchableOpacity 
        style={styles.buttonTouchablePetit } 
        onPress={() =>   {setNumChoice(numChoice+1) }}      >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity> ) : (<TouchableOpacity 
        style={styles.buttonTouchablePetitDisabled } >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>)}
    </View>
    <Text style={styles.textNormal}>Always vote</Text>
    <Switch
          onValueChange={() => {
            setAlwaysVote(!alwaysVote)
          }}
          value={alwaysVote} />
    <Text style={styles.textNormal}>Duration of timer </Text>
    <View style={{flexDirection:"row"}} > 
    {(timerDuration>1) ? (<TouchableOpacity 
        style={styles.buttonTouchablePetit } 
        onPress={() =>   {setTimerDuration(timerDuration-1) }}      >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity> ) : (<TouchableOpacity 
        style={styles.buttonTouchablePetitDisabled } >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>)}
        <Text style ={{flex : 1}}>{timerDuration} minutes</Text>
        {(timerDuration<10) ? (<TouchableOpacity 
        style={styles.buttonTouchablePetit } 
        onPress={() =>   {setTimerDuration(timerDuration+1) }}      >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity> ) : (<TouchableOpacity 
        style={styles.buttonTouchablePetitDisabled } >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>)}
    </View>
    <TouchableOpacity 
        style={styles.buttonTouchable } 
        onPress={() =>   {game.setOptions({time : timerDuration, voteAnyway : alwaysVote, numberChoices : numChoice })
        
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