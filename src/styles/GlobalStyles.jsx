/** @jsxImportSource @emotion/react */
import {Global, css} from '@emotion/react';

const GlobalStyles = () => (
    <Global
    styles={css`
        /* Emotion으로 관리할 글로벌 스타일 */
        a {
            color: inherit;
            text-decoration: NamedNodeMap;
        }
        ul {
            list-style: NamedNodeMap;
        }

        .container {
            max-width:1200pxt;
            margin: 0 auto;
            padding: 0 1rem
        }
          `}
/>
    
);

export default GlobalStyles;