import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
  ActivityIndicator,
} from 'react-native';
import handleErrors from '../helpers/handleErrors';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {login} from '../actions/auth';
import axios from 'axios';
import {url} from '../vars';

const Login = props => {
  const [loading, setloading] = React.useState(false);
  const [data, setData] = React.useState({
    username: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const textInputChange = val => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const handlePasswordChange = val => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleValidUser = val => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  const loginHandle = (userName, password) => {
    setloading(true);
    if (data.username.length == 0 || data.password.length == 0) {
      setloading(false);
      Alert.alert(
        'Wrong Input',
        'Username or password field cannot be empty.',
        [{text: 'Okay'}],
      );
      return;
    }

    const obj = {
      username: userName,
      password: password,
    };

    axios
      .post(`${url}/auth/signin`, obj)
      .then(function (response) {
        setloading(false);

        props.login(response.data.accessToken);

        props.navigation.navigate('Dashboard');
      })
      .catch(function (error) {
        handleErrors(error);
        setloading(false);
      });
    return false;
  };

  React.useEffect(() => {
    if (props.accessToken) {
      props.navigation.navigate('Dashboard');
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>Welcome!</Text>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={[
          styles.section,
          {
            backgroundColor: '#FFF',
          },
        ]}>
        <Text
          style={[
            styles.text_label,
            {
              color: '#000',
            },
          ]}>
          Username
        </Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color={'#000'} size={20} />
          <TextInput
            placeholder="Your username"
            placeholderTextColor="#666666"
            style={[
              styles.textInput,
              {
                color: '#000',
              },
            ]}
            autoCapitalize="none"
            onChangeText={val => textInputChange(val)}
            onEndEditing={e => handleValidUser(e.nativeEvent.text)}
          />
          {data.check_textInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null}
        </View>
        {data.isValidUser ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Username must be 4 characters long.
            </Text>
          </Animatable.View>
        )}

        <Text
          style={[
            styles.text_label,
            {
              color: '#000',
              marginTop: 35,
            },
          ]}>
          Password
        </Text>
        <View style={styles.action}>
          <Feather name="lock" color={'#000'} size={20} />
          <TextInput
            placeholder="Your password"
            placeholderTextColor="#666666"
            secureTextEntry={data.secureTextEntry ? true : false}
            style={[
              styles.textInput,
              {
                color: '#000',
              },
            ]}
            autoCapitalize="none"
            onChangeText={val => handlePasswordChange(val)}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color="grey" size={20} />
            )}
          </TouchableOpacity>
        </View>
        {data.isValidPassword ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Password must be 8 characters long
            </Text>
          </Animatable.View>
        )}

        <View style={styles.section}>
          <View style={{width: '100%'}}>
            {loading ? (
              <ActivityIndicator size="large" />
            ) : (
              <TouchableOpacity
                disabled={!data.username || !data.password}
                style={
                  !data.username || !data.password
                    ? styles.disabledButton
                    : styles.button
                }
                onPress={() => loginHandle(data.username, data.password)}>
                <Text style={styles.text_label}>SIGN IN</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  section: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: 'grey',
    fontWeight: 'bold',
    fontSize: 30,
  },

  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },

  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,

    borderRadius: 4,

    backgroundColor: '#06C755',
  },
  disabledButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,

    borderRadius: 4,

    backgroundColor: 'grey',
  },

  text_label: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});

const mapStateToProps = state => {
  return state.auth;
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      login,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Login);
