import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';

class HomeScreen extends Component {
  state = {
    id: '',
    lineid: '',
  };

  constructor(props) {
    super(props);

    this.state = {id: '', lineid: ''};
  }

  static navigationOptions = {
    title: 'Welcome',
    headerStyle: {
      backgroundColor: '#018786',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  componentDidMount() {
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
        // alert(resJson);
        // this.setState({data: resJson});
        // this.setState({refreshing: false});
      })
      .catch(e => console.log(e));
  }
  render() {
    let width = Dimensions.get('window').width - 40;
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#ececec',
        }}>
        <StatusBar backgroundColor="#018786" barStyle="light-content" />
        <TouchableOpacity
          style={[
            {margin: 20},
            {
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'skyblue',
              width: width,
              borderRadius: 10,
              height: 80,
            },
          ]}
          onPress={() => this.props.navigation.navigate('recommnder')}
          activeOpacity={0.8}>
          <Text style={{fontSize: 30, fontWeight: 'bold'}}>
            You Would love to try
          </Text>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>
            (Recommendations)
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            {margin: 20},
            {
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'skyblue',
              width: width,
              borderRadius: 10,
              height: 80,
            },
          ]}
          onPress={() => this.props.navigation.navigate('remainder')}
          activeOpacity={0.8}>
          <Text style={{fontSize: 30, fontWeight: 'bold'}}>May runout of</Text>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>(Reminders)</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            {margin: 20},
            {
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'skyblue',
              width: width,
              borderRadius: 10,
              height: 80,
            },
          ]}
          onPress={() => this.props.navigation.navigate('shopping')}
          activeOpacity={0.8}>
          <Text style={{fontSize: 30, fontWeight: 'bold'}}>Today Shopping</Text>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>
            (Shopping List)
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            {margin: 20},
            {
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'skyblue',
              width: width,
              borderRadius: 10,
              height: 80,
            },
          ]}
          onPress={() => this.props.navigation.navigate('rate')}
          activeOpacity={0.8}>
          <Text style={{fontSize: 30, fontWeight: 'bold'}}>Rate ur Items</Text>
        </TouchableOpacity>

        <Text style={{fontSize: 35, fontWeight: 'bold'}}>Main Menu</Text>
      </View>
    );
  }
}

export default HomeScreen;
