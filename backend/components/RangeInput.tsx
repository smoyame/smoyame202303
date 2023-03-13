import React, {useRef, useState} from 'react'
import {Box, Stack, Card, Flex, Grid, Label, Inline, Text, TextInput} from '@sanity/ui'

export const RangeInput = (props: any) => {
  /*
   **  PREP
   */

  const {name, title, value, min, max, ...elementProps} = props
  // const [inputType, setInputType] = useState('string')
  // const inputRef = useRef<any>()

  /*
   **  COMPONENT RETURNED
   */

  return (
    <>
      <TextInput
        onChange={console.log(props.renderDefault(props))}
        type="number"
        {...elementProps}
      />
    </>
  )
}
