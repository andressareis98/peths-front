import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import {Icon} from 'react-native-elements';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import {Overlay} from 'react-native-elements';

import commonStyles from '../commonStyles';

export default ({usuario, navigation}) => {
  const [pet, setPet] = useState({petId: ''});

  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={styles.containerTitle}>
        <Text style={styles.title}>Seja bem vindo(a)</Text>
      </View>

      <View style={styles.containerProfile}>
        <IconFontAwesome name="user-md" size={100} color="white" />
        <View>
          <Text style={styles.textProfile}>Nome: {usuario.nome}</Text>
          <Text style={styles.textProfile}>CRMV: {usuario.crmv}</Text>
          <Text style={styles.textProfile}>E-mail: {usuario.email}</Text>
        </View>
      </View>

      <View style={styles.newConsult}>
        <View style={styles.containerTitle}>
          <Text style={styles.textNewConsult}>Realizar novo atendimento: </Text>
        </View>

        <View style={styles.cards}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('QrCodeScanner', usuario)}>
            <Icon name="qr-code" size={100} color="black" />
            <Text style={styles.textCard}>QR Code</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={toggleOverlay}>
            <Icon name="keyboard" size={100} color="black" />
            <Text style={styles.textCard}>Inserir Id</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Overlay
        overlayStyle={styles.overlay}
        isVisible={visible}
        onBackdropPress={toggleOverlay}>
        <Text style={styles.textCard}>Insira o ID do pet: </Text>
        <TextInput
          placeholder="Informe o id do pet"
          style={styles.input}
          value={pet.petId}
          onChangeText={petId => setPet({petId: petId})}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('PetProfile', {
              petId: pet.petId,
              usuario: usuario,
            });

            toggleOverlay();
            setPet({petId: ''});
          }}>
          <Text style={styles.textButton}>Iniciar atendimento</Text>
        </TouchableOpacity>
      </Overlay>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: commonStyles.colors.primary,
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  containerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: commonStyles.colors.white,
  },
  containerProfile: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 20,
    padding: 20,
    backgroundColor: commonStyles.colors.tertiary,
  },
  textProfile: {
    fontSize: 15,
  },
  newConsult: {
    flex: 1,
    marginTop: 20,
  },
  textNewConsult: {
    fontSize: 20,
    fontWeight: 'bold',
    color: commonStyles.colors.black,
  },
  cards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 35,
    paddingVertical: 20,
    marginTop: 20,
    backgroundColor: commonStyles.colors.white,
  },
  textCard: {
    fontSize: 15,
    fontWeight: 'bold',
    color: commonStyles.colors.secundary,
  },
  overlay: {
    width: '93%',
    height: '50%',
    borderRadius: 50,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: commonStyles.colors.tertiary,
  },
  input: {
    width: '100%',
    height: 47,
    color: commonStyles.colors.secundary,
    marginVertical: 20,
    backgroundColor: commonStyles.colors.lightBlue,
    borderRadius: 50,
    paddingLeft: 17,
  },
  button: {
    backgroundColor: commonStyles.colors.secundary,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderRadius: 50,
    paddingVertical: 12,
  },
  textButton: {
    color: commonStyles.colors.white,
    fontSize: 15,
  },
});
