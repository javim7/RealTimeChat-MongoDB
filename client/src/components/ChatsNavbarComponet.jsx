import { Navbar, Divider, AppShell, Avatar, Text, ScrollArea, UnstyledButton, Group, Image, Button, Menu } from '@mantine/core';

import ModalNewChatComponent from './ModalNewChatComponent';

import { useState } from 'react';

function ChatsNavbarComponent() {

    const [modalOpened, setModalOpened] = useState(false);

    return (

        <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">


            <div className='Seccion_chats'>

                <ModalNewChatComponent opened={modalOpened} setOpened={setModalOpened} />

                <Button
                    color="cyan"
                    uppercase
                    className='boton_nuevo_chat'
                    onClick={() => { setModalOpened(true) }}
                >
                    + Nuevo Chat
                </Button>

                <UnstyledButton
                    className='Boton_chat_individual'
                    onClick={() => { console.log('Chat individual') }}
                >
                    <Group>
                        <Avatar size={40} color="blue">BH</Avatar>
                        <div>
                            <Text>Bob Handsome</Text>
                            <Text size="xs" color="dimmed">bob@handsome.inc</Text>
                        </div>
                    </Group>
                </UnstyledButton>

                <UnstyledButton
                    className='Boton_chat_individual'
                    onClick={() => { console.log('Chat individual') }}
                >
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
    )

}

export default ChatsNavbarComponent