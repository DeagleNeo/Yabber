import styled from "styled-components"

const Desc = styled.li`
    padding: 0;
    padding-bottom: 10px;
    -webkit-box-pack: start;
    justify-content: flex-start;
    text-align: left;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    font-size: inherit;
    margin: 0;
    position: relative;
    &:after {
        bottom: 0;
        left: 0;
        position: absolute;
        width: 100%;
    }
    @media (max-width: 1024px) {
        &:after {
            right: 0;
        }
    }
`

const ListIcon = styled.span`
    display: flex;
`

const Icon = styled.i`
    color: #ffffff;
    width: 1.25em;
    font-size: 22px;
`

const ListItemText = styled.span`
    font-weight: 500;
    color: #ffffff;
    display: inline-block;
    align-self: center;
    padding-left: 5px;
    @media (max-width: 767px) {
        font-size: 14px;
    }
`

const DescComp = ({text}) => {
    return (
        <Desc>
            <ListIcon>
                <Icon className="fa-solid fa-angle-right"></Icon>
            </ListIcon>
            <ListItemText>
                {text}
            </ListItemText>
        </Desc>
    )
}

export default DescComp