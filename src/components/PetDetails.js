import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Avatar} from 'react-native-elements';
import QRCode from 'react-native-qrcode-svg';
import commonStyles from '../commonStyles';

import PetAge from '../components/PetAge';

export default ({pet}) => {
  /* const [setAvatar, avatar] = useState(true);

  const changeVisualizationOfAvatar = () => {
    if (avatar) {
      setAvatar(false);
    } else {
      setAvatar(true);
    }
  }; */

  const verdadeiro = true;

  return (
    <View style={styles.container}>
      {/* <View>
        <Avatar
          avatarStyle={{borderRadius: 10}}
          size="large"
          source={{uri: pet.avatarUrl}}
        />
      </View> */}

      <View>
        <QRCode
          value={`${pet.id}`}
          size={120}
          color="black"
          backgroundColor="white"
        />
      </View>

      <View style={styles.containerDetails}>
        <View style={styles.containerData}>
          <Text style={styles.title}>ID: </Text>
          <Text>{pet.id}</Text>
        </View>

        <View style={styles.containerData}>
          <Text style={styles.title}>Nome: </Text>
          <Text>{pet.nome}</Text>
        </View>

        <View style={styles.containerData}>
          <Text style={styles.title}>Idade: </Text>
          <Text>
            <PetAge anoNascimento={pet.anoNascimento} />
          </Text>
        </View>

        <View style={styles.containerData}>
          <Text style={styles.title}>Peso: </Text>
          <Text>{pet.peso}</Text>
        </View>

        <View style={styles.containerData}>
          <Text style={styles.title}>Sexo: </Text>
          <Text>{pet.sexo}</Text>
        </View>

        <View style={styles.containerData}>
          <Text style={styles.title}>Observações: </Text>
          <Text>{pet.observacoes}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    marginRight: 10,
  },
  containerDetails: {
    marginLeft: 10,
  },
  containerData: {
    flexDirection: 'row',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
  },
});
