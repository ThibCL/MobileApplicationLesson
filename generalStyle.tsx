import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#f5f5f5",
  },
  view: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#338A3E",
    fontSize: 24,
    fontWeight: "bold",
  },
  buttonTouchable: {
    margin: 5,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    width: "80%",
    backgroundColor: "#39796b",
  },
  buttonTouchableDisabled: {
    margin: 5,
    width: "80%",
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "grey",
    borderRadius: 10,
  },
  buttonText: {
    textAlign: "center",
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
  headerTintColor: "#FFFFFF",
  headerTitleStyle: { fontFamily: "serif" },
}
