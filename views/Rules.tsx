import { StackNavigationProp } from "@react-navigation/stack"
import React, { FunctionComponent } from "react"
import { Text, TouchableOpacity, ScrollView, View } from "react-native"
import { StackParamList } from "../App"
import { Footer } from "../components/Footer"
import { styles } from "../generalStyle"

type ScreenNavigationProp = StackNavigationProp<StackParamList, "Home">

interface RulesProps {
  navigation: ScreenNavigationProp
}

export const Rules: FunctionComponent<RulesProps> = ({
  navigation,
}: RulesProps) => {
  return (
    <View style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <View style={{ flex: 9 }}>
        <ScrollView style={{ ...styles.container }}>
          <View>
            <Text style={{ ...styles.buttonTextGreen }}>
              This application allows you to play the board game: INSIDER
            </Text>
          </View>

          <View style={{ ...styles.buttonVote, backgroundColor: "#dcbeba" }}>
            <Text style={{ ...styles.buttonTextGreen }}>What's the goal?</Text>
          </View>
          <View
            style={{
              borderColor: "#004d40",
              borderWidth: 3,
              margin: 5,
              padding: 5,
              borderRadius: 5,
            }}
          >
            <View
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Text style={{ ...styles.buttonTextGreen, flex: 1 }}>
                There are 3 roles:
              </Text>
              <Text
                style={{
                  ...styles.buttonTextGreen,
                  flex: 1,
                  fontWeight: "normal",
                }}
              >
                - The master: he chooses a word from a list, it is the word that
                the orher players will have to guess. The other players will ask
                him questions to guess, the master will have to answer the
                questions with "yes" or "no".
              </Text>
              <Text
                style={{
                  ...styles.buttonTextGreen,
                  flex: 1,
                  fontWeight: "normal",
                }}
              >
                - The citizens: they will have to ask questions to the master in
                order to succeed in guessing the word he has chosen
              </Text>
              <Text
                style={{
                  ...styles.buttonTextGreen,
                  flex: 1,
                  fontWeight: "normal",
                }}
              >
                -The traitor: this player will also see the master's word,
                however no one must know that he knows the word! It's up to him
                to discreetly ask question in order to guide the other players
                without being unmasked.
              </Text>
            </View>
          </View>

          <View style={{ ...styles.buttonVote, backgroundColor: "#dcbeba" }}>
            <Text style={{ ...styles.buttonTextGreen }}>
              And how do we win?
            </Text>
          </View>
          <View
            style={{
              borderColor: "#004d40",
              borderWidth: 3,
              margin: 5,
              padding: 5,
              borderRadius: 5,
              flex: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Text
              style={{
                ...styles.buttonTextGreen,
                flex: 1,
                fontWeight: "normal",
              }}
            >
              At the end of the time, the players must vote to decide who is the
              traitor. The traitor's goal is not to be unmasked: if he succeeds
              (if nobody votes for him at the end), he wins points.
            </Text>
            <Text
              style={{
                ...styles.buttonTextGreen,
                flex: 1,
                fontWeight: "normal",
              }}
            >
              Citizens must not be elimenated: they must make sure that no one
              votes for them in order to be eliminated.
            </Text>
          </View>

          <View style={{ ...styles.buttonVote, backgroundColor: "#dcbeba" }}>
            <Text style={{ ...styles.buttonTextGreen }}>Tips</Text>
          </View>
          <View
            style={{
              flex: 1,
              borderColor: "#004d40",
              borderWidth: 3,
              margin: 5,
              borderRadius: 5,
              padding: 5,
            }}
          >
            <Text
              style={{
                ...styles.buttonTextGreen,
                flex: 1,
                fontWeight: "normal",
              }}
            >
              In the options set the times of your games, the number of points
              to win, the choices of word, ect...
            </Text>
            <Text
              style={{
                ...styles.buttonTextGreen,
                flex: 1,
                fontWeight: "normal",
              }}
            >
              In the history find your previous games.
            </Text>
          </View>

          <View style={{ ...styles.buttonVote, backgroundColor: "#dcbeba" }}>
            <Text style={{ ...styles.buttonTextGreen }}>
              What about the app, how do we use it?
            </Text>
          </View>
          <View
            style={{
              borderColor: "#004d40",
              borderWidth: 3,
              margin: 5,
              padding: 5,
              borderRadius: 5,
              flex: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Text
              style={{
                ...styles.buttonTextGreen,
                flex: 1,
                fontWeight: "normal",
              }}
            >
              It's simple, all tou have to do is follow the instructions:
            </Text>
            <Text
              style={{
                ...styles.buttonTextGreen,
                flex: 1,
                fontWeight: "normal",
              }}
            >
              1. Register the players
            </Text>
            <Text
              style={{
                ...styles.buttonTextGreen,
                flex: 1,
                fontWeight: "normal",
              }}
            >
              2. Put the phone through the different players so they can see
              their roles.
            </Text>
            <Text
              style={{
                ...styles.buttonTextGreen,
                flex: 1,
                fontWeight: "normal",
              }}
            >
              3. Put the phone back in the middle and start the stopwatch.
            </Text>
            <Text
              style={{
                ...styles.buttonTextGreen,
                flex: 1,
                fontWeight: "normal",
              }}
            >
              4. Once tou have found the word, click on "word found".
            </Text>
            <Text
              style={{
                ...styles.buttonTextGreen,
                flex: 1,
                fontWeight: "normal",
              }}
            >
              5. The clock starts ticking, it's time to debate.
            </Text>
            <Text
              style={{
                ...styles.buttonTextGreen,
                flex: 1,
                fontWeight: "normal",
              }}
            >
              6. Voting: Put each player back on the phone to vote.
            </Text>
            <Text
              style={{
                ...styles.buttonTextGreen,
                flex: 1,
                fontWeight: "normal",
              }}
            >
              7. End of the game
            </Text>
          </View>
          <TouchableOpacity
            style={{ ...styles.leafButtonPink }}
            onPress={() => {
              navigation.goBack()
            }}
          >
            <Text style={{ ...styles.buttonTextGreen }}>Okay</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <Footer />
    </View>
  )
}
