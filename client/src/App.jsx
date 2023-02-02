import { Navbar, Divider, AppShell, Avatar, Text, ScrollArea, UnstyledButton, Group, Image, Button, Menu } from '@mantine/core';

import { useState, useEffect } from 'react';

import './styles/perfil_navbar_style.css'
import './styles/chats_navbar_style.css'
import './styles/messages_style.css'
import './styles/appshell_style.css'


import NavbarComponent from './components/NavbarComponent';
import ChatComponent from './components/ChatsComponent';

function App() {

  return (
    <div>
      <AppShell padding="md" navbar={<NavbarComponent />}>
        <ChatComponent />
      </AppShell>
    </div>

  );

}
export default App