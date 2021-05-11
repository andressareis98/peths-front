import React, {useEffect, useState, useCallback} from 'react';
import VeterinaryHome from '../views/VeterinaryHome';
import ListPets from '../views/ListPets';

export default props => {
  const usuario = props.route.params;

  return (
    <>
      {usuario.crmv.trim() > 0 && (
        <VeterinaryHome usuario={usuario} navigation={props.navigation} />
      )}
      {usuario.crmv.trim() <= 0 && (
        <ListPets usuario={usuario} navigation={props.navigation} />
      )}
    </>
  );
};
