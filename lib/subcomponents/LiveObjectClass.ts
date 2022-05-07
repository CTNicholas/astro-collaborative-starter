import { LiveObject, LsonObject } from '@liveblocks/client'
import { property } from 'lit/decorators.js'
import { StorageClass } from './StorageClass'
import globals from '../globals'

export class LiveObjectClass extends StorageClass {
  @property()
  name: string

  @property()
  initial?: [] | {} | undefined = undefined

  @property()
  LiveObject

  @property()
  unsubscribeFunctions

  connectedCallback () {
    super.connectedCallback()
  }

  whenStorageReady () {
    super.whenStorageReady()

    if (!this.name) {
      console.error('LiveObjectClass requires a name property')
      return
    }

    if (!this.storage.get(this.name)) {
      this.storage.set(this.name, new LiveObject(this.initial as LsonObject));
    }

    const unsub1 = globals.room.subscribe(this.storage.get(this.name), newObject => {
      this.LiveObject = newObject
    })

    this.LiveObject = this.storage.get(this.name)
    this.unsubscribeFunctions.push(unsub1)
    this.whenLiveObjectReady()
  }

  whenLiveObjectReady () {
    // Use in child
  }

  disconnectedCallback () {
    super.disconnectedCallback()
    this.unsubscribeFunctions.forEach(func => func())
  }
}
