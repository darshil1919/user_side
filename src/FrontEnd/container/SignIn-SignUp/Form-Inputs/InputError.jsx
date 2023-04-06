import { ErrorMessage } from 'formik';
import React from 'react'

const InputError = (props) => {
  return (
    <>
      <div style={{color: 'red', fontSize: "1.3rem"}}>
        <ErrorMessage name={props.name} />
      </div>
    </>
  )
}

export default InputError;