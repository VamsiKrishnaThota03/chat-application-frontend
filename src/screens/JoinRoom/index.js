import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Alert, Button, Input } from 'antd';
import { MessageOutlined, UserOutlined, NumberOutlined } from '@ant-design/icons';
import { socket } from '../../config/web-sockets';
import { useSocketConnected } from '../../hooks';
import { colors } from '../../theme';

function JoinRoom({ onJoinSuccess }) {
    const [username, setUsername] = useState('');
    const [room, setRoom] = useState('');
    const [error, setError] = useState('');
    const [joining, setJoining] = useState(false);
    const connected = useSocketConnected();

    useEffect(() => {
        const onWelcome = (data) => {
            setJoining(false);
            onJoinSuccess(data);
        };
        socket.on('welcome', onWelcome);
        return () => socket.off('welcome', onWelcome);
    }, [onJoinSuccess]);

    const onSubmit = (e) => {
        e.preventDefault();
        const name = username.trim();
        const roomName = room.trim();
        if (!name || !roomName) {
            setError('Please enter both a name and a room.');
            return;
        }
        setError('');
        setJoining(true);
        socket.emit('join', { username: name, room: roomName }, (err) => {
            if (err) {
                setError(err);
                setJoining(false);
            }
        });
    };

    return (
        <Page>
            <Card as="form" onSubmit={onSubmit} aria-labelledby="join-title">
                <Logo aria-hidden="true">
                    <MessageOutlined />
                </Logo>
                <Title id="join-title">Join a chat room</Title>
                <Subtitle>Pick a display name and a room. Anyone in the same room sees your messages in real time.</Subtitle>

                {error && <Alert type="error" message={error} showIcon style={{ marginBottom: 16, textAlign: 'left' }} />}
                {!connected && (
                    <Alert
                        type="warning"
                        showIcon
                        message="Connecting to the chat server…"
                        style={{ marginBottom: 16, textAlign: 'left' }}
                    />
                )}

                <Field htmlFor="username">
                    Your name
                    <Input
                        id="username"
                        size="large"
                        prefix={<UserOutlined style={{ color: colors.muted }} />}
                        placeholder="e.g. Alex"
                        maxLength={25}
                        autoComplete="nickname"
                        autoFocus
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Field>
                <Field htmlFor="room">
                    Room
                    <Input
                        id="room"
                        size="large"
                        prefix={<NumberOutlined style={{ color: colors.muted }} />}
                        placeholder="e.g. general or 42"
                        maxLength={25}
                        value={room}
                        onChange={(e) => setRoom(e.target.value)}
                    />
                </Field>
                <Button type="primary" htmlType="submit" size="large" block loading={joining} disabled={!connected}>
                    Join the chat
                </Button>
            </Card>
        </Page>
    );
}

export default JoinRoom;

const Page = styled.main`
    min-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px 16px;
    background: radial-gradient(circle at 20% 10%, #e3ecff 0, transparent 45%),
        radial-gradient(circle at 80% 90%, #efe7ff 0, transparent 40%), ${colors.page};
`;

const Card = styled.div`
    width: 100%;
    max-width: 420px;
    background: ${colors.surface};
    border: 1px solid ${colors.border};
    border-radius: 16px;
    padding: 32px 28px;
    box-shadow: 0 10px 30px rgba(31, 41, 55, 0.08);
    text-align: center;
`;

const Logo = styled.div`
    width: 56px;
    height: 56px;
    margin: 0 auto 16px;
    border-radius: 16px;
    display: grid;
    place-items: center;
    font-size: 26px;
    color: #fff;
    background: linear-gradient(135deg, ${colors.primary}, #7c3aed);
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: 700;
    margin: 0 0 6px;
    color: ${colors.text};
`;

const Subtitle = styled.p`
    color: ${colors.muted};
    margin: 0 0 24px;
`;

const Field = styled.label`
    display: block;
    text-align: left;
    font-weight: 600;
    color: ${colors.text};
    margin-bottom: 16px;

    .ant-input-affix-wrapper {
        margin-top: 6px;
        border-radius: 10px;
    }
`;
