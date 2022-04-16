import { html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import globals from '../globals'

export const tagName = 'liveblocks-room'

@customElement(tagName)
class MyElement extends LitElement {
  @property({ reflect: true })
  ['user-name']: string = 'Guest'

  @property({ reflect: true })
  ['user-color']: string = 'orange'

  @property({ reflect: true })
  ['user-picture']: string = ''

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
    }
  }

  /*
  set 'user-name' (val) {
    this.updatePresenceValue('name', val)
  }

  set 'user-color' (val) {
    this.updatePresenceValue('color', val)
  }

  set 'user-picture' (val) {
    this.updatePresenceValue('picture', val)
  }
  */

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

function isServer () {
  return typeof window === 'undefined' || !('addEventListener' in window)
}
