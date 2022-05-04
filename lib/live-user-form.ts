import { html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { SelfAndOthersClass } from './subcomponents/SelfAndOthersClass'
import type { LiveblocksRoom } from './liveblocks-room'
import './subcomponents/avatar-and-fallback'
import './subcomponents/user-line'

export const tagName = 'live-user-form'

@customElement(tagName)
export class LiveUserForm extends SelfAndOthersClass {
  @property({ type: Boolean })
  visible: boolean = false

  get userInputs () {
    const find = x => this.querySelectorAll(`input[name="user-${x}"]`) as NodeList
    return {
      name: find('name'),
      color: find('color'),
      picture: find('picture'),
      status: find('status'),
    }
  }

  whenPresenceReady () {
    super.whenPresenceReady()
    this.attachListeners()
    this.visible = true
  }

  attachListeners () {
    Object.entries(this.userInputs).forEach(([key, inputElements]) => {
      if (!inputElements) {
        return
      }

      inputElements.forEach((inputElement: HTMLInputElement) => {
        inputElement.addEventListener('input', () => {
          const room: LiveblocksRoom = document.querySelector('liveblocks-room')
          room.setUser({ [key]: inputElement.value })
        })
      })
    })
  }

  updateInputValues () {
    Object.entries(this.userInputs).forEach(([key, inputElements]) => {
      inputElements.forEach((inputElement: HTMLInputElement) => {
        if (this.self[key] && inputElement) {
          inputElement.value = this.self[key]
        }
      })
    })
  }

  render () {
    if (!this.visible) {
      return null
    }

    this.updateInputValues()

    return html`
      <slot></slot>
    `
  }
}
