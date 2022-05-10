import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { LiveblocksProvider, RoomProvider, useMyPresence, useOthers } from '@liveblocks/react'
import globals from './globals'
import { useRoomName } from './utils/useRoomName'
import { User } from './types'
import { Simulate } from 'react-dom/test-utils'
import load = Simulate.load

export default function LiveVideo () {
  const roomName = useRoomName()

  if (!roomName) {
    return null
  }

  return (
    <LiveblocksProvider client={globals.client}>
      <RoomProvider id={roomName}>
        <VideoComponent />
      </RoomProvider>
    </LiveblocksProvider>
  )
}

enum PlayState {
  PAUSED = 'paused',
  PLAYING = 'playing'
}

enum LoadingState {
  BUFFERING = 'buffering',
  WAITING = 'waiting',
  READY = 'ready'
}

function VideoComponent () {
  const [myPresence, updateMyPresence] = useMyPresence<User>()
  const others = useOthers<User>()
  const [playState, setPlayState] = useState<PlayState>(PlayState.PAUSED)
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.WAITING)
  const [duration, setDuration] = useState<number>(0)

  useEffect(() => {
    updateMyPresence({ video: { buffering: false }})
  }, [])

  useEffect(() => {
    console.log(loadingState.toUpperCase())
  }, [loadingState])

  useEffect(() => {
    if (!myPresence?.video) {
      return
    }

    if (myPresence.video.buffering) {
      setLoadingState(LoadingState.BUFFERING)
      return
    }

    const res = others.toArray().some(other => other?.presence?.video?.buffering === true)
    setLoadingState(res ? LoadingState.WAITING : LoadingState.READY)
  }, [others, myPresence])

  function handleReady (e) {
    console.log('ready', e)
  }

  function handleStart (e) {
    console.log('start', e)
  }

  function handlePlay (e) {
    setPlayState(PlayState.PLAYING)
    console.log('play', e)
  }

  function handlePause (e) {
    //setPlayState(PlayState.PAUSED)
    console.log('pause', e)
  }

  function handleBuffer (e) {
    updateMyPresence({ video: { buffering: true }})
    console.log('buffer', e)
  }

  function handleBufferEnd (e) {
    updateMyPresence({ video: { buffering: false }})
    setPlayState(PlayState.PAUSED)
    console.log('buffer end')
  }

  function handleSeek (e) {
    console.log('seek', e)
  }

  function handlePlayButton () {
    setPlayState(playState === PlayState.PLAYING ? PlayState.PAUSED : PlayState.PLAYING)
  }

  return (
    <div>
      <ReactPlayer
        playing={loadingState === LoadingState.READY && playState === PlayState.PLAYING}
        onReady={handleReady}
        onStart={handleStart}
        onPlay={handlePlay}
        onPause={handlePause}
        onBuffer={handleBuffer}
        onBufferEnd={handleBufferEnd}
        onSeek={handleSeek}
        onDuration={d => setDuration(d)}
        url='https://www.youtube.com/watch?v=ysz5S6PUM-U'
        controls
      />
      <button onClick={handlePlayButton}>
        {playState === PlayState.PLAYING ? 'pause' : 'play'}
      </button>
      <input type="range" min="0" max="100" value={duration} />
    </div>
  )
}
