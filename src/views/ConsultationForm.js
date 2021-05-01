import React from 'react';
import {View, Text} from 'react-native';

export default props => {
  console.warn(props.route.params.nome);
  return (
    <View>
      <Text>Formulario de consulta</Text>
    </View>
  );
};
