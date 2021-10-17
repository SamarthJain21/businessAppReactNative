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

export default class addItemScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      companyID: this.props.route.params.companyID,
      itemName: "",
      itemSize: "",
      itemThickness: "",
    };
  }
  componentDidMount() {
    this.props.route.params.itemName
      ? this.setState({
          itemName: this.props.route.params.itemName,
        })
      : this.setState({
          itemName: "",
        });
  }
  addItem = async () => {
    try {
      firestore
        .collection("Users")
        .doc(auth.currentUser.uid)
        .collection("Companies")
        .doc(this.state.companyID)
        .collection("Items")
        .add({
          itemName: this.state.itemName,
          itemSize: this.state.itemSize,
          itemThickness: this.state.itemThickness,
        });
      this.props.navigation.replace("Items", {
        companyID: this.state.companyID,
      });

      console.log("item added");
    } catch (error) {
      alert(error);
    }
  };
  addItem1 = async () => {
    try {
      firestore
        .collection("Users")
        .doc(auth.currentUser.uid)
        .collection("Companies")
        .doc(this.state.companyID)
        .collection("Items")
        .add({
          itemName: this.state.itemName,
          itemSize: this.state.itemSize,
          itemThickness: this.state.itemThickness,
        });
      this.props.navigation.replace("AddItem", {
        companyID: this.state.companyID,
        itemName: this.state.itemName,
      });

      console.log("item added");
    } catch (error) {
      alert(error);
    }
  };
  render() {
    const { navigation } = this.props;
    // console.log(this.state.companyID);
    return (
      <ScrollView>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <Text style={{ fontSize: 30, marginBottom: 20 }}>Add an Item</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Item Name"
              value={this.state.itemName}
              onChangeText={(text) =>
                this.setState({
                  itemName: text,
                })
              }
              style={styles.input}
            />
            <TextInput
              placeholder="Item Size"
              value={this.state.itemSize}
              onChangeText={(text) =>
                this.setState({
                  itemSize: parseFloat(text),
                })
              }
              keyboardType="numeric"
              style={styles.input}
            />
            <TextInput
              placeholder="Item Thickness"
              value={this.state.itemThickness}
              onChangeText={(text) =>
                this.setState({
                  itemThickness: parseFloat(text),
                })
              }
              keyboardType="numeric"
              style={styles.input}
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={this.addItem1} style={[styles.button]}>
              <Text style={styles.buttonText}>
                Add Another size for same item
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.addItem} style={[styles.button]}>
              <Text style={styles.buttonText}>Add Item and exit</Text>
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
    marginTop: 20,
  },
  button: {
    backgroundColor: "#0782f9",
    width: "100%",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
  },
});
