import { Text, Paper, Divider, Input, ScrollArea } from '@mantine/core';

import MensajeComponent from './MensajeComponent';

function ChatComponent() {
    return (

        <div className='chats_component_area'>

            <ScrollArea style={{ bottom: '10px' }} >
                <div className='ChatsArea'>

                    <MensajeComponent
                        tipo='received'
                        mensaje='Esto es una prueba de un mensaje siendo un reciever y quiero extender un poco mas el texto para ver el segundo.'
                        fecha='12/24/2023'
                    />

                    <MensajeComponent
                        tipo='sent'
                        mensaje='Esto es una prueba de un mensaje siendo un sender.'
                        fecha='12/24/2023'
                    />


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