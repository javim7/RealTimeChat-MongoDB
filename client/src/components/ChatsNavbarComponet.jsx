import { Navbar, Divider, AppShell, Avatar, Text, ScrollArea, UnstyledButton, Group, Image, Button, Menu } from '@mantine/core';

import ModalNewChatComponent from './ModalNewChatComponent';

import { useState, useEffect } from 'react';

function ChatsNavbarComponent({ formEmail, setChatElegido }) {

    const [modalOpened, setModalOpened] = useState(false);
    const [chatsUsuario, setChatsUsuario] = useState([]);
    const [datosUsuario, setDatosUsuario] = useState('');

    useEffect(() => {
        fetch("http://localhost:5000/api/chats/" + formEmail)
            .then(res => res.json())
            .then(data => {
                setChatsUsuario(data);
                chatsUsuario.reverse()
            })
    }, []);

    const HandleClickChat = (chat_email) => {

        let chat_email_temp = chat_email;
        // MODIFICAR UN DADO USESTATE QUE VENGA DESDE LA 
        setChatElegido(chat_email_temp)
    }


    useEffect(() => {
        // chatsUsuario.reverse()
        // console.log(chatsUsuario);
    }, [chatsUsuario]);

    return (

        <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">


            <div className='Seccion_chats'>

                <ModalNewChatComponent opened={modalOpened} setOpened={setModalOpened} formEmail={formEmail} />

                <Button
                    color="cyan"
                    uppercase
                    className='boton_nuevo_chat'
                    onClick={() => { setModalOpened(true) }}
                >
                    + Nuevo Chat
                </Button>
                {
                    chatsUsuario.map((chat) => {
                        return (
                            <UnstyledButton
                                className='Boton_chat_individual'
                                onClick={() => { HandleClickChat(chat.email) }}
                            >
                                <Group>
                                    <Avatar size={40} color="blue">{chat.name.split(" ")[0][0] + chat.name.split(" ")[1][0]}</Avatar>
                                    <div>
                                        <Text>{chat.name}</Text>
                                        <Text size="xs" color="dimmed">{chat.email}</Text>
                                    </div>
                                </Group>
                            </UnstyledButton>
                        )
                    })

                    // chatsUsuario.map((chat) => {
                    //     return (
                    //         <UnstyledButton
                    //             className='Boton_chat_individual'
                    //             onClick={() => { console.log('Chat individual') }}
                    //         >
                    //             <Group className='grupo_chat'>
                    //                 {
                    //                     chat.user2 === formEmail
                    //                         ?
                    //                         <Avatar size={40} color="blue">BH</Avatar>
                    //                         :
                    //                         <Avatar size={40} color="blue">BH</Avatar>
                    //                 }

                    //                 <div>
                    //                     {
                    //                         chat.user2 === formEmail
                    //                             ?
                    //                             <Text fz="sm">{chat.user1}</Text>
                    //                             :
                    //                             <Text fz="sm">{chat.user2}</Text>
                    //                     }
                    //                     {
                    //                         chat.user2 === formEmail
                    //                             ?
                    //                             <Text size="xs" color="dimmed">{chat.user1}</Text>
                    //                             :
                    //                             <Text size="xs" color="dimmed">{chat.user2}</Text>
                    //                     }
                    //                 </div>
                    //             </Group>

                    //         </UnstyledButton>
                    // )
                    // })
                }

            </div>

        </Navbar.Section>
    )

}

export default ChatsNavbarComponent