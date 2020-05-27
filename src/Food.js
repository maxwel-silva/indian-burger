import React, { Component } from 'react';

import { Text, FlatList, Image, StyleSheet, Dimensions, View, ScrollView, TextInput, TouchableOpacity, Swiper } from 'react-native'

const { height, width } = Dimensions.get('window');

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataBanner: [],
      dataCategories: [],
      dataFood: [],
      selectCatg: 0
    }
  }

  componentDidMount() {
    const url = 'http://tutofox.com/foodapp/api.json'
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataBanner: responseJson.banner,
          dataCategories: responseJson.categories,
          dataFood: responseJson.food
        })

      })
      .catch((error) => {
        console.error(error)
      })
  }

  render() {
    return (
      <ScrollView>
        <View style={{ flex: 1, backgroundColor: '#F1F1F1' }}>
          <View style={{ width: width, alignItems: 'center' }} >
            <Image style={{ height: 150, width: width / 2, margin: 10, marginTop: 50 }} resizeMode="contain" source={require("../image/indian.png")} />
            <Swiper style={{ height: width / 2 }} showsButtons={false} autoplay={true} autoplayTimeout={2}>
              {
                this.state.dataBanner.map((itembann) => {
                  return (
                    <Image style={styles.imageBanner} resizeMode='contain' source={{ uri: itembann }} />
                  )
                })
              }
            </Swiper>
            <View style={{ height: 20 }} />
          </View>

          <View style={{ width: width, paddingVertical: 20, backgroundColor: 'white' }}>
            <FlatList
              horizontal={true}
              data={this.state.dataCategories}
              renderItem={({ item }) => this._renderItem(item)}
              keyExtractor={(item, index) => index.toString()}
            />
            <FlatList
              //horizontal={true}
              data={this.state.dataFood}
              numColumns={2}
              renderItem={({ item }) => this._renderItemFood(item)}
              keyExtractor={(item, index) => index.toString()}
            />
            <View style={{ height: 20 }} />
          </View>

        </View>
      </ScrollView>
    )
  }

  _renderItem(item) {
    return (
      <TouchableOpacity style={[styles.divCategorie, { backgroundColor: item.color }]}
        onPress={() => this.setState({ selectCatg: item.id })}>
        <Image
          style={{ width: 100, height: 80 }}
          resizeMode='contain'
          source={{ uri: item.image }} />
        <Text style={{ fontWeight: 'normal', fontSize: 20 }}>{item.name}</Text>
      </TouchableOpacity>
    )
  }

  _renderItemFood(item) {
    let catg = this.state.selectCatg
    if (catg == 0 || catg == item.categorie) {
      return (
        <TouchableOpacity style={styles.divFood}>
          <Image
            style={styles.imageFood}
            resizeMode="contain"
            source={{ uri: item.image }} />
          <View style={{ height: ((width / 2) - 20) - 90, backgroundColor: 'transparent', width: ((width / 2) - 20) - 10 }} />
          <Text style={{ fontWeight: 'normal', fontSize: 22, textAlign: 'center' }}>
            {item.name}
          </Text>
          <Text>Descp Food and Details</Text>
          <Text style={{ fontSize: 20, color: "green" }}>${item.price}</Text>
        </TouchableOpacity>
      )
    }
  }
}

const styles = StyleSheet.create({
  imageBanner: {
    height: width / 2,
    width: width - 40,
    marginHorizontal: 20
  },

  divCategorie: {
    backgroundColor: 'red',
    margin: 5, alignItems: 'center',
    padding: 10
  },

  titleCatg: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10
  },
  
  imageFood: {
    width: ((width / 2) - 20) - 10,
    height: ((width / 2) - 20) - 30,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: -45
  },

  divFood: {
    width: (width / 2) - 20,
    padding: 10,
    marginTop: 55,
    marginBottom: 5,
    marginLeft: 14,
    alignItems: 'center',
    elevation: 8,
    shadowOpacity: 0.3,
    shadowRadius: 50,
    backgroundColor: 'white',
  }
})