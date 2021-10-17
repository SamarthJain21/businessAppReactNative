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
      companyID: "",
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
          });
        });
      });
  };
  render() {
    const { navigation } = this.props;
    return (
      <View>
        <SearchBar
          placeholder="Search company by name/email/phone"
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
            {/* {console.log(this.state.results)} */}
            {this.state.results.map((res, key) => {
              // console.log(res);
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
        <Button
          title="Add Company"
          onPress={() => {
            navigation.navigate("AddCompany");
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
