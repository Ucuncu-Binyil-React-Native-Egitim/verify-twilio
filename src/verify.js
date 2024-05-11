import { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import axios from 'axios';
import { TextInput } from 'react-native-gesture-handler';

export const Verify = () => {
  const phoneInput = useRef();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [formattedNumber, setFormattedNumber] = useState('');
  const [pin, setPin] = useState('');
  const [sid, setSid] = useState('');

  const sendVerificationCode = async () => {
    try {
      const formData = new FormData();
      formData.append('Channel', 'sms');
      formData.append('To', formattedNumber);

      await axios
        .post(
          process.env.EXPO_PUBLIC_Base_Url +
            process.env.EXPO_PUBLIC_Service_Id +
            '/Verifications',
          formData,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            auth: {
              username: process.env.EXPO_PUBLIC_Account_Id,
              password: process.env.EXPO_PUBLIC_Auth_Token,
            },
          }
        )
        .then((res) => setSid(res.data.sid));
    } catch (err) {
      console.log(err);
    }
  };

  const verifyNumberWithCode = async () => {
    try {
      const formData = new FormData();
      formData.append('Channel', 'sms');
      formData.append('To', formattedNumber);
      formData.append('Code', pin);
      formData.append('VerificationSid', sid);

      await axios
        .post(
          process.env.EXPO_PUBLIC_Base_Url +
            process.env.EXPO_PUBLIC_Service_Id +
            '/VerificationCheck',
          formData,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            auth: {
              username: process.env.EXPO_PUBLIC_Account_Id,
              password: process.env.EXPO_PUBLIC_Auth_Token,
            },
          }
        )
        .then((res) => console.log(JSON.stringify(res.data, null, 2)));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <PhoneInput
        ref={phoneInput}
        defaultValue={phoneNumber}
        defaultCode='TR'
        layout='first'
        onChangeText={(text) => {
          setPhoneNumber(text);
        }}
        onChangeFormattedText={(e) => setFormattedNumber(e)}
        withDarkTheme
        withShadow
        autoFocus
      />
      <TouchableOpacity style={styles.button} onPress={sendVerificationCode}>
        <Text>Send Sms</Text>
      </TouchableOpacity>
      <TextInput
        value={pin}
        onChangeText={(e) => setPin(e)}
        style={styles.pinField}
      />

      <TouchableOpacity style={styles.button} onPress={verifyNumberWithCode}>
        <Text>Verify Number</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    marginTop: 24,
    backgroundColor: '#007AFF',
    padding: 16,
    alignItems: 'center',
  },
  pinField: {
    padding: 16,
    backgroundColor: '#bbb',
  },
});
