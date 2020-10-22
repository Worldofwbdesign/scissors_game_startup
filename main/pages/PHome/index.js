import React from 'react'
import { observer, emit } from 'startupjs'
import { ScrollView } from 'react-native'
import { Content, H2, Button } from '@startupjs/ui'
import TopPlayersList from 'components/TopPlayersList'

import './index.styl'

const PHome = observer(() => {
  return pug`
    ScrollView.root
      Content.content
        Button.btn(
          color="success"
          onPress=() => emit('url', '/games')
        ) Play!
        H2.h2 Top 10 Players
        TopPlayersList
  `
})

export default PHome
