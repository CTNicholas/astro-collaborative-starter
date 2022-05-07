import { html, css, PropertyValues } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { LiveObjectClass } from './subcomponents/LiveObjectClass'
import './subcomponents/avatar-and-fallback'
import './subcomponents/user-line'
import YouTubePlayer from 'youtube-player'
import globals from './globals'
import { LiveObject } from '@liveblocks/client'

export const tagName = 'live-youtube'

type PlayerState = -1 | 0 | 1 | 2 | 3 | 5

type LiveObjectType = {
  playerState: PlayerState,
  previousTime: number
}

@customElement(tagName)
export class LiveYoutube extends LiveObjectClass {
  @property({ reflect: true })
  'youtube-id': string = 'QQ_3S-IQm38'

  @property({ reflect: true, type: Boolean })
  controls: boolean = true

  @property()
  name = 'helloooo'

  @state()
  player = null

  @state()
  lastSeek: number = 0

  @state()
  bufferedPause: boolean = false

  static styles = css`
  `

  connectedCallback () {
    super.connectedCallback()
  }

  whenLiveObjectReady () {
    super.whenLiveObjectReady()

    const stateActions = {
      1: 'play',
      2: 'pause'
    }

    const collabState = this.LiveObject.get('playerState')
    if (collabState !== undefined) {
      this.LiveObject.set('playerState', -1)
    }

    const prevTime = this.LiveObject.get('previousTime')
    if (prevTime !== undefined) {
      this.LiveObject.set('previousTime', -1)
    }

    globals.room.subscribe(this.LiveObject, (obj: LiveObject<LiveObjectType>) => {
      //console.log(obj.get('playerState'))
      const anyBuffering = globals.room.getOthers().toArray().every(({ presence }) => {
        if (!presence || !('youtubeBuffering' in presence)) {
          return true
        }

        return presence.youtubeBuffering === true
      })

      //console.log(anyBuffering)

      if (anyBuffering) {
        return
      }

      if (stateActions[obj.get('playerState')]) {
        this[stateActions[obj.get('playerState')]]()
      }
    })

    globals.room.subscribe('event', ({ event }: { event: { type: string, name: string, time: number }}) => {
      if (event.type === 'youtubeSeek') {
        if (event.name === this.name) {
          this.seek(event.time)
        }
      }
    })

  }

  protected update (changedProperties: PropertyValues) {
    super.update(changedProperties)
    if (changedProperties.get('youtube-id') || !this.player) {
      this.setupPlayer()
    }
  }

  setupPlayer () {
    this.player = YouTubePlayer(this.renderRoot.querySelector('#player'), {
      playerVars: {
        origin: window.location.href,
        controls: this.controls ? 1 : 0,
        autoplay: 1
      }
    })
    this.player.loadVideoById(this['youtube-id'])

    this.player.on('stateChange', async ({ target, data }) => {
      globals.room.updatePresence({ youtubeBuffering: data === 3 })

      if (this.LiveObject) {
        this.LiveObject.set('playerState', data)

        if (data === 1) {
          isPlaying = true
          checkSeek()
        }

      }
    })

    const sendSeek = (seconds) => {
      globals.room.broadcastEvent({ type: 'youtubeSeek', name: this.name, time: seconds })
    }

    let checkSeekPeriod = 500
    let checkSeekMargin = 500
    let prevCurrentTime = 0
    let isPlaying = false

    const checkSeek = async () => {
      if (!isPlaying) {
        prevCurrentTime = -1000
        return
      }

      var currentTime= await this.player.getCurrentTime()
      if (prevCurrentTime > 0) {
        var diff = (currentTime - prevCurrentTime) * 1000
        if (Math.abs(diff - checkSeekPeriod) > checkSeekMargin) {
          sendSeek(currentTime)
        }
      }
      prevCurrentTime = currentTime

      setTimeout(function() {
        return checkSeek()
      }, checkSeekPeriod)
    }
  }

  play () {
    if (!this.player) {
      return
    }

    this.player.playVideo()
  }

  pause () {
    if (!this.player) {
      return
    }

    this.player.pauseVideo()
  }

  seek (seconds) {
    if (!this.player) {
      return
    }

    if (Date.now() - this.lastSeek > 1000) {
      this.player.seekTo(seconds)
      this.lastSeek = Date.now()
    }
  }


  render () {
    return html`
      <div id="player"></div>
    `
  }

}
