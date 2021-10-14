import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  View,
  Image,
  TouchableOpacity,Dimensions,Text
} from 'react-native';

export default class Remainder extends React.Component {

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
    const MarvelList = [
      {id: 1, name: 'Mailk Powder',quantity:3},
      {id: 2, name: 'Apple Juice',quantity:2},
      {id: 3, name: 'Cheese',quantity:1},
      {id: 4, name: 'Eggs',quantity:1},
    ];

            this.setState({ data: MarvelList });
            this.setState({ refreshing: false });
    // fetch('https://api.bigoven.com/grocerylist')
    //     .then(res => res.json())
    //     .then(resJson => {
    //         this.setState({ data: resJson });
    //         this.setState({ refreshing: false });
    //     }).catch(e => console.log(e));
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
    <Text style={{fontSize: 20, fontWeight: 'bold',textAlign: 'center'}}>{data.item.name} :- {data.item.quantity}</Text>

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
         <Text style={{fontSize: 35, fontWeight: 'bold',textAlign: 'center',marginBottom:20}}> You may run out of</Text>
         <Text style={{fontSize: 25, fontWeight: 'bold',textAlign: 'center'}}>Item :- Days</Text>
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
