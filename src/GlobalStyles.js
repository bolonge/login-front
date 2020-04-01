import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export default createGlobalStyle`
    ${reset};
    body {
        background-color:#F5F6F7;
    }
`;
