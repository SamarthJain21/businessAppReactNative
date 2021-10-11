import React, { Component } from "react";
import { Button, Text, View } from "react-native";
import { Searchbar } from "react-native-paper";
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
    };
  }
  render() {
    const { navigation } = this.props;

    return (
      <View>
        <Text>Companies Screen</Text>
        <Searchbar value="Search company / size" />
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
