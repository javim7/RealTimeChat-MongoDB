import { Text, Paper, Divider, Input, ScrollArea } from '@mantine/core';

function ChatComponent() {
    return (

        <div className='chats_component_area'>

            <ScrollArea style={{ bottom: '10px' }} >
                <div className='ChatsArea'>

                    <Paper
                        shadow="xl"
                        radius="lg"
                        p="md"
                        className='mensaje_individual received'>
                        <Text>Paper is the most basic ui component</Text>
                        <Text>
                            Use it to create cards, dropdowns, modals and other components that require background
                            with shadow
                        </Text>
                    </Paper>

                    <Paper
                        shadow="xl"
                        radius="lg"
                        p="md"
                        className='mensaje_individual received'>
                        <Text>Paper is the most basic ui component</Text>
                        <Text>
                            Use it to create cards, dropdowns, modals and other components that require background
                            with shadow
                        </Text>
                    </Paper>

                    <Paper
                        shadow="xl"
                        radius="lg"
                        p="md"
                        className='mensaje_individual received'>
                        <Text>Paper is the most basic ui component</Text>
                        <Text>
                            Use it to create cards, dropdowns, modals and other components that require background
                            with shadow
                        </Text>
                    </Paper>



                    <Paper shadow="xl" radius="lg" p="md" className='mensaje_individual sent'>
                        <Text>Paper is the most basic ui component</Text>
                        <Text>
                            Use it to create cards, dropdowns, modals and other components that require background
                            with shadow
                        </Text>
                    </Paper>

                    <Paper shadow="xl" radius="lg" p="md" className='mensaje_individual received'>
                        <Text>Paper is the most basic ui component</Text>
                        <Text>
                            Use it to create cards, dropdowns, modals and other components that require background
                            with shadow
                        </Text>
                    </Paper>

                    <Paper shadow="xl" radius="lg" p="md" className='mensaje_individual received'>
                        <Text>Paper is the most basic ui component</Text>
                        <Text>
                            Use it to create cards, dropdowns, modals and other components that require background
                            with shadow
                        </Text>
                    </Paper>

                    <Paper shadow="xl" radius="lg" p="md" className='mensaje_individual sent'>
                        <Text>Paper is the most basic ui component</Text>
                        <Text>
                            Use it to create cards, dropdowns, modals and other components that require background
                            with shadow
                        </Text>
                    </Paper>

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