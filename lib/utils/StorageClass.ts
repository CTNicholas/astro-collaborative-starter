import { LitElement } from 'lit'
import { property } from 'lit/decorators.js'
import globals from '../globals'
import { whenRoomReady } from './whenRoomReady'

export class StorageClass extends LitElement {
  @property()
  storage

  @property()
  unsubscribeFunctions = []

  connectedCallback () {
    super.connectedCallback()
    whenRoomReady(() => {
      this.subscribeStorage()
    })
  }

  async subscribeStorage () {
    const { root } = await globals.room.getStorage()
    this.storage = root

    const unsub = globals.room.subscribe(root, root => {
      if (!root) {
        return
      }

      this.storage = root
    })

    this.unsubscribeFunctions.push(unsub)
    this.whenStorageReady()
  }

  whenStorageReady () {
    // Use in children
  }

  disconnectedCallback () {
    super.disconnectedCallback()
    this.unsubscribeFunctions.forEach(func => func())
  }
}
