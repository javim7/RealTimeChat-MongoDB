import { Navbar, Divider, AppShell, Avatar, Text, ScrollArea, UnstyledButton, Group, Image, Button, Menu } from '@mantine/core';

import { useState, useEffect } from 'react';

import './styles/perfil_style.css'
import './styles/chats_navbar_style.css'

import imagen_quehubo from './assets/quehubo.png'

function App() {

  return (
    <div>


      <AppShell padding="md" navbar={
        <Navbar
          p="xs" width={{ base: 300 }}>
          <Navbar.Section>
            <div style={{ width: 200, marginLeft: 'auto', marginRight: 'auto' }}>
              <Image
                radius="md"
                src={imagen_quehubo}
                alt="logo_quehubo"
              />
            </div>
          </Navbar.Section>
          <Divider my="sm" />
          <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">


            <div className='Seccion_chats'>

              <Button color="lime" uppercase className='boton_nuevo_chat'>
                + Nuevo Chat
              </Button>

              <UnstyledButton className='Boton_chat_individual'>
                <Group>
                  <Avatar size={40} color="blue">BH</Avatar>
                  <div>
                    <Text>Bob Handsome</Text>
                    <Text size="xs" color="dimmed">bob@handsome.inc</Text>
                  </div>
                </Group>
              </UnstyledButton>

              <UnstyledButton className='Boton_chat_individual'>
                <Group>
                  <Avatar size={40} color="blue">BH</Avatar>
                  <div>
                    <Text>Bob Handsome</Text>
                    <Text size="xs" color="dimmed">bob@handsome.inc</Text>
                  </div>
                </Group>
              </UnstyledButton>

            </div>

          </Navbar.Section>
          <Divider my="sm" />
          <Navbar.Section>

            <UnstyledButton className='seccion_perfil'>
              <Group>
                <Avatar color="cyan" size={40} radius="xl">NU</Avatar>
                <div>
                  <Text fw={500}>Nombre Usuario</Text>
                  <Text c="blue" fz="xs">correoelectronico@prueba.com</Text>
                </div>
              </Group>
            </UnstyledButton>
          </Navbar.Section>
        </Navbar>
      }>
        Cualquier chat ira aca
      </AppShell>
    </div>

  );

}
export default App
