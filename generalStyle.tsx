import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#BCBCBC",
  },
  title: {
    color: "#338A3E",
    fontSize: 24,
    fontWeight: "bold",
  },
  buttonTouchable: {
    margin: 5,
    width: "100%",
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#7F0000",
    borderRadius: 10,
  },
  buttonTouchablePetit: {
    margin: 5,
    width: "5%",
    flex : 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#7F0000",
    borderRadius: 10,
  },
  buttonTouchableRight: {
    margin: 5,
    width: "50%",
    justifyContent: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#7F0000",
    borderRadius: 10,
  },
 
  buttonTouchableDisabled: {
    margin: 5,
    width: "100%",
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "grey",
    borderRadius: 10,
  },
  buttonTouchablePetitDisabled: {
    margin: 5,
    width: "5%",
    flex : 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "grey",
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  textNormal: {
    color : "#338A3E",
    fontSize: 14,
    fontWeight: "bold",
  },

})
