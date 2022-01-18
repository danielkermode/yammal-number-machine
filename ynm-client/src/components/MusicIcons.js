import React from 'react'
import { Box, Flex, Icon } from '@chakra-ui/react'
import donut from '../assets/track-icons/donut.png'
import wonsparkle from '../assets/track-icons/wonsparkle.png'
import deux from '../assets/track-icons/deux.png'
import free from '../assets/track-icons/free.png'
import forsparkle from '../assets/track-icons/forsparkle.png'
import allenfiversonsparkle from '../assets/track-icons/allenfiversonsparkle.png'
import sex from '../assets/track-icons/sex.png'
import sven from '../assets/track-icons/sven.png'
import infinate from '../assets/track-icons/infinate.png'
import nonagon from '../assets/track-icons/nonagon.png'
import tensparkle from '../assets/track-icons/tensparkle.png'
import elvenconversation from '../assets/track-icons/elvenconversation.png'

import { FaPlay, FaPause } from 'react-icons/fa'

function MusicIconImage (props) {
  const [hover, setHover] = React.useState(false)
  const { audioPlayer, src, alt, style, trackPlaying, number } = props

  const isTrackPlaying = trackPlaying === number
  console.log(trackPlaying)
  return (
    <Box
      style={{ position: 'relative' }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <img
        src={src}
        style={{ height: 100, cursor: 'pointer', opacity: hover ? 0.5 : 1, ...style }}
        alt={alt}
        onClick={() => {
          if (audioPlayer) {
            if (isTrackPlaying) {
              audioPlayer.pause()
            } else {
              audioPlayer.playByIndex(number)
              audioPlayer.play()
            }
          }
        }}
      />
      {hover &&
        <Icon
          style={{ position: 'absolute', bottom: '50%', right: '50%', cursor: 'pointer' }}
          as={isTrackPlaying ? FaPause : FaPlay}
          onClick={() => {
            if (audioPlayer) {
              if (isTrackPlaying) {
                audioPlayer.pause()
              } else {
                audioPlayer.playByIndex(number)
                audioPlayer.play()
              }
            }
          }}
        />}
    </Box>
  )
}

export default function MusicIcons (props) {
  const { audioPlayer, trackPlaying } = props
  return (
    <Box
      style={{
        width: '65%',
        display: 'flex',
        alignContent: 'center',
        flexDirection: 'column'
      }}
    >
      <Flex justify='space-around' style={{ width: '100%', position: 'relative' }}>
        <MusicIconImage src={donut} alt='donut' number={0} audioPlayer={audioPlayer} trackPlaying={trackPlaying} />
        <MusicIconImage src={wonsparkle} style={{ marginTop: 30 }} alt='won' number={1} audioPlayer={audioPlayer} trackPlaying={trackPlaying} />
        <MusicIconImage src={deux} style={{ marginTop: 15 }} alt='deux' number={2} audioPlayer={audioPlayer} trackPlaying={trackPlaying} />
        <MusicIconImage src={free} alt='free' number={3} audioPlayer={audioPlayer} trackPlaying={trackPlaying} />
      </Flex>
      <Flex justify='space-around' style={{ width: '100%', position: 'relative' }}>
        <MusicIconImage src={forsparkle} alt='for' number={4} audioPlayer={audioPlayer} trackPlaying={trackPlaying} />
        <MusicIconImage src={allenfiversonsparkle} alt='allenfiverson' number={5} audioPlayer={audioPlayer} trackPlaying={trackPlaying} />
        <MusicIconImage src={sex} alt='sex' number={6} audioPlayer={audioPlayer} trackPlaying={trackPlaying} />
        <MusicIconImage src={sven} alt='sven' number={7} audioPlayer={audioPlayer} trackPlaying={trackPlaying} />
      </Flex>
      <Flex justify='space-around' style={{ width: '100%', position: 'relative' }}>
        <MusicIconImage src={infinate} alt='infinate' number={8} audioPlayer={audioPlayer} trackPlaying={trackPlaying} />
        <MusicIconImage src={nonagon} alt='nonagon' number={9} audioPlayer={audioPlayer} trackPlaying={trackPlaying} />
        <MusicIconImage src={tensparkle} alt='ten' number={10} audioPlayer={audioPlayer} trackPlaying={trackPlaying} />
        <MusicIconImage src={elvenconversation} alt='elven' number={11} audioPlayer={audioPlayer} trackPlaying={trackPlaying} />
      </Flex>
    </Box>
  )
}
