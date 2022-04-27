import { LitElement } from 'lit'
import { property } from 'lit/decorators.js'
import globals from '../../globals'
import { User } from '../../types'
import { whenRoomReady } from './whenRoomReady'

export class SelfAndOthersClass extends LitElement {
  @property()
  self: User = {
    name: '',
    color: '',
    picture: ''
  }

  @property()
  others: User[] = []

  @property()
  unsubscribeFunctions = []

  connectedCallback () {
    super.connectedCallback()
    whenRoomReady(() => {
      this.subscribePresence()
    })
  }

  subscribePresence () {
    this.self = globals.room.getPresence()
    const unsub1 = globals.room.subscribe('my-presence', presence => {
      this.self = presence as User
    })

    const unsub2 = globals.room.subscribe('others', others => {
      this.others = others
        .toArray()
        .filter(({ presence }) => presence)
        .map(({ presence }) => presence as User)
    })

    this.unsubscribeFunctions.push(unsub1, unsub2)
    this.whenPresenceReady()
  }

  whenPresenceReady () {
    // Use in child
  }

  disconnectedCallback () {
    super.disconnectedCallback()
    this.unsubscribeFunctions.forEach(func => func())
  }
}
