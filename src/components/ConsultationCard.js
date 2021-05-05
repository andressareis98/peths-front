import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import moment from 'moment';
import commonStyles from '../commonStyles';

export default props => {
  return (
    <View style={styles.container}>
      <View style={styles.containerText}>
        <Text style={styles.titulo}>Data:</Text>
        <Text>{moment(props.data).format('DD/MM/YYYY')}</Text>
      </View>

      <View style={styles.containerText}>
        <Text style={styles.titulo}>Peso:</Text>
        <Text>{props.peso}</Text>
      </View>

      <View style={styles.containerText}>
        <Text style={styles.titulo}>Diagnostico:</Text>
        <Text>{props.diagnostico}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: commonStyles.colors.white,
    margin: 10,
  },
  containerText: {
    flexDirection: 'column',
    marginBottom: 10,
  },
  titulo: {
    color: commonStyles.colors.secundary,
    fontWeight: 'bold',
    marginRight: 10,
    fontSize: 15,
  },
});
