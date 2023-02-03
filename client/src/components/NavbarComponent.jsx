import { Navbar, Divider, AppShell, Avatar, Text, ScrollArea, UnstyledButton, Group, Image, Button, Menu } from '@mantine/core';

import HeaderNavbarComponent from './HeaderNavbarComponent';
import FooterNavbarComponent from './FooterNavbarComponent';
import ChatsNavbarComponent from './ChatsNavbarComponet';


function NavbarComponent({ formEmail }) {

    return (
        <Navbar

            p="xs" width={{ base: 300 }}>

            <HeaderNavbarComponent />

            <Divider my="sm" />

            <ChatsNavbarComponent formEmail={formEmail} />

            <Divider my="sm" />

            <FooterNavbarComponent formEmail={formEmail} />

        </Navbar>
    )


}

export default NavbarComponent