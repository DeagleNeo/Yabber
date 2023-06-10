import styled from "styled-components"
import axios from "axios";
import MemberCard from "./components/MemberCard"
import { useEffect } from "react";
import { useState } from "react";

import female from "../../../../assets/female.jpg"
import male from "../../../../assets/male.jpg"
import grace from "../../../../assets/gracebian.jpg"
import rex from "../../../../assets/rex.jpg"
import ruby from "../../../../assets/ruby01.jpg"
import tom from "../../../../assets/tom.jpg"
import wendy from "../../../../assets/wendy01.jpg"

const Section = styled.div`
    padding: 40px 0px 100px 0px;
    position: relative;
    --flex-direction: initial;
    --flex-wrap: initial;
    --justify-content: initial;
    --align-items: initial;
    --align-content: initial;
    --gap: initial;
    --flex-basis: initial;
    --flex-grow: initial;
    --flex-shrink: initial;
    --order: initial;
    --align-self: initial;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: initial;
    flex-wrap: initial;
    -webkit-box-pack: initial;
    justify-content: initial;
    -webkit-box-align: initial;
    align-items: initial;
    align-content: initial;
    gap: initial;
    flex-basis: initial;
    -webkit-box-flex: initial;
    flex-grow: initial;
    flex-shrink: initial;
    -webkit-box-ordinal-group: initial;
    order: initial;
    align-self: initial;
    @media (max-width: 1024px) {
        padding: 30px 10px 50px 10px;
    }
    @media (max-width: 767px) {
        padding: 30px 30px 30px 30px;
    }
`

const Container = styled.div`
    max-width: 1200px;
    display: flex;
    margin-right: auto;
    margin-left: auto;
    position: relative;
    @media (max-width: 1024px) {
        max-width: 1024px;
    }
    @media (max-width: 767px) {
        max-width: 767px;
    }
`

const Row = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
`





const CardsSection = () => {
    const [IntroList, setIntroList] = useState([]);
    useEffect(() => {
        axios.get("https://api.jsonbin.io/v3/b/62f903d5a1610e6386fda2a3/latest?meta=false", {
            headers: {
              'X-Master-Key': '$2b$10$p3IfiYDcfUpn1Mq.j72Aqu5vdgbGTmPbBMe.FdgsiYI01mTBldd36'
            },
        }).then( async (res) => {
            let newList = res.data.slice();
            newList[0].src = tom
            newList[1].src = wendy
            newList[2].src = male
            newList[3].src = male
            newList[4].src = male
            newList[5].src = female
            newList[6].src = male
            newList[7].src = rex
            newList[8].src = female
            newList[9].src = grace
            newList[10].src = ruby
            newList[11].src = female
            newList[4].intro = "Coding is like a box of chocolate, you'll never know what you gonna get until you print it out."
            await setIntroList(newList)
        })
    }, [])
    
    return (
        <Section>
            <Container>
                <Row>
                    {
                        IntroList.map((item) => 
                            <MemberCard
                              key={item.id}
                              src={item.src}
                              name={item.name}
                              jobTitle={item.role}
                              description={item.intro}
                              linkedInLink={"http://" + item.linkedin}
                              emailLink={item.email}
                            />
                        )
                    }
                    
                    
                </Row>
            </Container>
        </Section>
    );
}




export default CardsSection