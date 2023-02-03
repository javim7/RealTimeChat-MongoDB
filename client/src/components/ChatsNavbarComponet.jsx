import { Navbar, Divider, AppShell, Avatar, Text, ScrollArea, UnstyledButton, Group, Image, Button, Menu } from '@mantine/core';

import ModalNewChatComponent from './ModalNewChatComponent';

import { useState, useEffect } from 'react';

function ChatsNavbarComponent({ formEmail }) {

    const [modalOpened, setModalOpened] = useState(false);
    const [chatsUsuario, setChatsUsuario] = useState([]);
    const [datosUsuario, setDatosUsuario] = useState('');
    const [iniciales, setIniciales] = useState("");

    useEffect(() => {
        fetch("http://localhost:5000/api/chats/" + formEmail)
            .then(res => res.json())
            .then(data => {
                setChatsUsuario(data);
                console.log(chatsUsuario);
            })
    }, []);


    useEffect(() => {
        fetch("http://localhost:5000/api/users/" + formEmail)
            .then(res => res.json())
            .then(data => {
                setDatosUsuario(data.name);
                let nameArray = data.name.split(" ");
                setIniciales(nameArray[0].charAt(0) + nameArray[1].charAt(0));
                // console.log(iniciales);
            })
    }, []);

    // useEffect(() => { console.log(chatsUsuario); }, [chatsUsuario]);

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
                {
                    // chatsUsuario.map((chat) => {
                    //     return (
                    //         <UnstyledButton
                    //             className='Boton_chat_individual'
                    //             onClick={() => { console.log('Chat individual') }}
                    //         >
                    //             <Group>
                    //                 <Avatar size={40} color="blue">BH</Avatar>
                    //                 <div>
                    //                     <Text>{chat.user2}</Text>
                    //                     <Text size="xs" color="dimmed">{chat.user2}</Text>
                    //                 </div>
                    //             </Group>
                    //         </UnstyledButton>
                    //     )
                    // })

                    chatsUsuario.map((chat) => {
                        return (
                            <UnstyledButton
                                className='Boton_chat_individual'
                                onClick={() => { console.log('Chat individual') }}
                            >
                                <Group className='grupo_chat'>
                                    {
                                        chat.user2 === formEmail
                                            ?
                                            <Avatar size={40} color="blue">BH</Avatar>
                                            :
                                            <Avatar size={40} color="blue">BH</Avatar>
                                    }

                                    <div>
                                        {
                                            chat.user2 === formEmail
                                                ?
                                                <Text fz="sm">{chat.user1}</Text>
                                                :
                                                <Text fz="sm">{chat.user2}</Text>
                                        }
                                        {
                                            chat.user2 === formEmail
                                                ?
                                                <Text size="xs" color="dimmed">{chat.user1}</Text>
                                                :
                                                <Text size="xs" color="dimmed">{chat.user2}</Text>
                                        }
                                    </div>
                                </Group>

                            </UnstyledButton>
                        )
                    })
                }

            </div>

        </Navbar.Section>
    )

}

export default ChatsNavbarComponent