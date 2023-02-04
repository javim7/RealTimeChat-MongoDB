// * Importamos los componentes de Mantine:
import {
    Modal,
    Image,
    Button,
    TextInput,
    PasswordInput
} from '@mantine/core';

// * Importamos la imagen de referencia para la actualizacion del perfil:
import imagenActualizacionPerfil from '../assets/Friendsreference.png'

function ModalUpdateProfileComponent({ opened, setOpened, datosUsuario }) {

    return (
        <Modal
            overlayOpacity={0.55}
            overlayBlur={3}
            opened={opened}
            onClose={() => setOpened(false)}
            title="Actualiza tu perfil"
        >

            <TextInput
                placeholder={datosUsuario.name}
                label="Nombre completo"
            />

            <div style={{ width: 240, marginLeft: 'auto', marginRight: 'auto' }}>
                <Image
                    radius="md"
                    src={imagenActualizacionPerfil}
                />
            </div>

            <TextInput
                placeholder={datosUsuario.username}
                label="Nombre de usuario"
            />

            <PasswordInput
                placeholder="Password"
                label="Clave"
                variant="filled"
            />

            <Button color="indigo" uppercase>
                Guardar
            </Button>

        </Modal>
    )

}

export default ModalUpdateProfileComponent