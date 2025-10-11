import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", marginTop: 5, width: "100%" },
  fundoEscuro: { backgroundColor: "#333" },
  formInput: {
    backgroundColor: "#fff",
    fontSize: 19,
    padding: 7,
    marginTop: 10,
    marginBottom: 10,
  },
  formButton: {
    padding: 12,
    backgroundColor: "#F58634",
    alignSelf: "center",
    alignItems: "center",
    width: "80%",
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 15,
  },
  formButtonText: { fontWeight: "bold", fontSize: 22, color: "#333" },
  loginText: {
    fontWeight: "bold",
    fontSize: 22,
    color: "#fff",
    margin: 50,
    alignSelf: "center",
  },
  menuButton: {
    margin: 10,
    height: 60,
    backgroundColor: "blue",
    borderRadius: 10,
    paddingHorizontal: 24,
    fontSize: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTextBig: { color: "#fff", fontWeight: "bold", fontSize: 24 },
});