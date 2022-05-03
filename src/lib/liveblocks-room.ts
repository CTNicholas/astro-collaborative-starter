import { html, LitElement, PropertyValues } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import globals from '../globals'
import { isServer } from './utils/isServer'

export const tagName = 'liveblocks-room'

@customElement(tagName)
export class LiveblocksRoom extends LitElement {
  @property({ reflect: true })
  ['user-name']?: string = 'Guest'

  @property({ reflect: true })
  ['user-color']?: string = 'orange'

  @property({ reflect: true })
  ['user-picture']?: string = ''

  @property({ reflect: true })
  ['user-status']?: string = ''

  @property({ reflect: true })
  ['room-id']: string

  @property({ reflect: true })
  ['public-key']: string

  connectedCallback () {
    super.connectedCallback()
    this.createLiveblocks()
  }

  async createLiveblocks () {
    if (isServer()) {
      return
    }

    if (!this['room-id']) {
      console.error(`Your collaborative room needs a name.`)
      console.error(`Add 'room-id' attribute to 'liveblocks-room'.`)
      return
    }

    if (!this['public-key']) {
      console.error(`You haven't added an API key.`)
      console.error(`Add 'public-key' attribute to 'liveblocks-room'.`)
      console.error('Get your free API key from the https://liveblocks.io dashboard.')
      return
    }

    const { createClient } = await import('@liveblocks/client')
    globals.client = createClient({ publicApiKey: this['public-key'] })
    this.enterRoom(this['room-id'])

    const w: any = window
    if (w?.LiveblocksRoom?._tempUser) {
      this.setUser(w.LiveblocksRoom._tempUser)
    }
    if (w?.LiveblocksRoom?._tempRoom) {
      this.setRoom(w.LiveblocksRoom._tempRoom)
    }
    w.LiveblocksRoom = this
  }

  enterRoom (roomId) {
    globals.room = globals.client.enter(roomId, {
      defaultPresence: this.getUser()
    })
    globals.room.subscribe('error', console.log)
    window.dispatchEvent(new Event('liveblocksRoomConnected'))
  }

  leaveRoom (roomId = this['room-id']) {
    globals.client.leave(roomId)
  }

  getUser () {
    return {
      name: this['user-name'],
      color: this['user-color'],
      picture: this['user-picture'],
      status: this['user-status'],
    }
  }

  setUser (values) {
    if (!values) {
      return
    }

    Object.entries(values).forEach(([key, val]) => {
      this['user-' + key] = val
    })
  }

  getRoom () {
    return this['room-id']
  }

  setRoom (newRoomId) {
    const { client = null, room = null } = globals
    if (client && room && newRoomId !== room.id) {
      client.leave(room.id)
      globals.room = null
      this.enterRoom(newRoomId)
      this.requestUpdate()
    }
  }

  // When `user-` properties update, update Liveblocks presence
  protected updated (changedProperties: PropertyValues) {
    super.updated(changedProperties)
    changedProperties.forEach((oldVal, key) => {
      if (this[key] === undefined) {
        return
      }

      if (String(key).startsWith('user-')) {
        const prop = String(key).slice(5)
        this.updatePresenceValue(prop, this[key])
        return
      }

      if (String(key) === 'room-id' && this[key]) {
        this.setRoom(this[key])
        return
      }
    })
  }

  updatePresenceValue (key, val) {
    if (globals.room) {
      globals.room.updatePresence({ [key]: val })
    }
  }

  render () {
    return html`<slot></slot>`
  }
}
