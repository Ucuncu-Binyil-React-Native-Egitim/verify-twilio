import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Keyboard,
  ActivityIndicator,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';

import { api } from './service/api';
import PhoneInput from 'react-native-phone-number-input';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

export const Verify = () => {
  const phoneInput = useRef();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pin, setPin] = useState('');
  const [sid, setSid] = useState('');
  const [activeSection, setActiveSection] = useState('1');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [numberValid, setNumberValid] = useState(false);
  // back arrow sarch bar
  const sendVerificationCode = async () => {
    try {
      setLoading(true);
      const response = await api.sendVerificationCode(phoneNumber);
      setSid(response.sid);
      setActiveSection('2');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const verifyNumberWithCode = async () => {
    try {
      setLoading(true);
      const response = await api.verifyNumberWithCode(phoneNumber, pin, sid);
      console.log(response);
      setNumberValid(response.valid);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
      <View style={styles.container}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding'>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <ScrollView contentContainerStyle={{ paddingTop: 36 }}>
              <Text
                style={[
                  styles.step,
                  { color: activeSection === '1' ? 'black' : '#ccc' },
                ]}
              >
                Step 1
              </Text>
              <PhoneInput
                ref={phoneInput}
                defaultCode='TR'
                value={phone}
                onChangeText={(e) => setPhone(e)}
                onChangeFormattedText={(e) => {
                  setPhoneNumber(e);
                  phoneInput.current?.isValidNumber(e)
                    ? Keyboard.dismiss()
                    : null;
                }}
                containerStyle={styles.phoneInputContainer}
                textContainerStyle={styles.phoneInputTextContainer}
                countryPickerButtonStyle={{
                  borderRadius: 16,
                  marginRight: 4,
                  backgroundColor: '#ccc',
                }}
              />
              <TouchableOpacity
                disabled={
                  activeSection === '2' ||
                  !phoneInput.current?.isValidNumber(phone)
                }
                onPress={sendVerificationCode}
                style={[
                  styles.button,
                  {
                    backgroundColor: `rgba(0, 122, 255, ${
                      phoneInput.current?.isValidNumber(phone) &&
                      activeSection === '1'
                        ? 1
                        : 0.3
                    })`,
                  },
                ]}
              >
                {loading ? (
                  <ActivityIndicator color={'white'} />
                ) : (
                  <Text style={styles.buttonText}>Send Verification Code</Text>
                )}
              </TouchableOpacity>

              <Text
                style={[
                  styles.step,
                  { color: activeSection === '2' ? 'black' : '#ccc' },
                ]}
              >
                Step 2
              </Text>
              <TextInput
                placeholder='Verification Code'
                value={pin}
                onChangeText={(e) => {
                  setPin(e);
                  e.length === 6 ? Keyboard.dismiss() : null;
                }}
                editable={activeSection === '2'}
                style={styles.textField}
                showSoftInputOnFocus={true}
                maxLength={6}
                keyboardType='numeric'
              />
              <TouchableOpacity
                disabled={activeSection === '1'}
                onPress={verifyNumberWithCode}
                style={[
                  styles.button,
                  {
                    backgroundColor: `rgba(0, 122, 255, ${
                      activeSection === '1' ? 0.3 : 1
                    })`,
                  },
                ]}
              >
                {loading ? (
                  <ActivityIndicator />
                ) : (
                  <Text style={styles.buttonText}>Verify Number</Text>
                )}
              </TouchableOpacity>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        <TouchableOpacity
          style={[
            styles.button,
            styles.shadow,
            {
              backgroundColor: numberValid ? 'green' : 'grey',
              alignSelf: 'flex-end',
              flexDirection: 'row',
            },
          ]}
        >
          <Text style={[styles.buttonText, { marginHorizontal: 16 }]}>
            {numberValid ? 'Done' : "I'll do it later"}
          </Text>
          <Feather name='arrow-right' size={28} color='white' />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 16,
  },
  textField: {
    padding: 16,
    borderRadius: 16,
    fontSize: 16,
    backgroundColor: '#ccc',
    textAlign: 'center',
  },
  phoneInputContainer: {
    width: '100%',
    alignSelf: 'center',
    borderRadius: 16,
    backgroundColor: 'transparent',
  },
  button: {
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 64,
    borderRadius: 16,
  },
  phoneInputTextContainer: {
    borderRadius: 16,
    backgroundColor: '#ccc',
  },
  step: {
    fontSize: 32,
    marginBottom: 16,
    fontWeight: '500',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  validText: {
    textAlign: 'center',
  },
});
