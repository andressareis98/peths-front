import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconAwesome5 from 'react-native-vector-icons/FontAwesome5';
import commonStyles from '../commonStyles';

export default props => {
  return (
    <View style={[styles.container, props.style]}>
      {props.icon !== 'weight' && (
        <Icon name={props.icon} size={20} style={styles.icon} />
      )}
      {props.icon == 'weight' && (
        <IconAwesome5 name={props.icon} size={20} style={styles.icon} />
      )}

      <TextInput
        {...props}
        placeholderTextColor={commonStyles.colors.primary}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    height: 45,
    backgroundColor: '#fbfbfb',
    borderRadius: 5,
    marginTop: 15,
  },
  icon: {
    color: commonStyles.colors.secundary,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: commonStyles.colors.secundary,
    marginLeft: 10,
  },
});
