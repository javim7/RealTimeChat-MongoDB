import { Modal, useMantineTheme, TextInput, Divider, Image, Button } from '@mantine/core';

import imagen_nuevo_chat from '../assets/new_chat_image.png'

function ModalNewChatComponent({ opened, setOpened }) {
    const theme = useMantineTheme();

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
                label="Destino"
            />
            <Divider my="sm" variant="dashed" />
            <TextInput
                placeholder="Que hubo??!"
                label="Mensaje"
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
                onClick={() => { setOpened(false) }}
            >
                Enviar
            </Button>
        </Modal>
    );
}

export default ModalNewChatComponent