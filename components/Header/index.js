import React, { useEffect } from 'react';
import { observer, usePage, useSession, emit } from 'startupjs';
import { Row, Button, H1, Avatar } from '@startupjs/ui';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import APP from '../../app.json';
const { displayName } = APP;
const APP_NAME = displayName.charAt(0).toUpperCase() + displayName.slice(1);

import './index.styl';

const Header = observer(() => {
  const [opened, $opened] = usePage('sidebarOpened');
  const [user, $user] = useSession('user');

  useEffect(() => {
    $opened.set(false);
  }, []);

  const handleExit = () => {
    $user.set(null);
    emit('url', '/login');
  };

  return pug`
    Row.root
      Button(color='secondaryText' icon=faBars onPress=() => $opened.set(!opened))
      H1.logo= APP_NAME
      Row.user
        if user
          Avatar(
            size='s'
          )= user.name
        Button.logout(
          onPress=handleExit
        ) Exit

  `;
});

export default Header;
