import styled, { css } from 'styled-components'

const withAfter = css`
    opacity: 1;
    color: #0057FF;

    ::after {
        width: 50px;
    }
`

const Item = styled.a`
@media (max-width: 310px) {
    padding-right: 0;
}
    padding: 16px;
    padding-bottom: 0;
    text-decoration: none;
    color: #000000;
    font-size: 15px;
    font-weight: 400;
    display: block;
    transition: opacity 0.3s ease-in-out;
    

    ::after {
        content: "";  
        width: 0;
        border-bottom: 2px solid #0057FF;
        margin: auto;
        margin-top: 4px;
        display: block;
        transition: width 0.3s ease-in-out;
    }

    ${({ active }) => active && withAfter}
`

export default Item