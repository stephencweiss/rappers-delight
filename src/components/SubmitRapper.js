import React, { useRef } from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  margin: .5rem;
`

const Label = styled.label`
  padding: .5rem 0;
`
const Title = styled.span`
  padding-right: 0.25rem;
`

export function SubmitRapper() {
  const formRef = useRef()
  const { handleSubmit, register } = useForm()

  const onSubmit = async values => {
    console.log(values)
    values.songs = values.songs.split(',')
    await fetch(`/api/rappers`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(values),
    })
    formRef.current.reset()
  }

  return (
    <>
      <Form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
        <Label >
          <Title >Name </Title>
          <input
            name="name"
            title="The rapper's moniker"
            placeholder="Rapper name"
            ref={register({
              required: true,
            })}
          />
        </Label>
        <Label >
          <Title >Birth date</Title>
          <input type="date" ref={register} name="birthday" />
        </Label>
        <Label >
          <Title >Active?</Title>
          <input type="checkbox" ref={register} name="active" />
        </Label>
        <Label >
          <Title >Popular songs</Title>
          <input
            style={{ minWidth: '400px' }}
            name="songs"
            ref={register}
            placeholder="Songs, comma separated"
          />
        </Label>
        <input type="submit" />
      </Form>
    </>
  )
}
