import React from 'react';
import styled from 'styled-components';
import { Button, Tooltip } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { colors } from '../../theme';

function Header({ room, count, connected, onLeave }) {
    return (
        <StyledHeader>
            <div>
                <RoomName>#{room}</RoomName>
                <Meta>
                    <Dot $online={connected} aria-hidden="true" />
                    {connected ? `${count} online` : 'Reconnecting…'}
                </Meta>
            </div>
            <Tooltip title="Leave room">
                <Button icon={<LogoutOutlined />} onClick={onLeave}>
                    Leave
                </Button>
            </Tooltip>
        </StyledHeader>
    );
}

export default Header;

const StyledHeader = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 14px 20px;
    border-bottom: 1px solid ${colors.border};
    background: ${colors.surface};
`;

const RoomName = styled.h1`
    margin: 0;
    font-size: 18px;
    font-weight: 700;
    color: ${colors.text};
    word-break: break-all;
`;

const Meta = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
    color: ${colors.muted};
    font-size: 13px;
`;

const Dot = styled.span`
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${(p) => (p.$online ? colors.online : '#9ca3af')};
`;
