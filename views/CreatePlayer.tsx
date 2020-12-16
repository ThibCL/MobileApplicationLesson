import React, { FunctionComponent, useContext, useState } from "react"
import { View, Text, TouchableOpacity, TextInput } from "react-native"
import { StackNavigationProp } from "@react-navigation/stack"
import { StackParamList } from "../App"
import { GameContext, Player, Role } from "../GameContext"
import { styles } from "../generalStyle"


type ScreenNavigationProp = StackNavigationProp<StackParamList, "CreatePlayer">

interface CreatePlayerProps {
  navigation: ScreenNavigationProp
}

export const CreatePlayer: FunctionComponent<CreatePlayerProps> = ({
  navigation,
}: CreatePlayerProps) => {
  const game = useContext(GameContext)

  const [listPlay, setListPlay]=useState([{ name: "", score: 0, vote: undefined, scoreVar: 0, role: Role.Citizen },
    { name: "", score: 0, vote: undefined, scoreVar: 0, role: Role.Citizen },
    { name: "", score: 0, vote: undefined, scoreVar: 0, role: Role.Citizen }])
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

  const temp = (truc: number,text: string)=>{
    listPlay[truc].name = text
    return listPlay
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Insert Players Names</Text>
      {listPlay.map((listPlay,index)=>
      
      <TextInput
      key={index}
      placeholder='name'
      onChangeText={(text) => setListPlay(temp(index,text))}
      />

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
            if (listPlay.length > 3) {setListPlay(listPlay.slice(1,listPlay.length-1))}
        }}
      >
        <Text style={styles.buttonText}>DeletePlayer</Text>
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
