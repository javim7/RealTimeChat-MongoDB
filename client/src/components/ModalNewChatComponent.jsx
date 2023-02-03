import { Modal, useMantineTheme, TextInput, Divider, Image, Button } from '@mantine/core';
import { useState, useEffect } from 'react';

import imagen_nuevo_chat from '../assets/new_chat_image.png'

function ModalNewChatComponent({ opened, setOpened, formEmail }) {
    const theme = useMantineTheme();
    const [destinatario, setDestinatario] = useState('');
    const [errorCorreo, setErrorCorreo] = useState(false);
    const [mensaje, setMensaje] = useState('');

    const handleClick = async () => {
        await fetch('http://localhost:5000/api/users/' + destinatario)
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                if (data.error) {
                    setErrorCorreo(true);
                }
                postMessage();
                setOpened(false)
            })
    }

    const postMessage = async () => {
        let databody = {
            "user1": formEmail,
            "user2": destinatario,
            "message": {
                "sender": formEmail,
                "receiver": destinatario,
                "message": mensaje
            }
        }

        fetch('http://localhost:5000/api/chats', {
            method: 'POST',
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

    return (
        <Modal
            overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
            overlayOpacity={0.55}
            overlayBlur={3}
            opened={opened}
            onClose={() => setOpened(false)}
            title="Nuevo chat!"
        >
            <Divider my="sm" variant="dashed" />
            <TextInput
                placeholder="Escribe el correo de la persona"
                label="Destinatario"
                onChange={(e) => { setDestinatario(e.target.value) }}
                error={errorCorreo ? "Usuario inexistente" : undefined}
            />
            <Divider my="sm" variant="dashed" />
            <TextInput
                placeholder="Que hubo??!"
                label="Mensaje"
                onChange={(e) => { setMensaje(e.target.value) }}
            />
            <Divider my="sm" variant="dashed" />
            <div style={{ width: 240, marginLeft: 'auto', marginRight: 'auto' }}>
                <Image
                    radius="md"
                    src={imagen_nuevo_chat}
                    alt="Random unsplash image"
                />
            </div>
            <Button
                color="cyan"
                uppercase
                className='boton_enviar_mensaje'
                onClick={() => { handleClick() }}
            >
                Enviar
            </Button>
        </Modal>
    );
}

export default ModalNewChatComponent