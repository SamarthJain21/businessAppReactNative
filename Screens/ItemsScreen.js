import React, { Component } from "react";
import { auth, firestore } from "../firebase";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SearchBar from "react-native-dynamic-search-bar";

export default class ItemsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyID: this.props.route.params.companyID,
      results: [],
    };
  }

  componentDidMount() {
    this.getItems();
  }
  getItems = async () => {
    const items = await firestore
      .collection("Users")
      .doc(auth.currentUser.uid)
      .collection("Companies")
      .doc(this.state.companyID)
      .collection("Items")
      .orderBy("itemName")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          this.setState({
            results: this.state.results.concat({
              itemID: documentSnapshot.id,
              itemName: documentSnapshot.data().itemName,
              itemSize: documentSnapshot.data().itemSize,
              itemThickness: documentSnapshot.data().itemThickness,
            }),
          });
        });
      });
  };

  render() {
    const { navigation } = this.props.navigation;
    this.getItems;
    // console.log(this.state.results);
    return (
      <View>
        <SearchBar
          placeholder="Search Item thickness/size/name"
          style={styles.searchBar}
          fontSize={15}
          // fontColor="#0782f9"
          // backgroundColor="#0782f9"
        />

        <ScrollView>
          <View style={styles.companies}>
            <View style={styles.companyTitle}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  marginHorizontal: 5,
                  flex: 1,
                  textAlign: "center",
                }}
              >
                Name
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  marginHorizontal: 5,
                  flex: 1,
                  textAlign: "center",
                }}
              >
                Size
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  marginHorizontal: 5,
                  flex: 1,
                  textAlign: "center",
                }}
              >
                Thickness
              </Text>
            </View>
            {this.state.results.map((res, key) => {
              return (
                <TouchableOpacity key={res.itemID} style={styles.company}>
                  <Text style={styles.companyInfo}>{res.itemName}</Text>
                  <Text style={styles.companyInfo}>{res.itemSize}</Text>
                  <Text style={styles.companyInfo}>{res.itemThickness}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
        <Button
          title="Add Item"
          onPress={() => {
            this.props.navigation.navigate("AddItem", {
              companyID: this.state.companyID,
            });
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchBar: {
    marginTop: 20,
  },
  companies: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  company: {
    display: "flex",
    flexDirection: "row",
    marginVertical: 5,
    justifyContent: "center",
  },
  companyTitle: {
    display: "flex",
    flexDirection: "row",
  },
  companyInfo: {
    flex: 1,
    alignSelf: "stretch",
    paddingTop: 5,
    paddingHorizontal: 5,
    fontSize: 16,
    flexWrap: "wrap",
    // maxWidth: "30%",
    textAlign: "center",
  },
});
