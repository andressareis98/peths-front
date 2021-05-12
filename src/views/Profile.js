import axios from 'axios';
import React, {useState} from 'react';
import {SafeAreaView, StatusBar, ScrollView, Text} from 'react-native';

export default props => {
  console.log(props.route);
  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView>
        <Text>Tela de profile</Text>
      </ScrollView>
    </SafeAreaView>
  );
};
