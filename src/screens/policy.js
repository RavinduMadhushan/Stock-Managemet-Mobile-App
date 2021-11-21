import React, {useState} from 'react';
import {Button, StyleSheet, View, BackHandler} from 'react-native';
import Dialog from 'react-native-dialog';

export default function Policy({navigation}) {
  const [visible, setVisible] = useState(true);

  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
    BackHandler.exitApp();
  };

  const handleDelete = () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic

    setVisible(false);
  };

  return (
    <View style={styles.container}>
      <Dialog.Container visible={visible}>
        <Dialog.Title>PRIVACY POLICY</Dialog.Title>
        <Dialog.Description>
          Your privacy is very important to us. Accordingly, we have developed
          this Policy in order for you to understand how we collect, use,
          communicate and disclose and make use of personal information. The
          following outlines our privacy policy.
        </Dialog.Description>
        <Dialog.Description>
          • We need a clear photo of you to register this application. The
          purpose here is to add you to our database.
        </Dialog.Description>
        <Dialog.Description>
          • We will only retain personal information as long as necessary for
          the fulfillment of those purposes. We will collect personal
          information by lawful and fair means and, where appropriate, with the
          knowledge or consent of the individual concerned.
        </Dialog.Description>
        <Dialog.Description>
          • We will make readily available to customers information about our
          policies and practices relating to the management of personal
          information
        </Dialog.Description>
        <Dialog.Description>
          • We are committed to conducting our business in accordance with these
          principles in order to ensure that the confidentiality of personal
          information is protected and maintained.
        </Dialog.Description>

        <Dialog.Button label="Decline" onPress={handleCancel} />
        <Dialog.Button
          label="Accept"
          onPress={() => navigation.navigate('Login')}
        />
      </Dialog.Container>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
