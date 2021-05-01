import React from 'react';
import {View, Text} from 'react-native';
import {Avatar} from 'react-native-elements';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import commonStyles from '../commonStyles';

export default ({pet}) => {
  return (
    <View>
      <Avatar
        avatarStyle={{borderRadius: 10}}
        size="large"
        source={{uri: pet.avatarUrl}}
      />
      <Text>{pet.nome}</Text>
      <Text>
        {moment(new Date()).format('YYYY') -
          moment(pet.anoNascimento).format('YYYY')}
      </Text>
      <Text>{pet.peso}</Text>
      <Text>{pet.sexo}</Text>
      <Text>{pet.observacoes}</Text>
    </View>
  );
};
