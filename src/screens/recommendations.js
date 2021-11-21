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
} from 'react-native';

export default class Recommndations extends React.Component {
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

  fetchCats() {
    this.setState({refreshing: true});
    // const MarvelList = [
    //   {id: 1, name: 'Mailk Powder',quantity:4.75},
    //   {id: 2, name: 'Apple Juice',quantity:4.3},
    //   {id: 3, name: 'Cheese',quantity:3},
    //   {id: 4, name: 'The Collector',quantity:2},
    // ];
    fetch(
      'https://2344-2402-4000-2280-97f7-1d26-d91a-7ab9-7e1e.ngrok.io/api/item/rating',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([
          5.0, 0.0, 0.0, 0.0, 0.0, 2.0, 0.0, 0.0, 0.0, 5.0, 0.0, 0.0, 0.0, 0.0,
          0.0,
        ]),
      },
    )
      .then(res => res.json())
      .then(resJson => {
        this.setState({data: resJson});
        this.setState({refreshing: false});
      })
      .catch(e => console.log(e));

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
        {data.item.name} :- {data.item.quantity}
      </Text>
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
        <Text
          style={{
            fontSize: 35,
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: 20,
          }}>
          {' '}
          You Would love to try
        </Text>
        <Text style={{fontSize: 25, fontWeight: 'bold', textAlign: 'center'}}>
          Item :- Probabiliy
        </Text>
        <FlatList
          data={this.state.data}
          renderItem={item => this.renderItemComponent(item)}
          keyExtractor={item => item.id.toString()}
          ItemSeparatorComponent={this.ItemSeparator}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
        />
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
