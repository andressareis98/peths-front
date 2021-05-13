import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView, StatusBar, TouchableOpacity, Text} from 'react-native';

import Services from '../services/Services';

export default props => {
  const navigation = useNavigation();
  const logout = () => {
    Services.logout();
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
