import React, {useRef, useState} from 'react'
import {Box, Stack, Card, Flex, Grid, Label, Inline, Text, TextInput} from '@sanity/ui'
import {StringInputProps, set, unset} from 'sanity'
import {GridInput} from './GridInput'
import {forwardRef} from 'react'
import styles from '../components/GridRangeStyles.module.css'
/* -------------------------------------------------------------------------- */
/*                      Single Field (that wraps input)                       */
/* -------------------------------------------------------------------------- */

export const GridFieldArea = (props: any) => {
  /*
   ** Setup
   */
  const {name, title, ...elementProps} = props
  /*
   ** Output fields.
   */
  return (
    <Flex className={styles.GridFieldArea} direction={'column'} gap={2}>
      {/* <GridInput name={name} title={title} props={...elementProps} /> */}
      {props.renderDefault(elementProps)}
      <Text className={styles.GridFieldAreaLabel} size={1}>
        {title}
      </Text>
    </Flex>
  )
}
