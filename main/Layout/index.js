import React, { useEffect } from 'react'
import {
  observer,
  emit,
  usePage,
  useLocal,
  useSession,
  useDoc
} from 'startupjs'
import './index.styl'
import { Div, Layout, SmartSidebar, Menu } from '@startupjs/ui'
import Header from 'components/Header'

const MenuItem = observer(({ url, children }) => {
  const [currentUrl] = useLocal('$render.url')
  return pug`
    Menu.Item(
      active=currentUrl === url
      onPress=() => emit('url', url)
    )= children
  `
})

export default observer(function ({ children }) {
  const [, $opened] = usePage('sidebarOpened')
  const [userId] = useSession('userId')
  const [user] = useDoc('users', userId)

  useEffect(() => {
    if (!user) {
      emit('url', '/login')
    }
  }, [])

  function renderSidebar () {
    return pug`
      Menu.sidebar
        MenuItem(url='/') Home
        MenuItem(url='/games') Games
        MenuItem(url='/gamesHistory') Past Games
        if user && user.isProfessor
          MenuItem(url='/createGame') Create game
    `
  }

  return pug`
    Layout
      SmartSidebar(
        backgroundColor='#eeeeee'
        path=$opened.path()
        renderContent=renderSidebar
      )
        Header

        Div.body= children
  `
})
