import { Text, Paper, Divider, Input, ScrollArea } from '@mantine/core';
import React, { useEffect, useState } from "react";

import MensajeComponent from './MensajeComponent';

function ChatComponent({ formEmail, chatElegido }) {

    const [conversacion, setConversacion] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/chats/" + formEmail + "/" + chatElegido)
            .then(res => res.json())
            .then(data => {
                setConversacion(data[0].messages);
            })
    }, [chatElegido]);

    useEffect(() => {
        console.log(conversacion);
    }, [conversacion]);

    return (

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

                            console.log('\n\n\nSender: ', mensaje.sender);
                            console.log('Reciever: ', mensaje.receiver);
                            console.log('El ternario es (Sender == EmailCuenta?): ', mensaje.sender === formEmail);

                            return (

                                <MensajeComponent
                                    tipo={mensaje.sender === formEmail ? 'sent' : 'received'}
                                    mensaje={mensaje.message}
                                    fecha={mensaje.createdAt}
                                />

                            )
                        })

                    }


                </div>
            </ScrollArea>


            <div className='input_chat_area'>
                <Input
                    placeholder="Escribe que hubo"
                />

            </div>

        </div>



    );
}

export default ChatComponent