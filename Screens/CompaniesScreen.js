import React, { Component } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SearchBar from "react-native-dynamic-search-bar";
import { auth } from "../firebase";
import { firestore } from "../firebase";
export default class CompaniesScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      companyName: "",
      email: "",
      goods: {},
      phoneNumber: "",
      address: "",
      country: "",
      state: "",
      city: "",
      pincode: "",
      gstNo: "",

      results: [],
      filterResults: [],
      companyID: "",
      searchName: "",
      searchEmail: "",
      searchPhone: "",
    };
  }
  componentDidMount() {
    this.getCompanies();
  }

  getCompanies = async () => {
    const companies = await firestore
      .collection("Users")
      .doc(auth.currentUser.uid)
      .collection("Companies")
      .orderBy("companyName")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          this.setState({
            results: this.state.results.concat({
              ...documentSnapshot.data(),
              id: documentSnapshot.id,
            }),
            filterResults: this.state.results.concat({
              ...documentSnapshot.data(),
              id: documentSnapshot.id,
            }),
          });
        });
      });
  };

  searchFilterName(text) {
    if (text) {
      const newData = this.state.results.filter((item) => {
        const itemData = item.companyName
          ? item.companyName.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        // console.log(this.state.filterResults);
        // console.log(typeof itemData);

        return itemData.indexOf(textData) > -1;
      });
      this.setState({
        filterResults: newData,
        searchName: text,
      });
    } else {
      this.setState({
        filterResults: this.state.results,
        searchName: text,
      });
    }
  }

  searchFilterEmail(text) {
    if (text) {
      const newData = this.state.results.filter((item) => {
        const itemData = item.email
          ? item.email.toUpperCase()
          : "".toUpperCase();
        // console.log(itemData);
        const textData = text.toUpperCase();
        // console.log(this.state.filterResults);

        return itemData.indexOf(textData) > -1;
      });
      this.setState({
        filterResults: newData,
        searchEmail: text,
      });
    } else {
      this.setState({
        filterResults: this.state.results,
        searchEmail: text,
      });
    }
  }

  searchFilterPhone(text) {
    if (text) {
      const newData = this.state.results.filter((item) => {
        const itemData = item.phoneNumber
          ? item.phoneNumber.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        // console.log(this.state.filterResults);

        return itemData.indexOf(textData) > -1;
      });
      this.setState({
        filterResults: newData,
        searchPhone: text,
      });
    } else {
      this.setState({
        filterResults: this.state.results,
        searchPhone: text,
      });
    }
  }

  render() {
    const { navigation } = this.props;
    return (
      <View>
        <View style={styles.search}>
          <SearchBar
            placeholder="Name"
            style={styles.searchBar}
            fontSize={15}
            onChangeText={(text) => {
              this.searchFilterName(text);
            }}
            // fontColor="#0782f9"
            // backgroundColor="#0782f9"
          />
          <SearchBar
            placeholder="Email"
            style={styles.searchBar}
            fontSize={15}
            onChangeText={(text) => {
              this.searchFilterEmail(text);
            }}
            // fontColor="#0782f9"
            // backgroundColor="#0782f9"
          />
          <SearchBar
            placeholder="Phone"
            style={styles.searchBar}
            fontSize={15}
            onChangeText={(text) => {
              this.searchFilterPhone(text);
            }}
            keyboardType="number-pad"
            // fontColor="#0782f9"
            // backgroundColor="#0782f9"
          />
        </View>
        <Button
          title="Add Company"
          onPress={() => {
            navigation.navigate("AddCompany");
          }}
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
                Email
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
                Phone Number
              </Text>
            </View>
            {this.state.filterResults.map((res, key) => {
              return (
                <TouchableOpacity
                  key={res.id}
                  style={styles.company}
                  onPress={() => {
                    this.setState({
                      companyID: res.id,
                    });
                    // console.log(this.state.companyID);

                    navigation.navigate("Items", {
                      companyID: res.id,
                    });
                  }}
                >
                  {/* <Text style={styles.companyInfo}>{res[1]}</Text> */}
                  <Text style={styles.companyInfo}>{res.companyName}</Text>
                  <Text style={styles.companyInfo}>{res.email}</Text>
                  <Text style={styles.companyInfo}>{res.phoneNumber}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  searchBar: {
    marginTop: 20,
    maxWidth: "30%",
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
  search: {
    justifyContent: "space-evenly",
    display: "flex",
    flexDirection: "row",
  },
});
