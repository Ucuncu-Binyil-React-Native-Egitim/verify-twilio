import axiosInstance from './axiosInstance';

export const sendVerificationCode = async (formattedNumber, serviceId) => {
  try {
    const formData = new FormData();
    formData.append('Channel', 'sms');
    formData.append('To', formattedNumber);

    const response = await axiosInstance.post(
      `${serviceId}/Verifications`, // Base URL buraya otomatik olarak eklenir
      formData
    );
    return response.data.sid;
  } catch (error) {
    throw error;
  }
};

export const verifyNumberWithCode = async (
  formattedNumber,
  pin,
  sid,
  serviceId
) => {
  try {
    const formData = new FormData();
    formData.append('Channel', 'sms');
    formData.append('To', formattedNumber);
    formData.append('Code', pin);
    formData.append('VerificationSid', sid);

    const response = await axiosInstance.post(
      `${serviceId}/VerificationCheck`, // Base URL buraya otomatik olarak eklenir
      formData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
