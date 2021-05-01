import React from 'react';
import {View, Text} from 'react-native';

export default props => {
  return (
    <View>
      <Text>Tela do veterinario</Text>
      <Text>{props.nome}</Text>
    </View>
  );
};
