import { Navbar, Divider, AppShell, Avatar, Text, ScrollArea, UnstyledButton, Group, Image, Button, Menu } from '@mantine/core';

import HeaderNavbarComponent from './HeaderNavbarComponent';
import FooterNavbarComponent from './FooterNavbarComponent';
import ChatsNavbarComponent from './ChatsNavbarComponet';


function NavbarComponent() {

    return (
        <Navbar

            p="xs" width={{ base: 300 }}>

            <HeaderNavbarComponent />

            <Divider my="sm" />

            <ChatsNavbarComponent />

            <Divider my="sm" />

            <FooterNavbarComponent />

        </Navbar>
    )


}

export default NavbarComponent