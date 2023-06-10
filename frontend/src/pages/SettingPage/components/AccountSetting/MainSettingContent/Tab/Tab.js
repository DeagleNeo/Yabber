import { useMediaQuery } from "@mui/material"
import styled from "styled-components"
import Item from "./Item"

const Wrapper = styled.div`
  display: flex;  
  box-sizing: border-box;
  border-bottom: 1px solid #F0F0F0;
  margin: 0 0 18px;
  overflow: scroll;
`

const ITEMS = [{
  id: '1',
  href: 'GENERAL SETTINGS',
  children: 'General Settings',
  alternativeChildren: 'General',
  active: 'GENERALSETTINGS_TAB'
}, {
  id: '2',
  href: 'INVITATIONS',
  children: 'Invitations',
  alternativeChildren: 'Invitations',
  active: 'INVITATIONS_TAB'
}, {
  id: '3',
  href: 'SECURITY',
  children: 'Security',
  alternativeChildren: 'Security',
  active: 'SECURITY_TAB'
}]

const Tab = ({
  activeTab,
  setActiveTab
}) => {
  const largeScreen = useMediaQuery('(min-width: 377px)')
  return (
    <>
      {largeScreen ?
        <Wrapper>
          {ITEMS.map(({ id, href, children, active }) => (
            <Item
              key={id}
              href={href}
              active={activeTab === `${active}`}
              onClick={(event) => {
                event.preventDefault()
                setActiveTab(`${active}`)
              }}
            >
              {children}
            </Item>
          ))}
        </Wrapper> :
        <Wrapper>
          {ITEMS.map(({ id, href, alternativeChildren, active }) => (
            <Item
              key={id}
              href={href}
              active={activeTab === `${active}`}
              onClick={(event) => {
                event.preventDefault()
                setActiveTab(`${active}`)
              }}
            >
              {alternativeChildren}
            </Item>
          ))}
        </Wrapper>
      }
    </>
  )
}

export default Tab