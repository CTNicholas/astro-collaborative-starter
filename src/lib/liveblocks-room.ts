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
  }

  enterRoom (roomId) {
    globals.room = globals.client.enter(roomId, {
      defaultPresence: this.getUser()
    })
    window.dispatchEvent(new Event('liveblocksRoomConnected'))
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

  // When `user-` properties update, update Liveblocks presence
  protected updated (changedProperties: PropertyValues) {
    super.updated(changedProperties)
    changedProperties.forEach((_, key) => {
      if (this[key] === undefined) {
        return
      }

      if (String(key).startsWith('user-')) {
        const prop = String(key).slice(5)
        this.updatePresenceValue(prop, this[key])
        return
      }
    })
  }

  updatePresenceValue (key, val) {
    if (globals.room) {
      globals.room.updatePresence({ [key]: val })
    }
  }

/*
  set 'room-id' (newId) {
    if (isServer()) {
      return
    }
    console.log(globals)
    const { client = null, room = null } = globals
    console.log(client && room)
    if (client && room && newId !== room.id) {
      client.leave(room.id)
      globals.room = null
      this.enterRoom(newId)
    }
  }

 */



  render () {
    return html`<slot></slot>`
  }
}
