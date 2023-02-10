import { Text, Paper, Divider, Input, ScrollArea } from '@mantine/core';

import { useState, useEffect } from 'react';

function MensajeComponent(props) {

    const [tipoMensaje, setTipoMensaje] = useState('');

    useEffect(() => {
        setTipoMensaje(props.tipo);
    }, [tipoMensaje]);

    return (
        <Paper key={Math.floor(Math.random() * 1000) + 1}
            shadow="xl"
            radius="lg"
            p="md"
            className={'mensaje_individual ' + tipoMensaje}>
            <div className='mensaje_individual_div'>
                <Text>
                    {props.mensaje}
                </Text>
                <Text c="dimmed" fz="xs" style={{ alignSelf: 'flex-end' }}>{props.fecha}</Text>
            </div>
        </Paper>
    )

}

export default MensajeComponent
