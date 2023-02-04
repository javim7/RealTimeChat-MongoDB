import { Text, Paper, Divider, Input, ScrollArea, Tooltip, Button, ActionIcon, Image } from '@mantine/core';
import React, { useEffect, useState } from "react";
import { Send } from 'tabler-icons-react';
import imgChat from "../assets/chatAreaEmpty.png";
import MensajeComponent from './MensajeComponent';

function ChatComponent({ formEmail, chatElegido }) {

    const [conversacion, setConversacion] = useState([]);
    const [chatIdActual, setChatIdActual] = useState('');

    const [mensaje_a_enviar, setMensaje_A_Enviar] = useState('');

    const postMessageToConversation = async () => {

        let databody = {
            "id": chatIdActual,
            "message_sender": formEmail,
            "message_reciever": chatElegido,
            "message_content": mensaje_a_enviar
        }

        console.log(JSON.stringify(databody));


        fetch('http://localhost:5000/api/chats/' + chatIdActual, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(databody)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error(error);
            });

    }


    useEffect(() => {
        fetch("http://localhost:5000/api/chats/" + formEmail + "/" + chatElegido)
            .then(res => res.json())
            .then(data => {
                setConversacion(data[0].messages);
            })
    }, [chatElegido]);

    useEffect(() => {
        fetch("http://localhost:5000/api/chats/" + formEmail + "/" + chatElegido)
            .then(res => res.json())
            .then(data => {
                setChatIdActual(data[0]._id);
            })
    }, [chatElegido]);


    useEffect(() => {
        console.log(conversacion);
    }, [conversacion]);
    useEffect(() => {
        console.log(chatElegido);
    }, [chatElegido]);

    useEffect(() => {
        console.log(chatIdActual);
    }, [chatIdActual]);


    return (

        <div>
            {conversacion !== undefined ?
                <div className='chats_component_area'>

                    <ScrollArea style={{ bottom: '10px' }} >
                        <div className='ChatsArea'>

                            {
                                // chatElegido && conversacion.map((mensaje) => {
                                //     return (

                                //         <MensajeComponent>
                                //             tipo = {mensaje.sender === formEmail ? 'sent' : 'received'}
                                //             mensaje = {mensaje.message}
                                //             fecha = {mensaje.createdAt}
                                //         </MensajeComponent>

                                //     )
                                // })

                                (chatElegido !== '' && conversacion !== undefined) && conversacion.map((mensaje) => {

                                    // console.log('\n\n\nSender: ', mensaje.sender);
                                    // console.log('Reciever: ', mensaje.receiver);
                                    // console.log('El ternario es (Sender == EmailCuenta?): ', mensaje.sender === formEmail);

                                    return (

                                        <MensajeComponent id={mensaje.message}
                                            tipo={mensaje.sender === formEmail ? 'sent' : 'received'}
                                            mensaje={mensaje.message}
                                            fecha={mensaje.createdAt}
                                        />

                                    )
                                })

                            }


                        </div>
                    </ScrollArea>


                    {conversacion !== undefined ?

                        <div className='input_chat_area'>
                            <Input
                                className='input_chat'
                                placeholder="Escribe que hubo"
                                value={mensaje_a_enviar}
                                onChange={(e) => setMensaje_A_Enviar(e.target.value)}
                            />
                            {
                                mensaje_a_enviar !== '' ?
                                    <Tooltip
                                        label="Enviar"
                                        onClick={() => {
                                            setMensaje_A_Enviar('')
                                            postMessageToConversation()
                                        }}
                                    >
                                        <ActionIcon variant="filled" color="blue" size="lg"><Send size={16} /></ActionIcon>
                                    </Tooltip>
                                    :
                                    <Tooltip
                                        label="Enviar"
                                        className='tooltip_disabled'
                                    >
                                        <ActionIcon variant="filled" color="blue" size="lg"><Send size={16} /></ActionIcon>
                                    </Tooltip>
                            }

                        </div>
                        :
                        <div className='input_chat_area2'></div>

                    }

                </div >
                :
                <div className='chats_component_area2'>
                    <div className='welcomeContainer'>
                        <img src={imgChat} alt="chatImg" className='imgChatArea' />
                    </div>
                    <div className='textContainer'>
                        <h1>QueHubo Live Chat</h1>
                        <p className='parrafoTexto'>Envia y recibe mensajes sin necesidad de tener un telefono conectado.</p>
                        <p className='parrafoTexto'>Usa QueHubo en hasta 4 dispositivos vinculados en 1 telefono a la vez.</p>
                        <p className='cifradoTxt'>Cifrado de extremo a extremo</p>
                    </div>
                </div>
            }
        </div >



    );
}

export default ChatComponent