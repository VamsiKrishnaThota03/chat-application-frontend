import React from 'react';
import { Row, Bubble, Author, SystemNote } from './styles';

function Message({ username, message: { user, text } }) {
    if (user === 'bot') {
        return <SystemNote>{text}</SystemNote>;
    }

    const mine = user === username;
    return (
        <Row $mine={mine}>
            {!mine && <Author>{user}</Author>}
            <Bubble $mine={mine}>{text}</Bubble>
        </Row>
    );
}

export default Message;
