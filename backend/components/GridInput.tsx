import React, {useRef, useState} from 'react'
import {Box, Stack, Card, Flex, Grid, Text, Label, TextInput} from '@sanity/ui'
import {StringInputProps, useFormValue, set, unset, StringInput, getValueAtPath} from 'sanity'
import {schemaTypes} from '../schemas'
import styles from '../components/GridRangeStyles.module.css'
/* -------------------------------------------------------------------------- */
/*                                    Input                                   */
/* -------------------------------------------------------------------------- */

export const GridInput = (props: any) => {
  /*
   ** Setup
   */

  const {min, max, elementProps} = props

  /*
   ** Output fields.
   */
  return (
    <TextInput
      size={4}
      className={styles.GridInput}
      type="number"
      {...elementProps}
      min={min || 1}
      max={max || 13}
    />
  )
}
