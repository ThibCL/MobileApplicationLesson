import React, { FunctionComponent, useContext } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { StackNavigationProp } from "@react-navigation/stack"
import { StackParamList } from "../App"
import { styles } from "../generalStyle"
import { GameContext, Role } from "../GameContext"

type ScreenNavigationProp = StackNavigationProp<StackParamList, "RecapVotes">

interface RecapVotesProps {
  navigation: ScreenNavigationProp
}

export const RecapVotes: FunctionComponent<RecapVotesProps> = ({
  navigation,
}: RecapVotesProps) => {
  const game = useContext(GameContext)
  const play = game.players.slice(1)
  const numVote : Array<number> = []
  for (let i=0;i<play.length;i++){numVote[i]=0}
  game.players.forEach((elem)=>{numVote[play.indexOf(elem.vote)] += 1})

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vote Results</Text>
      {play.map((elem,index)=>{
       { (elem.role == Role.Citizen) ?
       <Text style={{ backgroundColor: "white", color: "black" }}>{elem.name} {numVote[index]} voted for you </Text> :
       <Text style={{ backgroundColor: "red", color: "black" }}>{elem.name} {numVote[index]} people voted for you</Text>}
 
      })}
      <TouchableOpacity
        style={styles.buttonTouchable}
        onPress={() => {
          navigation.replace("Score")
        }}
      >
        <Text style={styles.buttonText}>Next </Text>
      </TouchableOpacity>
    </View>
  )
}
