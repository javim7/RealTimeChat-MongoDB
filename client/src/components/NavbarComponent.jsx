import { Navbar, Divider, AppShell, Avatar, Text, ScrollArea, UnstyledButton, Group, Image, Button, Menu } from '@mantine/core';

import HeaderNavbarComponent from './HeaderNavbarComponent';
import FooterNavbarComponent from './FooterNavbarComponent';
import ChatsNavbarComponent from './ChatsNavbarComponet';


function NavbarComponent({ formEmail, setChatElegido }) {

    return (
        <Navbar

            p="xs" width={{ base: 300 }}>

            <HeaderNavbarComponent />

            <Divider my="sm" />

            <ChatsNavbarComponent formEmail={formEmail} setChatElegido={setChatElegido} />

            <Divider my="sm" />

            <FooterNavbarComponent formEmail={formEmail} />

        </Navbar>
    )


}

export default NavbarComponent