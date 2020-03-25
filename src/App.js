import React from 'react'
import { Rappers } from './components'
import styled from 'styled-components'

const Title = styled.h1`
  display: flex;
  align-items:center;
  justify-content: center;
  padding: 1rem;
`

const P = styled.p`
padding-left: 1rem;
`

const App = () => (
  <>
    <Title>SupaHotFire 🔥👩‍🚒</Title>
    <P>Have you ever wondered who the <a href="https://youtu.be/5HRY4LUl5lc">greatest rapper of all time is?</a></P>
    <P>We've got some contenders - add yours!</P>
    <P>See something wrong - edit the entries directly and they'll be saved automatically!</P>
    <Rappers />
  </>
)

export default App
