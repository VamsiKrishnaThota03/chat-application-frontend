import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import styled from 'styled-components';
import Message from './Message';

function Messages({ messages, username }) {
    return (
        <StyledMessages role="log" aria-live="polite" aria-label="Messages">
            <ScrollToBottom className="scroller" followButtonClassName="follow">
                <div className="inner">
                    {messages.map((message, i) => (
                        // Messages have no id; the index is stable because the list only grows.
                        // eslint-disable-next-line react/no-array-index-key
                        <Message key={i} message={message} username={username} />
                    ))}
                </div>
            </ScrollToBottom>
        </StyledMessages>
    );
}

export default Messages;

const StyledMessages = styled.div`
    flex: 1;
    min-height: 0;
    background: #fbfcff;

    .scroller {
        height: 100%;
    }

    .inner {
        padding: 20px 20px 8px;
    }
`;
