import axios from 'axios';

const twilioUrl =
  process.env.EXPO_PUBLIC_Base_Url + process.env.EXPO_PUBLIC_Service_Id;

const api = {
  sendVerificationCode: async (formattedNumber) => {
    try {
      const response = await axios.post(
        twilioUrl + '/Verifications',
        {
          Channel: 'sms',
          To: formattedNumber,
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          auth: {
            username: process.env.EXPO_PUBLIC_Account_Id,
            password: process.env.EXPO_PUBLIC_Auth_Token,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  verifyNumberWithCode: async (formattedNumber, pin, sid) => {
    try {
      const response = await axios.post(
        twilioUrl + '/VerificationCheck',
        {
          Channel: 'sms',
          To: formattedNumber,
          Code: pin,
          VerificationSid: sid,
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          auth: {
            username: process.env.EXPO_PUBLIC_Account_Id,
            password: process.env.EXPO_PUBLIC_Auth_Token,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export { api };
