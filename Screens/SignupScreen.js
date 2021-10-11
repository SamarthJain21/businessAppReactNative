import React, { Component, useState, useEffect } from "react";
// import firestore from "@react-native-firebase/firestore";
import { firestore } from "../firebase";

import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../firebase";

export default class SignupScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      companyName: "",
      email: "",
      password: "",
      // auth id is _id
      _id: "",
      phoneNumber: "",
      address: "",
      country: "",
      state: "",
      city: "",
      pincode: "",
      gstNo: "",
    };
    // this.handleSignUp = this.handleSignUp.bind(this);
  }

  postData = () => {
    console.log("inside post data");
    try {
      firestore
        .collection("Users")
        .doc(auth.currentUser.uid)
        .set({
          companyName: this.state.companyName,
          email: this.state.email,
          phoneNumber: this.state.phoneNumber,
          address: this.state.address,
          country: this.state.country,
          state: this.state.state,
          city: this.state.city,
          pincode: this.state.pincode,
          gstNo: this.state.gstNo,
        })
        .then(() => {
          console.log("User added");
        });
    } catch (error) {
      console.log(error);
      alert(error);
    }

    // fetch("http://192.168.18.7:8000/user/signup", {
    // console.log("jfjfjf")
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     companyName: this.state.companyName,
    //     email: this.state.email,
    //     _id: auth.currentUser.uid,
    //     phoneNumber: this.state.phoneNumber,
    //     address: this.state.address,
    //     country: this.state.country,
    //     state: this.state.state,
    //     city: this.state.city,
    //     pincode: this.state.pincode,
    //     gstNo: this.state.gstNo,
    //   }),
    // })
    //   .then(console.log(auth.currentUser.uid))
    //   .catch((error) => {
    //     alert(error);
    //   });
  };

  handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Registered with", user.email);
        if (user) {
          console.log("inside");
          this.postData();
        }
      })
      .catch((error) => alert(error.message));
  };

  render() {
    const { navigation } = this.props;

    return (
      <ScrollView>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
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
              placeholder="Password"
              value={this.state.password}
              onChangeText={(text) =>
                this.setState({
                  password: text,
                })
              }
              style={styles.input}
              secureTextEntry
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
            <TouchableOpacity
              onPress={this.handleSignUp}
              style={[styles.button]}
            >
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Login");
              }}
              style={[styles.button, styles.buttonOutline]}
            >
              <Text style={styles.buttonOutlineText}>
                Already have an account? Login now
              </Text>
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
