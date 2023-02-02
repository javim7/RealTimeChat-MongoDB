import { Navbar, Divider, AppShell, Avatar, Text, ScrollArea, UnstyledButton, Group, Image, Button, Menu } from '@mantine/core';

function ChatsNavbarComponent() {

    return (
        <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">


            <div className='Seccion_chats'>

                <Button
                    color="cyan"
                    uppercase
                    className='boton_nuevo_chat'
                    onClick={() => { console.log('Nuevo chat') }}
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