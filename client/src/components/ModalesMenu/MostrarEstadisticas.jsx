import {
    Modal,
    Table,
    Badge,
    List,
    Text,
    Avatar
} from '@mantine/core';

import { useState, useEffect } from 'react';

function MostrarEstadisticasComponent({ opened, setOpened, emailUsuario }) {

    const [topUserContacts, setTopUserContacts] = useState([]);
    const [topUserContactsRows, setTopUserContactsRows] = useState([]);

    const [cantidadChatsActivos, setCantidadChatsActivos] = useState(0);
    const [cantidadMensajesEnviados, setCantidadMensajesEnviados] = useState(0);
    const [cantidadMensajesRecibidos, setCantidadMensajesRecibidos] = useState(0);

    useEffect(() => {


        const fetchDataTopUsers = async () => {
            const response = await fetch('http://localhost:5000/api/chats/top/contacts/' + emailUsuario);
            const data = await response.json();
            setTopUserContacts(data);
        };

        fetchDataTopUsers();

        const fetchDataActivos = async () => {
            const response = await fetch('http://localhost:5000/api/chats/count/active/' + emailUsuario);
            const data = await response.json();
            setCantidadChatsActivos(data[0].count);
        };

        fetchDataActivos();

        const fetchDataMensajesEnviados = async () => {
            const response = await fetch('http://localhost:5000/api/chats/count/sent/' + emailUsuario);
            const data = await response.json();
            setCantidadMensajesEnviados(data[0].count);
        };

        fetchDataMensajesEnviados();



        const fetchDataMensajesRecibidos = async () => {
            const response = await fetch('http://localhost:5000/api/chats/count/received/' + emailUsuario);
            const data = await response.json();
            setCantidadMensajesRecibidos(data[0].count);
        };

        fetchDataMensajesRecibidos();

    }, []);

    useEffect(() => {
        const rows = topUserContacts.map(contact => (
            <tr key={contact._id}>
                <td>{contact.otherUser}</td>
                <td>{contact.messageCount}</td>
            </tr>
        ));
        setTopUserContactsRows(rows);
    }, [topUserContacts]);



    return (
        <Modal
            opened={opened}
            onClose={() => setOpened(false)}
        >
            <div>
                <Badge color="cyan" size="lg" radius="sm" variant="filled" className='subtitulo_mostrar_estadisticas'>Top 5 contactos</Badge>
                <Table>
                    <thead>
                        <tr>
                            <th>Usuario</th>
                            <th>Cantidad de mensajes</th>
                        </tr>
                    </thead>
                    <tbody>{topUserContactsRows}</tbody>
                </Table>
            </div>
            <div>
                <Badge color="cyan" size="lg" radius="sm" variant="filled" className='subtitulo_mostrar_estadisticas subtitulo_bajo'>Estadisticas generales</Badge>

                <div className='item_list_estadistica'>
                    <Avatar radius="xl" color="violet" size="sm">{cantidadChatsActivos}</Avatar>
                    <Text c="black">Chats activos</Text>
                </div>

                <div className='item_list_estadistica'>
                    <Avatar radius="xl" color="orange" size="sm">{cantidadMensajesRecibidos}</Avatar>
                    <Text c="black">Mensajes recibidos</Text>

                </div>

                <div className='item_list_estadistica'>
                    <Avatar radius="xl" color="green" size="sm">{cantidadMensajesEnviados}</Avatar>
                    <Text c="black">Mensajes enviados</Text>
                </div>


            </div>
        </Modal>
    )
}

export default MostrarEstadisticasComponent;