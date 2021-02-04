import { StackNavigationProp } from "@react-navigation/stack"
import React, { FunctionComponent } from "react"
import { Text, TouchableOpacity, ScrollView } from "react-native"
import { StackParamList } from "../App"
import { styles } from "../generalStyle"

type ScreenNavigationProp = StackNavigationProp<StackParamList, "Home">

interface RulesProps {
  navigation: ScreenNavigationProp
}

export const Rules: FunctionComponent<RulesProps> = ({
  navigation,
}: RulesProps) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={{ margin: 10 }}>
        The application is a game where players ask questions to the game master
        to find the secret word, but among them there is a traitor that already
        knows theword and that will have to act like he doesn’t. Will the
        citizens and the master succeed to unmask the traitor? Will the traitor
        succeed to help the citizens tofind the word without being unmasked?
        After all the players have been enter, the role of every players is
        reveal. Theplayers will have to pass to each other the phone to reveal
        their role and for thegame master and the traitor, the secret word. The
        game master take back thephone and launch the timer. The players have a
        limited time to find the word.If the word is not found at the end of the
        timer the game stopped and the traitor looses. If the word is found the
        game master stop the timer and anothertimer is launch with the same
        amount of time the players took to find the word.This second timer is to
        debate on who is the traitor, then when the timer is finished everyone
        vote by passing the phone and selecting the player they think is the
        traitor.The recap of the game is shown to said who wins, the citizens or
        the traitor.Finally the score are shown and you can replay or stop to
        play. The traitor winspoints if he is not discover, the citizens win
        points if they have discovered the traitor and some bonus point if they
        have voted for him. Finally the player whofound the word wins some
        points.
      </Text>
      <TouchableOpacity
        style={{ ...styles.leafButtonPink }}
        onPress={() => {
          navigation.goBack()
        }}
      >
        <Text style={{ ...styles.buttonTextGreen }}>Okay</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}
