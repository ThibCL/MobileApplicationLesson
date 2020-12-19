import React, { FunctionComponent, useContext, useState } from "react"
import { View, Text, TouchableOpacity, TextInput } from "react-native"
import { StackNavigationProp } from "@react-navigation/stack"
import { StackParamList } from "../App"
import { GameContext, Player, Role } from "../GameContext"
import { styles } from "../generalStyle"
import {cloneDeep} from 'lodash';
import { Roles } from "./Roles"


type ScreenNavigationProp = StackNavigationProp<StackParamList, "CreatePlayer">

interface CreatePlayerProps {
  navigation: ScreenNavigationProp
}

export const CreatePlayer: FunctionComponent<CreatePlayerProps> = ({
  navigation,
}: CreatePlayerProps) => {
  const game = useContext(GameContext)

  const [listPlay, setListPlay]=useState<Player[]>([{ name: "", score: 0, vote: undefined, scoreVar: 0, role: Role.Citizen },
    { name: "", score: 0, vote: undefined, scoreVar: 0, role: Role.Citizen },
    { name: "", score: 0, vote: undefined, scoreVar: 0, role: Role.Citizen }])
  if (game.players.length>0){setListPlay(game.players)}
  var allDifferent = true
  
  const validation = () =>{
      allDifferent= true
      listPlay.forEach((elem)=>console.log(elem.name))
      
      let i = 0
     while(allDifferent && i<listPlay.length-1){
          for(let j=i+1 ; j<listPlay.length ; j++) {
              if (listPlay[i].name.toLowerCase() == listPlay[j].name.toLowerCase()) {
                  allDifferent=false
              }
          }
          i++
      }
  }

  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Insert Players Names</Text>
      {listPlay.map((elem, index)=>
       <View style={{flexDirection:"row"}} > 
       
       <TextInput
      key={index}
      placeholder='name'
      style={{justifyContent: 'flex-start',}}
      onChangeText={(text) =>  { let temp = cloneDeep(listPlay)
         temp[index].name = text 
         setListPlay(temp)}}
      value = {elem.name}
      />
       
        {(listPlay.length>3) ? ( <TouchableOpacity 
      style={styles.buttonTouchableRight }
      onPress={() =>   { 
        let temporaire = cloneDeep(listPlay)
        temporaire.splice(index,1)
        setListPlay(temporaire)}
       
    }>
        <Text style={styles.buttonText}>Delete Player</Text>
      </TouchableOpacity> 
      ) : ( <TouchableOpacity 
        style={styles.buttonTouchableDisabled } >
          <Text style={styles.buttonText}>Delete Player</Text>
        </TouchableOpacity> 
        )}
       
      </View>
      

    )}

      <TouchableOpacity 
      style={styles.buttonTouchable}
      onPress={() => {
        if (listPlay.length < 10) {setListPlay(listPlay.concat({ name: "", score: 0, vote: undefined, scoreVar: 0, role: Role.Citizen }))}
    }}>
        <Text style={styles.buttonText}>AddPlayer</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonTouchable}
        onPress={() => {
          validation()
          if (allDifferent){game.setPlayers(listPlay),navigation.navigate("Roles")}
          else {alert("2 players cannot have the same name")}
          
        }}
      >
        <Text style={styles.buttonText}>Validate</Text>
      </TouchableOpacity>
      
    </View>
  )
}
