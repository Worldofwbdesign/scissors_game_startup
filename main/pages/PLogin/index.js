import React from 'react';
import { ScrollView } from 'react-native';
import { Content } from '@startupjs/ui';
import LoginForm from 'components/LoginForm';

const PLogin = () => {
  return pug`
    ScrollView.root
      Content
        LoginForm
  `;
};

export default PLogin;
