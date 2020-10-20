import React from 'react'
import { ScrollView } from 'react-native'
import { H1, Content } from '@startupjs/ui'
import GameForm from 'components/GameForm'

import './index.styl'

const PGameCreate = () => {
  return pug`
    ScrollView.root
      Content.root
        H1.h1 Create game
        GameForm
  `
}

export default PGameCreate
