import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Linking} from 'react-native';
import {Avatar, Overlay} from 'react-native-elements';
import QRCode from 'react-native-qrcode-svg';

import commonStyles from '../commonStyles';

import PetAge from '../components/PetAge';

export default ({pet}) => {
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <View style={styles.container}>
      <View>
        <Avatar
          avatarStyle={{borderRadius: 10}}
          size="xlarge"
          source={{uri: pet.avatarUrl}}
        />
      </View>

      <View style={styles.containerDetails}>
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
          <Text style={styles.title}>Peso (Kg): </Text>
          <Text>{pet.peso}</Text>
        </View>

        <View style={styles.containerData}>
          <Text style={styles.title}>Sexo: </Text>
          <Text>{pet.sexo}</Text>
        </View>

        <View style={styles.obs}>
          <Text style={styles.title}>Observações: </Text>
          <Text style={{paddingRight: 120}}>{pet.observacoes}</Text>
        </View>

        <TouchableOpacity onPress={toggleOverlay}>
          <Text style={styles.textShowQrCode}>VISUALIZAR QR CODE</Text>
        </TouchableOpacity>
      </View>

      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={styles.overlay}>
        <QRCode
          value={`${pet.id}`}
          size={250}
          color={commonStyles.colors.secundary}
          backgroundColor="white"
        />
        <Text style={styles.textOverlay}>Id do pet: {pet.id}</Text>
      </Overlay>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: commonStyles.colors.primary,
  },
  avatar: {
    marginRight: 10,
  },
  containerDetails: {
    marginLeft: 20,
  },
  containerData: {
    flexDirection: 'row',
    marginTop: 5,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
    color: commonStyles.colors.black,
  },
  textShowQrCode: {
    marginVertical: 10,
    fontWeight: 'bold',
    fontSize: 15,
    color: commonStyles.colors.secundary,
  },
  overlay: {
    width: '95%',
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textOverlay: {
    fontSize: 15,
    marginTop: 20,
    fontWeight: 'bold',
    color: commonStyles.colors.grayDark,
  },
  obs: {
    marginTop: 5,
    marginRight: 10,
  },
});
