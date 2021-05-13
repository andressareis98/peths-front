import React, {useEffect, useState} from 'react';
import {server, showError, showSuccess} from '../common';
import axios from 'axios';

export default {
  signIn: async (email, senha) => {
    const res = await axios.post(`${server}/signin`, {
      email: email,
      senha: senha,
    });
    return res;
  },

  signUp: async (nome, crmv, email, senha) => {
    return await axios.post(`${server}/signup`, {
      nome: nome,
      crmv: crmv,
      email: email,
      senha: senha,
    });
  },

  newPet: async (avatarUrl, nome, anoNascimento, peso, sexo, observacoes) => {
    return await axios.post(`${server}/pets`, {
      avatarUrl: avatarUrl,
      nome: nome,
      anoNascimento: anoNascimento,
      peso: peso,
      sexo: sexo,
      observacoes: observacoes,
    });
  },

  getPet: async id => {
    return await axios.get(`${server}/pets/${id}`);
  },

  editPet: async (
    id,
    avatarUrl,
    nome,
    anoNascimento,
    peso,
    sexo,
    observacoes,
  ) => {
    return await axios.put(`${server}/pets/${id}`, {
      avatarUrl: avatarUrl,
      nome: nome,
      anoNascimento: anoNascimento,
      peso: peso,
      sexo: sexo,
      observacoes: observacoes,
    });
  },

  deletePet: async id => {
    return await axios.delete(`${server}/pets/${id}`);
  },

  lisPets: async () => {
    return await axios.get(`${server}/pets`);
  },

  listConsultations: async id => {
    return await axios.get(`${server}/pets/${id}/consultations`);
  },

  newConsult: async (data, peso, diagnostico, prescricao) => {
    return await axios.post(`${server}/pets/${pet.id}/consultations`, {
      data: data,
      peso: peso,
      diagnostico: diagnostico,
      prescricao: prescricao,
    });
  },

  listVaccines: async id => {
    return await axios.get(`${server}/pets/${id}/vaccines`);
  },

  newVaccine: async (petId, data, nome, status) => {
    return await axios.post(`${server}/pets/${petId}/vaccines`, {
      data: data,
      nome: nome,
      status: status,
    });
  },

  editVaccine: async (petId, vaccineId, data, nome, status) => {
    return await axios.put(`${server}/pets/${petId}/vaccines/${vaccineId}`, {
      data: data,
      nome: nome,
      status: status,
    });
  },

  logout: async => {
    return delete axios.defaults.headers.common['Authorization'];
  },
};
