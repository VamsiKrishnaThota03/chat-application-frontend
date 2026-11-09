import React, { useCallback, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import JoinRoom from './screens/JoinRoom';
import ChatRoom from './screens/ChatRoom';
import { history } from './config/network';
import { socket } from './config/web-sockets';

function App() {
    const [joinData, setJoinData] = useState(null);

    const onJoinSuccess = useCallback((data) => {
        setJoinData(data);
        history.push(`/chat/rooms/${encodeURIComponent(data.userData.room)}`);
    }, []);

    const onLeave = useCallback(() => {
        // Reconnecting gives a fresh socket id; the server removes the old member on disconnect.
        socket.disconnect();
        socket.connect();
        setJoinData(null);
        history.push('/join');
    }, []);

    return (
        <Switch>
            <Route path="/join" render={() => <JoinRoom onJoinSuccess={onJoinSuccess} />} />
            <Route
                path="/chat/rooms/:room"
                render={() =>
                    joinData ? <ChatRoom joinData={joinData} onLeave={onLeave} /> : <Redirect to="/join" />
                }
            />
            <Redirect to="/join" />
        </Switch>
    );
}

export default App;
