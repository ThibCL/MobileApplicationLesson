import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#f5f5f5",
    borderTopLeftRadius: 50,
  },
  title: {
    color: "#004d40",
    fontSize: 24,
    fontWeight: "bold",
  },
  buttonTouchable: {
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 50,
    backgroundColor: "#004d40",
  },
  buttonTouchableDisabled: {
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "grey",
    borderRadius: 50,
  },
  buttonText: {
    textAlign: "center",
    textAlignVertical: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  textNormal: {
    color: "#338A3E",
    fontSize: 14,
    fontWeight: "bold",
  },
})

export const navigatorStyle = {
  headerStyle: { backgroundColor: "#004d40" },
  headerTitleAlign: "center",
  headerTintColor: "#FFFFFF",
  headerTitleStyle: { fontFamily: "serif" },
}
