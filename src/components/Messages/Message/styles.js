import styled from 'styled-components';
import { colors } from '../../../theme';

export const Row = styled.div`
    display: flex;
    flex-direction: column;
    align-items: ${(p) => (p.$mine ? 'flex-end' : 'flex-start')};
    margin-bottom: 10px;
`;

export const Author = styled.span`
    font-size: 12px;
    color: ${colors.muted};
    margin: 0 0 2px 12px;
`;

export const Bubble = styled.p`
    margin: 0;
    max-width: min(75%, 560px);
    padding: 10px 14px;
    border-radius: 16px;
    border-bottom-right-radius: ${(p) => (p.$mine ? '4px' : '16px')};
    border-bottom-left-radius: ${(p) => (p.$mine ? '16px' : '4px')};
    background: ${(p) => (p.$mine ? colors.primary : '#eef0f5')};
    color: ${(p) => (p.$mine ? '#fff' : colors.text)};
    font-size: 15px;
    line-height: 1.45;
    white-space: pre-wrap;
    word-wrap: break-word;
    overflow-wrap: anywhere;
`;

export const SystemNote = styled.p`
    text-align: center;
    color: ${colors.muted};
    font-size: 12px;
    margin: 8px 0 12px;
`;
