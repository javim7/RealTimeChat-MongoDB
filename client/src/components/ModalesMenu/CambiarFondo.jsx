import {
    Modal,
    Image,
    Button,
    TextInput,
    PasswordInput,
    FileButton,
    Group,
    Text
} from '@mantine/core';

import { useState, useEffect } from 'react';

import assetCambiarFondo from '../../assets/Upload-image.png'

function CambiarFondoComponent({ opened, setOpened }) {

    const [imagen, setImagen] = useState(null);

    return (
        <Modal
            opened={opened}
            onClose={() => setOpened(false)}
        >
            <div style={{ width: 240, marginLeft: 'auto', marginRight: 'auto' }}>
                <Image
                    radius="md"
                    src={assetCambiarFondo}
                />
            </div>


            <div className='CambiarFondoComponent_grupo'>
                <Group position="center" >
                    <FileButton onChange={setImagen} accept="image/png,image/jpeg">
                        {(props) => <Button {...props}>Subir imagen</Button>}
                    </FileButton>
                </Group>
                {imagen && (
                    <Text size="sm" align="center" mt="sm">
                        Elegiste: {imagen.name}
                    </Text>
                )}
            </div>

        </Modal>
    )
}

export default CambiarFondoComponent;