import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  Pressable,
  Modal,
  TouchableOpacity,
} from 'react-native';
import api from './url';
import {AuthContext} from './context';
import {RNCamera} from 'react-native-camera';


const LoginScreen = ({navigation: {navigate}}) => {

  let {signIn} = React.useContext(AuthContext);
  const [firstName, setfirstName] = React.useState('');
  const [lastName, setlastName] = React.useState('');
  const [address, setaddress] = React.useState('');
  const [contactNumber, setcontactNumber] = React.useState('');
  const [photo, setphoto] = React.useState('');
  const [modalVisible, setModalVisible] = useState(false);
  let cameraRef = useRef(null);

  async function takePicture() {
    console.log(
      'camera',
    );
    if (cameraRef) {
      const options = {quality: 0.5, base64: true};
      const data = await cameraRef.current.takePictureAsync(options);
      console.log(data.base64)
      setphoto(data.base64)

      setModalVisible(false);
    }
  }

  return (
    <View style={styles.container}>
      <Image
        style={{width: 160, height: 160, marginTop: 150}}
        source={require('../images/CS.png')}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <RNCamera
          ref={cameraRef}
          style={styles.preview}
          type={RNCamera.Constants.Type.front}
          flashMode={RNCamera.Constants.FlashMode.on}
        />
        <View
          style={{
            flex: 0,
            flexDirection: 'row',
            justifyContent: 'center',
          }}></View>
        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={() => setModalVisible(!modalVisible)}>
          <TouchableOpacity
            onPress={takePicture.bind(this)}
            style={styles.capture}>
            <Text style={{fontSize: 14}}> SNAP </Text>
          </TouchableOpacity>
        </Pressable>
      </Modal>

      <TextInput
        style={{
          height: 40,
          borderColor: '#BCE0FD',
          borderWidth: 1,
          marginTop: 32,
          width: 288,
          borderRadius: 6,
        }}
        onChangeText={setfirstName}
        value={firstName}
        placeholder="First Name"
      />
      <TextInput
        style={{
          height: 40,
          borderColor: '#BCE0FD',
          borderWidth: 1,
          marginTop: 32,
          width: 288,
          borderRadius: 6,
        }}
        onChangeText={setlastName}
        value={lastName}
        placeholder="Last Name"
      />
      <TextInput
        style={{
          height: 40,
          borderColor: '#BCE0FD',
          borderWidth: 1,
          marginTop: 32,
          width: 288,
          borderRadius: 6,
        }}
        onChangeText={setaddress}
        value={address}
        placeholder="Address"
      />
      <TextInput
        style={{
          height: 40,
          borderColor: '#BCE0FD',
          borderWidth: 1,
          marginTop: 32,
          width: 288,
          borderRadius: 6,
        }}
        onChangeText={setcontactNumber}
        value={contactNumber}
        placeholder="Contact Number"
      />
        <View style={{height: 48, width: 295, marginTop: 28, borderRadius: 6}}>
        <Button title="Take Picture" onPress={() => setModalVisible(true)} />
      </View>
      <View style={{height: 48, width: 295, marginTop: 28, borderRadius: 6}}>
       
        <Button
          title="Sign in"
          onPress={() => signIn({contactNumber, address, lastName, firstName,photo})}
        />
      </View>
      <Text>SLIIT</Text>
    </View>
  );
};
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

export default LoginScreen;
