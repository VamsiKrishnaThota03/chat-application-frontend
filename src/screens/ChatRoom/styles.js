import styled from 'styled-components';
import { colors } from '../../theme';

export const Layout = styled.main`
    height: 100%;
    display: flex;
    justify-content: center;
    padding: 24px;
    background: ${colors.page};

    @media (max-width: 640px) {
        padding: 0;
    }
`;

export const Panel = styled.div`
    width: 100%;
    max-width: 1100px;
    display: flex;
    flex-direction: column;
    background: ${colors.surface};
    border: 1px solid ${colors.border};
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(31, 41, 55, 0.08);

    .body {
        flex: 1;
        display: flex;
        min-height: 0;
    }

    .visually-hidden {
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip: rect(0 0 0 0);
        white-space: nowrap;
    }

    @media (max-width: 640px) {
        border-radius: 0;
        border: none;
    }
`;

export const ChatBox = styled.section`
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
`;

export const Composer = styled.form`
    display: flex;
    gap: 8px;
    padding: 12px 16px;
    border-top: 1px solid ${colors.border};
    background: ${colors.surface};

    .ant-input {
        border-radius: 10px;
    }

    .ant-btn {
        border-radius: 10px;
        flex: 0 0 auto;
    }
`;
