import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Button } from "react-native";
import { auth } from "../firebase";
import { firestore } from "../firebase";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      companyName: "",
      email: "",
      gstNo: "",
    };
    // this.getData = this.getData.bind(this);
    // console.log("inside constructor");
  }

  getData = async () => {
    const users = await firestore
      .collection("Users")
      .doc(auth.currentUser.uid)
      .get();
    const user = users.data();
    // console.log(user);

    this.setState({
      companyName: user.companyName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      address: user.address,
      country: user.country,
      state: user.state,
      city: user.city,
      pincode: user.pincode,
      gstNo: user.gstNo,
    });

    // console.log("inside get Data");
    // console.log(auth.currentUser.uid);
    // const requestURL = "http://192.168.18.7:8000/user/" + auth.currentUser.uid;
    // // console.log(requestURL);
    // try {
    //   let response = await fetch(requestURL);
    //   let result = await response.json();
    //   // console.log(result);
    //   this.setState({
    //     companyName: result.companyName,
    //     email: result.email,
    //     gstNo: result.gstNo,
    //   });
    // } catch (error) {
    //   alert(error);
    // }
  };

  componentDidMount = () => {
    if (auth.currentUser) {
      console.log("user exists");
      this.getData();
    }
    // console.log("inside did mount");
  };

  render() {
    // console.log("inside render");
    const { navigation } = this.props;

    if (!auth.currentUser) {
      navigation.replace("Login");
    }

    const handleSignOut = () => {
      auth
        .signOut()
        .then(() => {
          navigation.replace("Login");
        })
        .catch((error) => alert(error.message));
    };

    return (
      <View style={styles.main}>
        <View style={styles.topBar}>
          <View style={styles.companyInfo}>
            <Text style={styles.companyName}>{this.state.companyName}</Text>
            <Text style={styles.textField}>{this.state.gstNo}</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSignOut}>
            <Text style={styles.buttonText}>Sign out</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.container}>
          <Button
            style={styles.viewCompany}
            title="View Companies"
            onPress={() => {
              navigation.navigate("Companies");
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  container: {
    alignSelf: "flex-start",
    marginLeft: 15,
    marginTop: 20,
  },
  button: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderColor: "#0782f9",
    borderWidth: 0.5,
    alignItems: "center",
    marginTop: 10,
  },
  topBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
    marginLeft: 10,
    justifyContent: "space-between",
  },
  buttonText: {
    color: "#0782f9",
    fontWeight: "700",
    fontSize: 14,
  },
  companyName: {
    color: "black",
    fontWeight: "700",
    fontSize: 20,
    marginTop: 15,
  },
  textField: {
    color: "black",
    fontWeight: "500",
    fontSize: 16,
  },
});
