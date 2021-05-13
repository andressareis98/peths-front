import axios from 'axios';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView, StatusBar, TouchableOpacity, Text} from 'react-native';

export default props => {
  const navigation = useNavigation();
  const logout = () => {
    delete axios.defaults.headers.common['Authorization'];
    navigation.navigate('Auth');
  };
  return (
    <SafeAreaView>
      <StatusBar />

      <TouchableOpacity onPress={logout}>
        <Text>Sair</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
