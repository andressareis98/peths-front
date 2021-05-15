import React, {Component} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Image, Text} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import commonStyles from '../commonStyles';

import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export default class AuthOrApp extends Component {
  componentDidMount = async () => {
    const userDataJson = await AsyncStorage.getItem('userData');
    let userData = null;

    userData = JSON.parse(userDataJson);

    if (userData && userData.token) {
      axios.defaults.headers.common[
        'Authorization'
      ] = `bearer ${userData.token}`;

      this.props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: 'Home',
              params: userData,
            },
          ],
        }),
      );
    } else {
      this.props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: 'Auth',
            },
          ],
        }),
      );
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar />
        <Image source={require('../../assets/image/catdog.png')} />
        <Text style={styles.title}>peths</Text>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: commonStyles.colors.primary,
  },
  title: {
    fontSize: 100,
    color: commonStyles.colors.white,
  },
});
