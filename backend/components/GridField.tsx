import React, {useRef, useState} from 'react'
import {Box, Stack, Card, Flex, Grid, Text, TextInput} from '@sanity/ui'
import {StringInputProps, set, unset} from 'sanity'
import {GridFieldArea} from './GridFieldArea'
import {schemaTypes} from '../schemas'
import styles from '../components/GridRangeStyles.module.css'
import {GridInput} from './GridInput'
/* -------------------------------------------------------------------------- */
/*                                   Fieldset                                 */
/*             (that wraps fieldareas, that are wrapping inputs)              */
/* -------------------------------------------------------------------------- */

export const GridField = (props: any) => {
  /*
   ** Setup
   */
  const {...elementProps} = props
  //
  //
  let endInput = useRef<any>()
  let startInput = useRef<any>()
  let fakeSliderRangeFill = useRef<any>()
  //
  let [startValue, setStartValue] = useState(1)
  let [endValue, setEndValue] = useState(13)
  let [startZ, setStartZ] = useState(5)
  let [endZ, setEndZ] = useState(4)
  /*
   ** Updating fields' values on drag/push/change
   */
  let push = (input: any, other: any, minDiff: number) => {
    let sign = Math.sign(minDiff)

    let newValue =
      sign *
      Math.max(
        sign * (parseInt(input.current.value) + minDiff),
        sign * parseInt(other.current.value)
      )

    other.current.value = newValue
    return newValue
  }
  /*
   ** Finally updated fields' values
   */
  let startInputPushes = (e: any) => {
    setEndValue(push(startInput, endInput, 4))
    setStartValue(e.target.value)
    if (e.target.value >= 5 && endInput.current.value >= 9) {
      setStartZ(5)
      setEndZ(4)
    }
  }
  //
  let endInputPushes = (e: any) => {
    setStartValue(push(endInput, startInput, -4))
    setEndValue(e.target.value)
    if (e.target.value <= 9 && startInput.current.value <= 5) {
      setStartZ(4)
      setEndZ(5)
    }
  }

  /*
   ** Outputing fields.
   */
  return (
    <Stack space={3}>
      {/********* HEADER COMPONENT INFO *********/}
      <Card>
        <Stack space={2}>
          <Text size={1} weight={'semibold'}>
            {props.title}
          </Text>
          <Text muted size={1}>
            {props.description}
          </Text>
        </Stack>
      </Card>
      {/********* VISUAL PREVIEW *********/}
      <Card padding={3} className={styles.GridFieldsPreview} border={true} radius={1}>
        <Grid columns={12} style={{gap: '4px'}}>
          <Flex className={styles.FakeMarkerWrapper}>
            <div className={styles.FakeMarker}></div>
            <div className={styles.FakeMarker}></div>
            <div className={styles.FakeMarker}></div>
            <div className={styles.FakeMarker}></div>
            <div className={styles.FakeMarker}></div>
            <div className={styles.FakeMarker}></div>
            <div className={styles.FakeMarker}></div>
            <div className={styles.FakeMarker}></div>
            <div className={styles.FakeMarker}></div>
            <div className={styles.FakeMarker}></div>
            <div className={styles.FakeMarker}></div>
            <div className={styles.FakeMarker}></div>
          </Flex>
          <Flex
            className={styles.FakeSpanPreview}
            style={{gridColumn: `${startValue} / ${endValue}`}}
          >
            <span>Card</span>
          </Flex>
        </Grid>
      </Card>
      {/********* RANGE SLIDERS *********/}
      <div className={styles.InputWrapper}>
        <div className={styles.RangeStart}>
          <input
            className={`${styles.ThumbZthree} ${styles.Thumb}`}
            ref={startInput}
            onChange={startInputPushes}
            type="range"
            name="gridAreaStart"
            id="gridStart"
            min="1"
            max="9"
            style={{zIndex: `${startZ}`}}
          />
        </div>
        <div className={styles.RangeEnd}>
          <input
            className={`${styles.ThumbZfour} ${styles.Thumb}`}
            ref={endInput}
            onChange={endInputPushes}
            type="range"
            name="gridAreaEnd"
            id="gridEnd"
            min="5"
            max="13"
            style={{zIndex: `${endZ}`}}
          />
        </div>
        {/* Fake slider */}
        <div
          ref={fakeSliderRangeFill}
          className={styles.FakeRangeFill}
          style={{gridColumn: `${startValue} / ${endValue}`}}
        />
      </div>
      {/********* SUCCEEDING CHILDREN *********/}
      <Card>
        <Stack className={styles.GridFieldsWrapper} space={0}>
          {props.children}
        </Stack>
      </Card>
    </Stack>
  )
}
