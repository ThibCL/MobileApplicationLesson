import React, { FunctionComponent, useContext } from "react"
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native"
import { styles } from "../generalStyle"
import { StackNavigationProp } from "@react-navigation/stack"
import { StackParamList } from "../App"
import * as Google from "expo-google-app-auth"
import { GameContext } from "../GameContext"
import { useState } from "react"

type ScreenNavigationProp = StackNavigationProp<StackParamList, "Auth">

interface AuthProps {
  navigation: ScreenNavigationProp
}

export const Auth: FunctionComponent<AuthProps> = ({
  navigation,
}: AuthProps) => {
  const game = useContext(GameContext)

  const [loading, setLoading] = useState<boolean>(false)

  const signInWithGoogleAsync = async () => {
    const result = await Google.logInAsync({
      androidClientId:
        "578157949333-l0ufg3vlp0l0msbbdloq3nna5bdm2r66.apps.googleusercontent.com",
      iosClientId:
        "578157949333-gdsu9a0325a42eiqf5mqt042gijhim3v.apps.googleusercontent.com",
      scopes: ["profile", "email"],
    })

    if (result.type === "success" && result.accessToken) {
      let resp = await fetch(game.apiClient.url + "/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: result.idToken,
        }),
      })

      if (resp.status === 200) {
        let body = await resp.json()
        game.setToken(body.token)
        game.setUser(result.user)
        navigation.replace("Home")
      } else {
        alert("User does not exist")
        setLoading(false)
      }
    } else {
      alert("Error when log in")
      setLoading(false)
    }
  }

  const login = () => {
    setLoading(true)
    signInWithGoogleAsync()
  }

  return (
    <View style={{ ...styles.container }}>
      {loading ? (
        <ActivityIndicator size="large" color="#7F0000" />
      ) : (
        <TouchableOpacity style={styles.buttonVote} onPress={login}>
          <Text style={{ ...styles.buttonTextGreen, color: "white" }}>
            Sign in with Google
          </Text>
        </TouchableOpacity>
      )}
    </View>
  )
}
