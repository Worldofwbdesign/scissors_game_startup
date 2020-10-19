import React from 'react';
import _ from 'lodash';
import { observer } from 'startupjs';
import { ScrollView } from 'react-native';
import { TestComponent } from 'components';
import './index.styl';
import { Content } from '@startupjs/ui';

const _PHome = () => pug`
    ScrollView.root
      Content
        TestComponent
  `;

const PHome = _.flowRight(observer)(_PHome);

export default PHome;
