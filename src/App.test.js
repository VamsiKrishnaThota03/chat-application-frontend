import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Message from './components/Messages/Message';
import List from './components/List';

jest.mock('./config/web-sockets', () => {
    const handlers = {};
    return {
        SERVER_URL: 'http://localhost:1337',
        socket: {
            connected: true,
            on: (e, fn) => { handlers[e] = fn; },
            off: () => {},
            emit: jest.fn(),
            connect: jest.fn(),
            disconnect: jest.fn(),
        },
    };
});

// eslint-disable-next-line import/first
import JoinRoom from './screens/JoinRoom';

test('join screen renders a labelled form', () => {
    render(
        <Router history={createMemoryHistory()}>
            <JoinRoom onJoinSuccess={() => {}} />
        </Router>
    );
    expect(screen.getByRole('heading', { name: /join a chat room/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^room/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /join the chat/i })).toBeEnabled();
});

test('bot messages render as system notes, own messages as bubbles', () => {
    render(
        <>
            <Message username="alex" message={{ user: 'bot', text: 'sam has joined' }} />
            <Message username="alex" message={{ user: 'sam', text: 'hello' }} />
        </>
    );
    expect(screen.getByText('sam has joined')).toBeInTheDocument();
    expect(screen.getByText('sam')).toBeInTheDocument();
    expect(screen.getByText('hello')).toBeInTheDocument();
});

test('member list marks the current user', () => {
    render(<List users={[{ id: '1', username: 'alex' }, { id: '2', username: 'sam' }]} currentUser="alex" />);
    expect(screen.getByText('Online · 2')).toBeInTheDocument();
    expect(screen.getByText('you')).toBeInTheDocument();
});
