import React from 'react';
import { observer, useValue, useSession, emit } from 'startupjs';
import { Content, H2, Input, Checkbox, Button } from '@startupjs/ui';

import './index.styl';

const LoginForm = observer(() => {
  const [userId, $userId] = useSession('userId');
  const [name, $name] = useValue();
  const [checked, $checked] = useValue(false);

  const handleLogin = async () => {
    model.add('users', { id: userId, name, isProfessor: checked });
    emit('url', '/');
  };

  return pug`
    Content
      H2 Login
      Input.input(
        type='text'
        placeholder='Enter name'
        $value=$name
      )
      Checkbox.checkbox(
        label="As a professor"
        value=checked
        onChange=newChecked => $checked.set(newChecked)
      )
      Button.btn(
        color='success'
        onPress=handleLogin
      ) Enter
  `;
});

export default LoginForm;
