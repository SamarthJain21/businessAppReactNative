import React, { Component } from "react";
import { auth } from "../firebase";
import { firestore } from "../firebase";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SearchBar from "react-native-dynamic-search-bar";

export default class SalesScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    const { navigation } = this.props;
    return (
      <Text>Coming soon</Text>
      // <View>
      //   <SearchBar
      //     placeholder="Search company / size"
      //     style={styles.searchBar}
      //     fontSize={15}
      //     // fontColor="#0782f9"
      //     // backgroundColor="#0782f9"
      //   />

      //   <Button
      //     title="Add Sale"
      //     onPress={() => {
      //       navigation.navigate("AddSale");
      //     }}
      //   />
      // </View>
    );
  }
}

// const styles = StyleSheet.create({
//   searchBar: {
//     marginTop: 20,
//   },
//   companies: {
//     marginTop: 20,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   company: {
//     display: "flex",
//     flexDirection: "row",
//     marginVertical: 5,
//     justifyContent: "center",
//   },
//   companyTitle: {
//     display: "flex",
//     flexDirection: "row",
//   },
//   companyInfo: {
//     flex: 1,
//     alignSelf: "stretch",
//     paddingTop: 5,
//     paddingHorizontal: 5,
//     fontSize: 16,
//     flexWrap: "wrap",
//     // maxWidth: "30%",
//     textAlign: "center",
//   },
// });
