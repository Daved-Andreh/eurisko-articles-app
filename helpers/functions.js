import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import * as RNLocalize from 'react-native-localize';
export const generateForm = data => {
  const formData = new FormData();

  Object.keys(data).forEach((key, index) => {
    if (key === 'id' && data[key] == -1) {
      return;
    }
    if (data[key] === true || data[key] === false) {
      formData.append(key, data[key] === true ? 1 : 0);
      return;
    }
    if (Array.isArray(data[key])) {
      formData.append(key, data[key].toString());
      return;
    }
    formData.append(key, data[key]);
  });
  return formData;
};

export const getRemainingTimeStr = date => {
  const currentDate = new Date();
  const TargetDate = new Date(Date.parse(date));
  const DifferenceInTime = TargetDate.getTime() - currentDate.getTime();
  var days = Math.floor(DifferenceInTime / (1000 * 60 * 60 * 24));
  var hours = Math.floor(
    (DifferenceInTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  var minutes = Math.floor((DifferenceInTime % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((DifferenceInTime % (1000 * 60)) / 1000);
  return {
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  };
};

export const fileSelectedHandler = async (onSelect, maxWidth, maxHeight) => {
  let options = {
    maxWidth: 1024,
    maxHeight: 1024,
    quality: 0.9,
    title: 'Select Image',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  launchImageLibrary(options, response => {
    // console.log('Response = ', response);

    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
      alert(response.customButton);
    } else {
      // const source = { uri: response.uri };
      // You can also display the image using data:
      onSelect(response.assets[0]);
    }
  });
};

export const timeSince = dateStr => {
  function convertTZ(date) {
    let mobileTimeZone = RNLocalize.getTimeZone();
    return new Date(
      (typeof date === 'string' ? new Date(date) : date).toLocaleString(
        'en-US',
        {timeZone: mobileTimeZone},
      ),
    );
  }

  if (!dateStr) {
    return '';
  }
  let dateTimeParts = dateStr.split(/[- :]/); // regular expression split that creates array with: year, month, day, hour, minutes, seconds values
  dateTimeParts[1]--;
  let date = new Date(...dateTimeParts);

  // date = convertTZ(date);

  let newDate = new Date();
  // newDate = convertTZ(newDate);
  var seconds = Math.floor((newDate - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + ' years ago';
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + ' months ago';
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + ' days ago';
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + ' hours ago';
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + ' minutes ago';
  }

  return 0 + ' seconds ago';
};
