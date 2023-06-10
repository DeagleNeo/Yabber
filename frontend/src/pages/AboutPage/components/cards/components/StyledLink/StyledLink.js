import styled from "styled-components";

const IconButton = styled.a`
    &:not(:last-child) {
        margin-right: 10px;
    }
    &:not(:hover) {
        background-color: #680a83;
    }
    &:hover {
        background-color: #680a83;
        opacity: 0.8;
        color: #fff;
    }
    font-size: 15px;
    padding: 10px;
    border-style: none;
    border-radius: 50%;
    text-align: center;
    cursor: pointer;
    line-height: 25px;
    width: calc(25px + 1em);
    height: calc(25px + 1em);
    box-shadow: none;
    text-decoration: none;
    --e-social-icon-icon-color: #fff;
    display: inline-flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    transition: all .3s;
    color: #818a91;
`

const Icon = styled.i`
    color: #fff;
    width: 1em;
    height: 1em;
    position: relative;
    display: block;
`

const StyledLink = ({className, href, target, onClick}) => {
    return (
        <IconButton href={href} target={target} onClick={onClick}>
            <Icon className={className}/>
        </IconButton>
    )
}

export default StyledLink