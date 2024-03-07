import { keyframes } from 'styled-components';

export const fadeOut = keyframes`
    0% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
`;

export const fadeIn = keyframes`    
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
`;

export const slideUpAndFadeOut = keyframes`
    0% {
        opacity: 1;
        transform: translateY(0);
    }

    100% {
        opacity: 0;
        transform: translateY(-50%);
    }
`;

export const slideUpAndFadeIn = keyframes`
    0% {
        opacity: 0;
        transform: translateY(50%);
    }

    100% {
        opacity: 1;
        transform: translateY(0);
    }
`;
