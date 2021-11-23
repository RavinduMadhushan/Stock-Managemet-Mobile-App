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

export default class Shopping extends React.Component {
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
    let MarvelList = [];

    fetch('http://34.121.6.202:5000/api/purchase/prediction', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({item_id: 'aaa'}),
    })
      .then(res => res.json())
      .then(resJson => {
        if (resJson.new_prediction > 0) alert('You may run out of eggs soon');
        MarvelList = [{id: 1, name: 'EGG', quantity: resJson.new_prediction}];

        this.setState({data: MarvelList});
        this.setState({refreshing: false});
        // alert(resJson);
        // this.setState({data: resJson});
      })
      .catch(e => console.log(e));
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
          Today You Need to buy
        </Text>
        <Text style={{fontSize: 25, fontWeight: 'bold', textAlign: 'center'}}>
          Item :- Quantity
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
