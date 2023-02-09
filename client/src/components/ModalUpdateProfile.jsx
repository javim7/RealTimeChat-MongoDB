import { useState, useEffect } from 'react';

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

    const [nuevoNombre, setNuevoNombre] = useState('');
    const [nuevoUsername, setNuevoUsername] = useState('');
    const [nuevoPassword, setNuevoPassword] = useState('');
    const [errorUpdate, setErrorUpdate] = useState(false);
    const [aparecer, setAparecer] = useState(false);

    const handleUpdate = async () => {
        // console.log(nuevoNombre, nuevoUsername, nuevoPassword);

        let databody = {
            "name": nuevoNombre,
            "username": nuevoUsername,
            "password": nuevoPassword
        }
        // console.log(JSON.stringify(databody))
        fetch('http://localhost:5000/api/users/' + datosUsuario.email, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(databody)
        })
            .then(res => res.json())
            .then(data => {
                if (data.name === undefined || data.username === undefined || data.password === undefined) {
                    setErrorUpdate(true);
                }
                setOpened(false);
                setErrorUpdate(false);
                setAparecer(false);
            })
            .catch(error => {
                console.error(error);
            });

    }

    useEffect(() => {
        if (nuevoNombre !== '' && nuevoUsername !== '' && nuevoPassword !== '') {
            setAparecer(true);
        }
        else {
            setAparecer(false);
        }

    }, [nuevoNombre, nuevoUsername, nuevoPassword])

    return (
        <Modal
            overlayOpacity={0.55}
            overlayBlur={3}
            opened={opened}
            onClose={() => { setOpened(false); setErrorUpdate(false) }}
            title="Actualiza tu perfil"
        >

            <TextInput
                placeholder={datosUsuario.name}
                label="Nombre completo"
                onChange={(e) => setNuevoNombre(e.target.value)}
                error={errorUpdate ? " " : undefined}
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
                onChange={(e) => setNuevoUsername(e.target.value)}
                error={errorUpdate ? " " : undefined}
            />

            <PasswordInput
                placeholder="Password"
                label="Clave"
                variant="filled"
                style={{ marginTop: "10px" }}
                onChange={(e) => setNuevoPassword(e.target.value)}
                error={errorUpdate ? "Debe de llenar todos los campos" : undefined}
            />

            {
                aparecer ?
                    <Button color="indigo" uppercase style={{ marginTop: "20px" }} onClick={() => handleUpdate()}>
                        Guardar
                    </Button>
                    : null

            }

        </Modal>
    )

}

export default ModalUpdateProfileComponent