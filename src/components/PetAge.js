import React from 'react';
import moment from 'moment';
import {Text, View} from 'react-native';

export default ({anoNascimento}) => {
  var hoje = moment();
  var dia = moment(anoNascimento);
  var duracao = moment.duration(hoje.valueOf() - dia.valueOf(), 'milliseconds');
  var anos = duracao.years();
  var meses = duracao.months();
  var dias = duracao.days();

  return (
    <>
      {anos === 1 && <Text>{anos} ano</Text>}
      {anos > 1 && <Text>{anos} anos</Text>}

      {anos === 0 && meses === 1 && <Text>{meses} mês</Text>}
      {anos === 0 && meses > 1 && <Text>{meses} meses</Text>}

      {anos === 0 && meses === 0 && dias === 0 && <Text>{dias} dias</Text>}
      {anos === 0 && meses === 0 && dias > 1 && <Text>{dias} dias</Text>}
      {anos === 0 && meses === 0 && dias === 1 && <Text>{dias} dia</Text>}
    </>
  );
};
