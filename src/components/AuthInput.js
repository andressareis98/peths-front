import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import commonStyles from '../commonStyles';

export default props => {
  return (
    <View style={[styles.container, props.style]}>
      <Icon name={props.icon} size={24} style={styles.icon} />
      <TextInput
        {...props}
        placeholderTextColor={commonStyles.colors.secundary}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: commonStyles.colors.tertiary,
    flexDirection: 'row',
    borderRadius: 25,
    alignItems: 'center',
    paddingLeft: 15,
    marginBottom: 15,
    height: 50,
  },
  icon: {
    color: commonStyles.colors.secundary,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: commonStyles.colors.secundary,
    marginLeft: 10,
  },
});
