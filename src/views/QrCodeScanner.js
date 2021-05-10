import React, {useState} from 'react';
import {View, SafeAreaView, Text, TouchableOpacity} from 'react-native';

import QrCodeScanner from 'react-native-qrcode-scanner';

export default ({navigation, route}) => {
  const usuario = route.params;

  const [pet, setPet] = useState({petId: ''});
  const [showQrCodeScanner, setShowQrCodeScanner] = useState(false);

  const ifScaned = e => {
    navigation.navigate('PetProfile', {
      petId: e.data,
      usuario: usuario,
    });
  };

  return (
    <QrCodeScanner
      containerStyle={{backgroundColor: '#FFF'}}
      onRead={ifScaned}
      reactivate={true}
      permissionDialogMessage="Necessário permitir acesso à câmera"
      reactivateTimeout={10}
      showMarker={true}
      markerStyle={{borderColor: '#FFF', borderRadius: 10}}
      bottomContent={
        <TouchableOpacity>
          <Text>Scan QR Code</Text>
        </TouchableOpacity>
      }
    />
  );
};
