import React, { FunctionComponent } from "react"
import { View, Text, Button } from "react-native"
import { StackNavigationProp } from "@react-navigation/stack"
import { StackParamList } from "../App"

type ScreenNavigationProp = StackNavigationProp<StackParamList, "Home">

interface HomeProps {
  navigation: ScreenNavigationProp
}

export const Home: FunctionComponent<HomeProps> = ({
  navigation,
}: HomeProps) => {
  return (
    <View>
      <Text>Home sweet home</Text>
      <Button title="Rules" onPress={() => navigation.navigate("Rules")} />
    </View>
  )
}
