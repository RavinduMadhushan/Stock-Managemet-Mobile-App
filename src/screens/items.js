import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Text,
  ScrollView,
} from 'react-native';
import StarRating from 'react-native-star-rating-widget';

export default class Items extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      refreshing: true,
    };
  }

  componentDidMount() {
    this.fetchCats();
  }

  setRating(number, id) {
    // console.log(number);
    // console.log(id);
    let values = this.state.data;
    // console.log(values);
    for (var i in values) {
      if (values[i].id == id) {
        values[i].quantity = number;
        console.log(values[i].id);
        console.log(values[i].quantity);
        //Stop this loop, we found it!
      }
    }
    this.setState({data: values});
    // objIndex = myArray.findIndex((obj => obj.id == 1));
    // myArray[objIndex].name = "Laila"
  }

  fetchCats() {
    this.setState({refreshing: true});
    let MarvelList = [
      {id: 1, name: 'Lux Soap', quantity: 0},
      {id: 2, name: 'Lifeboy Soap', quantity: 0},
      {id: 3, name: 'Velvet Soap', quantity: 5},
      {id: 4, name: 'Ceylon Tea', quantity: 0},
      {id: 5, name: 'Dilmah Tea', quantity: 0},
      {id: 6, name: 'Kotmale Milk', quantity: 0},
      {id: 7, name: 'Kotmale Milk ', quantity: 0},
      {id: 8, name: 'Anchor Milk Powder', quantity: 0},
      {id: 9, name: 'Ratthi Milk Powder ', quantity: 0},
      {id: 10, name: 'Ambewela Fresh Milk', quantity: 0},
      {id: 11, name: 'Happy Cow  Chees', quantity: 0},
      {id: 12, name: 'Anchor Butter', quantity: 0},
      {id: 13, name: 'Elephant House  Sausages', quantity: 0},
      {id: 14, name: 'Goldi Sausages', quantity: 0},
      {id: 15, name: 'Keells Meat Ball', quantity: 0},
    ];
    // fetch('http://34.121.6.202:5000/api/item/rating', {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify([
    //     5.0, 0.0, 0.0, 0.0, 0.0, 2.0, 0.0, 0.0, 0.0, 5.0, 0.0, 0.0, 0.0, 0.0,
    //     0.0,
    //   ]),
    // })
    //   .then(res => res.json())
    //   .then(resJson => {
    //     console.log('hello');
    //     let arr = JSON.parse(resJson.rating);
    //     for (let index = 0; index < MarvelList.length; index++) {
    //       const element = MarvelList[index];
    //       element.quantity = Math.round(parseFloat(arr[index]));
    //       // console.log(element);
    //     }
    //     // console.log('xxxxxxx');
    //     console.log(MarvelList);
    //     this.setState({data: MarvelList});
    //     this.setState({refreshing: false});
    //   })
    //   .catch(e => console.log(e));
    this.setState({data: MarvelList});
    this.setState({refreshing: false});
  }

  renderItemComponent = data => (
    <TouchableOpacity
      style={[
        {margin: 20},
        {
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'skyblue',
          width: Dimensions.get('window').width - 40,
          borderRadius: 10,
          height: 80,
        },
      ]}
      activeOpacity={0.8}>
      <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>
        {data.item.name}
      </Text>
      <StarRating
        rating={data.item.quantity}
        onChange={number => this.setRating(number, data.item.id)}
      />
    </TouchableOpacity>
  );

  ItemSeparator = () => (
    <View
      style={{
        height: 2,
        backgroundColor: 'rgba(0,0,0,0.5)',
        marginLeft: 10,
        marginRight: 10,
      }}
    />
  );

  handleRefresh = () => {
    this.setState({refreshing: false}, () => {
      this.fetchCats();
    }); // call fetchCats after setting the state
  };

  render() {
    return (
      <SafeAreaView>
        <ScrollView>
          <FlatList
            data={this.state.data}
            renderItem={item => this.renderItemComponent(item)}
            keyExtractor={item => item.id.toString()}
            ItemSeparatorComponent={this.ItemSeparator}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 300,
    margin: 10,
    backgroundColor: '#FFF',
    borderRadius: 6,
  },
  image: {
    height: '100%',
    borderRadius: 4,
  },
});
