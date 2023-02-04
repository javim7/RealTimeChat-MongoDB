import { Navbar, Divider, AppShell, Avatar, Text, ScrollArea, UnstyledButton, Group, Image, Button, Menu, Modal } from '@mantine/core';

import { useState, useEffect } from 'react';

import ModalUpdateProfileComponent from './ModalUpdateProfile';

function FooterNavbarComponent({ formEmail }) {

    const [openedMenu, setOpenedMenu] = useState(true);
    const [datosUsuario, setDatosUsuario] = useState([]);
    const [iniciales, setIniciales] = useState("");

    // * UseState encargado de abrir y cerrar el modal de actualizar perfil:

    const [modalPerfilOpened, setModalPerfilOpened] = useState(false);



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

            <ModalUpdateProfileComponent opened={modalPerfilOpened} setOpened={setModalPerfilOpened} datosUsuario={datosUsuario} />

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
                    <Menu.Label>Menu de usuario</Menu.Label>
                    <Menu.Item
                        onClick={() => { setModalPerfilOpened(true) }}
                    >
                        Perfil
                    </Menu.Item>

                    <Menu.Divider />

                    <Menu.Label>Zona de peligro</Menu.Label>
                    <Menu.Item >Cerrar sesion</Menu.Item>
                    <Menu.Item color="red" >Borrar mi cuenta</Menu.Item>
                </Menu.Dropdown>
            </Menu>


        </Navbar.Section>
    )
}

export default FooterNavbarComponent