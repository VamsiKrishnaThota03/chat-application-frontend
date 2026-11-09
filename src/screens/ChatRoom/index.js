import React, { useEffect, useState } from 'react';
import { Alert, Button, Input } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import Header from '../../components/Header';
import Messages from '../../components/Messages';
import List from '../../components/List';
import { socket } from '../../config/web-sockets';
import { useSocketConnected } from '../../hooks';
import { Layout, Panel, ChatBox, Composer } from './styles';

const MAX_LENGTH = 1000;

function ChatRoom({ joinData, onLeave }) {
    const { username, room } = joinData.userData;
    const [messages, setMessages] = useState([joinData]);
    const [message, setMessage] = useState('');
    const [users, setUsers] = useState([joinData.userData]);
    const [error, setError] = useState('');
    const connected = useSocketConnected();

    useEffect(() => {
        const onMessage = (msg) => setMessages((list) => [...list, msg]);
        const onRoomInfo = (info) => setUsers(info.users || []);
        socket.on('message', onMessage);
        socket.on('roomInfo', onRoomInfo);
        return () => {
            socket.off('message', onMessage);
            socket.off('roomInfo', onRoomInfo);
        };
    }, []);

    // A dropped connection removes us from the room on the server.
    useEffect(() => {
        if (!connected) setError('Connection lost. Leave and rejoin the room once you are back online.');
    }, [connected]);

    const sendMessage = (e) => {
        e.preventDefault();
        const text = message.trim();
        if (!text) return;
        socket.emit('sendMessage', { message: text }, (err) => {
            if (err) setError(err);
        });
        setMessage('');
    };

    return (
        <Layout>
            <Panel>
                <Header room={room} count={users.length} connected={connected} onLeave={onLeave} />
                {error && (
                    <Alert
                        type="warning"
                        showIcon
                        banner
                        message={error}
                        action={
                            <Button size="small" onClick={onLeave}>
                                Rejoin
                            </Button>
                        }
                    />
                )}
                <div className="body">
                    <List users={users} currentUser={username} />
                    <ChatBox>
                        <Messages messages={messages} username={username} />
                        <Composer onSubmit={sendMessage}>
                            <label htmlFor="message" className="visually-hidden">
                                Message
                            </label>
                            <Input
                                id="message"
                                size="large"
                                placeholder={`Message #${room}`}
                                value={message}
                                maxLength={MAX_LENGTH}
                                autoComplete="off"
                                autoFocus
                                onChange={(e) => setMessage(e.target.value)}
                            />
                            <Button
                                type="primary"
                                size="large"
                                htmlType="submit"
                                icon={<SendOutlined />}
                                disabled={!message.trim() || !connected}
                                aria-label="Send message"
                            />
                        </Composer>
                    </ChatBox>
                </div>
            </Panel>
        </Layout>
    );
}

export default ChatRoom;
