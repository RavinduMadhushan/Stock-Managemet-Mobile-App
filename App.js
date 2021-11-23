/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import LoginScreen from './src/screens/login';
import ExampleApp from './src/screens/camera';
import Recommndations from './src/screens/recommendations';
import Remainder from './src/screens/remainder';
import Shopping from './src/screens/shopping';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthContext} from './src/screens/context';
import Items from './src/screens/items';
import {AsyncStorage} from 'react-native';
import {View, ActivityIndicator, Modal, Image} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Home from './src/screens/home';
import Policy from './src/screens/policy';

export default function App({navigation}) {
  const Stack = createStackNavigator();
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      console.log(action.type);
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    setTimeout(async () => {
      const bootstrapAsync = async () => {
        let userToken;

        try {
          userToken = await AsyncStorage.getItem('u');
        } catch (e) {}
        dispatch({type: 'RESTORE_TOKEN', token: userToken});
      };

      bootstrapAsync();
    }, 1000);
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        var data = {
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          contactNumber: data.contactNumber,
          photo: data.photo,
        };
        console.log('SIGNIN');
        // console.log(data);
        try {
          fetch(
            `http://1f69-2402-4000-2080-b25d-5522-487b-483d-8358.ngrok.io/customer`,
            {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            },
          )
            .then(res => res.json())
            .then(async res => {
              console.log('res');
              console.log(res.firstName);
              if (res) {
                await AsyncStorage.setItem('u', JSON.stringify(res.firstName));

                dispatch({type: 'SIGN_IN', token: res.firstName});
              } else {
                alert('Invalid Username or Password');
              }
            })
            .catch(err => {
              alert('Invalid Username or Password');
            });
        } catch (errors) {
          alert('Invalid Username or Password');
        }
      },
      signOut: () => dispatch({type: 'SIGN_OUT'}),
      signUp: async data => {
        dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
      },
    }),
    [],
  );

  if (state.isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image
          style={{width: 300, height: 300, margin: 150}}
          source={require('./src/images/CS.jpg')}
        />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          {state.userToken == null ? (
            // No token found, user isn't signed in
            <>
              <Stack.Screen name="policy" component={Policy} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="camera" component={ExampleApp} />
            </>
          ) : (
            // User is signed in
            <>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="recommnder" component={Recommndations} />
              <Stack.Screen name="shopping" component={Shopping} />
              <Stack.Screen name="remainder" component={Remainder} />
              <Stack.Screen name="rate" component={Items} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
      {/* <NavigationContainer>
     
        {state.userToken == null ? (
           <Stack.Navigator   screenOptions={{
            headerShown: false
          }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator   screenOptions={{
            headerShown: false
          }}>
          <Stack.Screen name="Home" component={Home} />
          </Stack.Navigator>
        )}
     
      
  </NavigationContainer> */}
    </AuthContext.Provider>
  );
}
