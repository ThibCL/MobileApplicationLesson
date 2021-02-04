import React, { FunctionComponent } from "react"
import { View, Text } from "react-native"

interface FooterProps {}

export const Footer: FunctionComponent<FooterProps> = () => {
  return (
    <View
      style={{
        backgroundColor: "#004d40",
        flex: 2,
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          fontSize: 25,
          color: "white",
          textAlign: "center",
          textAlignVertical: "center",
        }}
      >
        INSIDER
      </Text>
      <Text
        style={{
          fontSize: 20,
          color: "white",
          textAlignVertical: "center",
          textAlign: "center",
        }}
      >
        Online boardgame
      </Text>
    </View>
  )
}
