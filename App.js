import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {logout} from './actions/auth';
import Toast from 'react-native-toast-message';
import Dashboard from './screens/Dashboard';
import Login from './screens/Login';

const Stack = createNativeStackNavigator();

const App = props => {
  const logout = () => {
    props.logout();
  };
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{title: 'Login'}}
          />
          {props.accessToken && (
            <Stack.Screen
              name="Dashboard"
              component={Dashboard}
              options={{
                headerRight: () => (
                  <View>
                    <TouchableOpacity
                      style={styles.signupButton}
                      onPress={logout}>
                      <Text style={{color: 'black'}}>LOGOUT</Text>
                    </TouchableOpacity>
                  </View>
                ),
                headerLeft: () => {
                  return <></>;
                },
              }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      logout,
    },
    dispatch,
  );

const mapStateToProps = state => {
  return state.auth;
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
