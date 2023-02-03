import { Navbar, Divider, AppShell, Avatar, Text, ScrollArea, UnstyledButton, Group, Image, Button, Menu } from '@mantine/core';

import { IconSettings, IconSearch, IconPhoto, IconMessageCircle, IconTrash, IconArrowsLeftRight } from '@tabler/icons';

import { useState, useEffect } from 'react';

function FooterNavbarComponent({ formEmail }) {

    const [openedMenu, setOpenedMenu] = useState(true);
    const [datosUsuario, setDatosUsuario] = useState([]);
    const [iniciales, setIniciales] = useState("");

    useEffect(() => {
        fetch("http://localhost:5000/api/users/" + formEmail)
            .then(res => res.json())
            .then(data => {
                setDatosUsuario(data);
                let nameArray = data.name.split(" ");
                setIniciales(nameArray[0].charAt(0) + nameArray[1].charAt(0));
                // console.log(iniciales);
            })
    }, []);

    return (
        <Navbar.Section>

            <Menu shadow="md" width={200} position="top" offset={15} withArrow>
                <Menu.Target>
                    <UnstyledButton
                        className='seccion_perfil'
                        onClick={() => { console.log('Perfil') }}
                    >
                        <Group >
                            <Avatar color="cyan" size={40} radius="xl">{iniciales}</Avatar>
                            <div>
                                <Text fw={500}>{datosUsuario.name}</Text>
                                <Text c="blue" fz="xs">{datosUsuario.email}</Text>
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