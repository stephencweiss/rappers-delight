import React, { useRef } from 'react'
import { useForm } from 'react-hook-form'

export function SubmitRapper() {
  const formRef = useRef()
  const { handleSubmit, register } = useForm()

   const onSubmit = async values => {
    console.log(values)
    values.songs = values.songs.split(",")
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
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
        <label>
          Name
          <input
            name="name"
            title="The rapper's moniker"
            placeholder="Rapper name"
            ref={register({
              required: true,
            })}
          />
        </label>
        <label>
          Birth date
          <input type="date" ref={register} name="birthday" />
        </label>
        <label>
          Active?
          <input type="checkbox" ref={register} name="active" />
        </label>
        <label>
          Popular songs
          <input name="songs" ref={register} placeholder="Songs, comma separated" />
        </label>
        <input type="submit" />
      </form>
    </>
  )
}
