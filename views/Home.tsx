import React, { FunctionComponent } from "react"
import { View, Text } from "react-native"

interface HomeProps {}

export const Home: FunctionComponent<HomeProps> = ({}: HomeProps) => {
  return (
    <View>
      <Text>Home</Text>
    </View>
  )
}
