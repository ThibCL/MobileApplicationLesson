import React, { FunctionComponent, useContext, useState } from "react"
import { View, Text, TouchableOpacity, TextInput } from "react-native"
import { StackNavigationProp } from "@react-navigation/stack"
import { StackParamList } from "../App"
import { GameContext, Player, Role } from "../GameContext"
import { styles } from "../generalStyle"
import { Roles } from "./Roles"


type ScreenNavigationProp = StackNavigationProp<StackParamList, "CreatePlayer">

interface CreatePlayerProps {
  navigation: ScreenNavigationProp
}

export const CreatePlayer: FunctionComponent<CreatePlayerProps> = ({
  navigation,
}: CreatePlayerProps) => {
  const game = useContext(GameContext)
  const [player1,setPlayer1]=useState("")
  const [player2,setPlayer2]=useState("")
  const [player3,setPlayer3]=useState("")   
  const [player4,setPlayer4]=useState("")
  const [player5,setPlayer5]=useState("")
  const [player6,setPlayer6]=useState("")  
  const [player7,setPlayer7]=useState("")  
  const [player8,setPlayer8]=useState("") 
  const [player9,setPlayer9]=useState("") 
  const [player10,setPlayer10]=useState("") 
  const [numPlayer,setNumPlayer]=useState(3)
  var allDifferent = true
  const validation = () =>{
      allDifferent= true
      let players = [
        { name: player1, score: 0, vote: undefined, scoreVar: 0, role: Role.Citizen },
        { name: player2, score: 0, vote: undefined, scoreVar: 0, role: Role.Citizen },
        { name: player3, score: 0, vote: undefined, scoreVar: 0, role: Role.Citizen },
        { name: player4, score: 0, vote: undefined, scoreVar: 0, role: Role.Citizen },
        { name: player5, score: 0, vote: undefined, scoreVar: 0, role: Role.Citizen },
        { name: player6, score: 0, vote: undefined, scoreVar: 0, role: Role.Citizen },
        { name: player7, score: 0, vote: undefined, scoreVar: 0, role: Role.Citizen },
        { name: player8, score: 0, vote: undefined, scoreVar: 0, role: Role.Citizen },
        { name: player9, score: 0, vote: undefined, scoreVar: 0, role: Role.Citizen },
        { name: player10, score: 0, vote: undefined, scoreVar: 0, role: Role.Citizen },
      ]
      players=players.slice(0,numPlayer)
      
      let i = 0
     while(allDifferent && i<numPlayer-1){
          for(let j=i+1 ; j<numPlayer ; j++) {
              if (players[i].name.toLowerCase() == players[j].name.toLowerCase()) {
                  allDifferent=false
              }
          }
          i++
      }


      game.setPlayers(players)
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Insert Players Names</Text>
      <TextInput          
          placeholder='Player 1'
          onChangeText={(text) => setPlayer1(text)}          
        />

         <TextInput          
          placeholder='Player 2'
          onChangeText={(text) => setPlayer2(text)}          
        />

         <TextInput          
          placeholder='Player 3'
          onChangeText={(text) => setPlayer3(text)}          
        />

         {(numPlayer>3)? (
             <TextInput          
             placeholder='Player 4'
             onChangeText={(text) => setPlayer4(text)}             
           />
         ):null}
         {(numPlayer>4)? (
             <TextInput          
             placeholder='Player 5'
             onChangeText={(text) => setPlayer5(text)}             
           />
         ):null}
         {(numPlayer>5)? (
             <TextInput          
             placeholder='Player 6'
             onChangeText={(text) => setPlayer6(text)}             
           />
         ):null}
         {(numPlayer>6)? (
             <TextInput          
             placeholder='Player 7'
             onChangeText={(text) => setPlayer7(text)}             
           />
         ):null}
         {(numPlayer>7)? (
             <TextInput          
             placeholder='Player 8'
             onChangeText={(text) => setPlayer8(text)}             
           />
         ):null}
         {(numPlayer>8)? (
             <TextInput          
             placeholder='Player 9'
             onChangeText={(text) => setPlayer9(text)}             
           />
         ):null}
         {(numPlayer>9)? (
             <TextInput          
             placeholder='Player 10'
             onChangeText={(text) => setPlayer10(text)}             
           />
         ):null}

      <TouchableOpacity 
      style={styles.buttonTouchable}
      onPress={() => {
        if (numPlayer < 10) {setNumPlayer(numPlayer+1)}
    }}>
        <Text style={styles.buttonText}>AddPlayer</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonTouchable}
        onPress={() => {
            if (numPlayer > 3) {setNumPlayer(numPlayer-1)}
        }}
      >
        <Text style={styles.buttonText}>DeletePlayer</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonTouchable}
        onPress={() => {
          validation()
          if (allDifferent){navigation.navigate("Roles")}
          else {alert("2 players cannot have the same name")}
          
        }}
      >
        <Text style={styles.buttonText}>Validate</Text>
      </TouchableOpacity>
    </View>
  )
}
