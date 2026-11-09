import React from 'react';
import styled from 'styled-components';
import { Avatar } from 'antd';
import { colors, colorFor } from '../../theme';

function List({ users = [], currentUser }) {
    return (
        <Sidebar aria-label="People in this room">
            <Heading>Online · {users.length}</Heading>
            <ul>
                {users.map((user) => (
                    <li key={user.id || user.username}>
                        <Avatar size={32} style={{ background: colorFor(user.username), flex: '0 0 auto' }}>
                            {user.username.slice(0, 1).toUpperCase()}
                        </Avatar>
                        <span className="name">{user.username}</span>
                        {user.username === currentUser && <span className="you">you</span>}
                    </li>
                ))}
            </ul>
        </Sidebar>
    );
}

export default List;

const Sidebar = styled.aside`
    flex: 0 0 240px;
    border-right: 1px solid ${colors.border};
    background: #fafbfe;
    padding: 16px 12px;
    overflow-y: auto;

    ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    li {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px;
        border-radius: 10px;
    }

    li:hover {
        background: ${colors.primarySoft};
    }

    .name {
        color: ${colors.text};
        font-weight: 500;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .you {
        margin-left: auto;
        font-size: 11px;
        color: ${colors.primary};
        background: ${colors.primarySoft};
        border-radius: 999px;
        padding: 1px 8px;
    }

    @media (max-width: 640px) {
        display: none;
    }
`;

const Heading = styled.h2`
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: ${colors.muted};
    margin: 0 8px 8px;
`;
