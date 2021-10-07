import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { auth } from "../firebase";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      companyName: "",
      email: "",
      gstNo: "",
    };
    this.getData = this.getData.bind(this);
    // console.log("inside constructor");
  }

  getData = async () => {
    // console.log("inside get Data");
    console.log(auth.currentUser.uid);
    const requestURL = "http://192.168.18.7:8000/user/" + auth.currentUser.uid;
    // console.log(requestURL);
    try {
      let response = await fetch(requestURL);
      let result = await response.json();
      // console.log(result);
      this.setState({
        companyName: result.companyName,
        email: result.email,
        gstNo: result.gstNo,
      });
    } catch (error) {
      alert(error);
    }
  };

  componentDidMount = () => {
    if (auth.currentUser) {
      console.log("user exists");
      this.getData();
    }
    // console.log("inside did mount");
  };

  render() {
    console.log("inside render");
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

          {/*

          <Icon
            name="logout"
            size="15px"
            style={{
              backgroundColor: "black",
              color: "white",
            }}
          />
          */}
        </View>

        <View style={styles.container}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    // justifyContent: "space-between",
  },
  container: {
    alignItems: "center",
    alignSelf: "center",
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
