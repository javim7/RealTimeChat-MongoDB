import { Navbar, Divider, AppShell, Avatar, Text, ScrollArea, UnstyledButton, Group, Image, Button, Menu } from '@mantine/core';

import imagen_quehubo from '../assets/quehubo.png'

function HeaderNavbarComponent() {

    return (
        <Navbar.Section>
            <div style={{ width: 200, marginLeft: 'auto', marginRight: 'auto' }}>
                <Image
                    radius="md"
                    src={imagen_quehubo}
                    alt="logo_quehubo"
                />
            </div>
        </Navbar.Section>
    )

}

export default HeaderNavbarComponent