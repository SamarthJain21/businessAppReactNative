import React, { Component } from "react";
import { firestore } from "../firebase";
import { auth } from "../firebase";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default class AddCompanyScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      companyName: "",
      email: "",
      phoneNumber: "",
      gstNo: "",
      address: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
    };
  }

  addCompany = async () => {
    try {
      firestore
        .collection("Users")
        .doc(auth.currentUser.uid)
        .collection("Companies")
        .add({
          companyName: this.state.companyName,
          email: this.state.email,
          phoneNumber: this.state.phoneNumber,
          gstNo: this.state.gstNo,
          address: this.state.address,
          country: this.state.country,
          state: this.state.state,
          city: this.state.city,
          pincode: this.state.pincode,
        });
      this.props.navigation.navigate("Companies");

      console.log("user added");
    } catch (error) {
      alert(error);
    }
  };

  render() {
    const { navigation } = this.props;
    return (
      <ScrollView>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <Text style={{ fontSize: 30, marginBottom: 20 }}>Add a company</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Company Name"
              value={this.state.companyName}
              onChangeText={(text) =>
                this.setState({
                  companyName: text,
                })
              }
              style={styles.input}
            />

            <TextInput
              placeholder="Email"
              value={this.state.email}
              onChangeText={(text) =>
                this.setState({
                  email: text,
                })
              }
              style={styles.input}
            />

            <TextInput
              placeholder="Phone Number"
              value={this.state.phoneNumber}
              onChangeText={(text) =>
                this.setState({
                  phoneNumber: text,
                })
              }
              keyboardType="numeric"
              style={styles.input}
            />

            <TextInput
              placeholder="Address"
              value={this.state.address}
              onChangeText={(text) =>
                this.setState({
                  address: text,
                })
              }
              style={styles.input}
            />

            <TextInput
              placeholder="country"
              value={this.state.country}
              onChangeText={(text) =>
                this.setState({
                  country: text,
                })
              }
              style={styles.input}
            />

            <TextInput
              placeholder="state"
              value={this.state.state}
              onChangeText={(text) =>
                this.setState({
                  state: text,
                })
              }
              style={styles.input}
            />

            <TextInput
              placeholder="city"
              value={this.state.city}
              onChangeText={(text) =>
                this.setState({
                  city: text,
                })
              }
              style={styles.input}
            />

            <TextInput
              placeholder="pincode"
              keyboardType="numeric"
              value={this.state.pincode}
              onChangeText={(text) =>
                this.setState({
                  pincode: text,
                })
              }
              style={styles.input}
            />

            <TextInput
              placeholder="gstNo"
              value={this.state.gstNo}
              onChangeText={(text) =>
                this.setState({
                  gstNo: text,
                })
              }
              style={styles.input}
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={this.addCompany} style={[styles.button]}>
              <Text style={styles.buttonText}>Add Company</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  inputContainer: {
    width: "80%",
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0782f9",
    width: "100%",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782f9",
    borderWidth: 0.8,
  },
  buttonOutlineText: {
    color: "#0782f9",
    fontWeight: "700",
    fontSize: 12,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
