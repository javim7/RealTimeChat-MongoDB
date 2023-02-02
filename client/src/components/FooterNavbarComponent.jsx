import { Navbar, Divider, AppShell, Avatar, Text, ScrollArea, UnstyledButton, Group, Image, Button, Menu } from '@mantine/core';

import { IconSettings, IconSearch, IconPhoto, IconMessageCircle, IconTrash, IconArrowsLeftRight } from '@tabler/icons';

import { useState } from 'react';

function FooterNavbarComponent() {

    const [openedMenu, setOpenedMenu] = useState(true);

    return (
        <Navbar.Section>

            <Menu shadow="md" width={200} position="top" offset={15} withArrow>
                <Menu.Target>
                    <UnstyledButton
                        className='seccion_perfil'
                        onClick={() => { console.log('Perfil') }}
                    >
                        <Group >
                            <Avatar color="cyan" size={40} radius="xl">NU</Avatar>
                            <div>
                                <Text fw={500}>Nombre Usuario</Text>
                                <Text c="blue" fz="xs">correoelectronico@prueba.com</Text>
                            </div>
                        </Group>
                    </UnstyledButton>
                </Menu.Target>

                <Menu.Dropdown>
                    <Menu.Label>Application</Menu.Label>
                    <Menu.Item >Settings</Menu.Item>
                    <Menu.Item >Messages</Menu.Item>
                    <Menu.Item >Gallery</Menu.Item>
                    <Menu.Item

                        rightSection={<Text size="xs" color="dimmed">⌘K</Text>}
                    >
                        Search
                    </Menu.Item>

                    <Menu.Divider />

                    <Menu.Label>Danger zone</Menu.Label>
                    <Menu.Item >Transfer my data</Menu.Item>
                    <Menu.Item color="red" >Delete my account</Menu.Item>
                </Menu.Dropdown>
            </Menu>


        </Navbar.Section>
    )
}

export default FooterNavbarComponent