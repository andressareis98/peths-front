import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Avatar} from 'react-native-elements';
import moment from 'moment';
import commonStyles from '../commonStyles';

export default ({pet}) => {
  return (
    <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
});
