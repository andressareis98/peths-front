import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Avatar} from 'react-native-elements';
import moment from 'moment';
import commonStyles from '../commonStyles';

export default props => {
  return (
    <View style={styles.container}>
      <Text>Data:</Text>
      <Text>{moment(props.data).format('DD/MM/YYYY')}</Text>
      <Text>Peso:</Text>
      <Text>{props.peso}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: commonStyles.colors.white,
  },
});
