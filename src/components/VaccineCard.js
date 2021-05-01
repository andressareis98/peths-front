import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import moment from 'moment';
import commonStyles from '../commonStyles';

export default props => {
  return (
    <View style={styles.container}>
      <Text>Data: </Text>
      <Text>{moment(props.data).format('DD/MM/YYYY')}</Text>
      <Text>Vacina:</Text>
      <Text>{props.nome}</Text>
      <Text>Status:</Text>
      <Text>{props.status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: commonStyles.colors.white,
  },
});
