import { html, css, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import globals from '../globals'
import { User } from '../types'
import { whenRoomReady } from './utils/whenRoomReady'

export const tagName = 'live-avatars'

@customElement(tagName)
class MyElement extends LitElement {
  @property()
  user: User = {
    name: '',
    color: '',
    picture: ''
  }

  @property()
  otherUsers: User[] = []

  @property()
  unsubscribeFunctions = []

  static styles = css`
    .main {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      user-select: none;
    }

    .avatars {
      display: flex;
      flex-direction: row;
      padding-left: 0.75rem;
    }

    .current_user_container {
      position: relative;
      margin-left: 2rem;
    }

    .avatar {
      border-width: 4px;
      border-radius: 9999px;
      border-color: white;
      background-color: #9ca3af;
      margin-left: -0.5rem;
      position: relative;
    }

    .avatar:before {
      content: attr(data-tooltip);
      position: absolute;
      opacity: 0;
      transition: all 0.15s ease;
      padding: 5px 10px;
      color: white;
      font-size: 0.75rem;
      border-radius: 8px;
      z-index: 1;
      background: black;
      white-space: nowrap;
      top: 50%;
      transform: translate(115%, -50%);
    }

    .avatar:hover:before {
      opacity: 1;
    }

    .avatar_picture {
      border-radius: 9999px;
    }

    .more {
      border-width: 4px;
      border-radius: 9999px;
      border-color: white;
      background-color: #9ca3af;
      min-width: 56px;
      width: 56px;
      height: 56px;
      margin-left: -0.75rem;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
    }
  `

  connectedCallback () {
    super.connectedCallback()
    whenRoomReady(() => {
      this.subscribePresence()
    })
  }

  subscribePresence () {
    this.user = globals.room.getPresence()
    const unsub1 = globals.room.subscribe('my-presence', presence => {
      console.log('presence', presence)
      this.user = presence as User
    })

    const unsub2 = globals.room.subscribe('others', others => {
      this.otherUsers = others
        .toArray()
        .filter(({ presence }) => presence)
        .map(({ presence }) => presence as User)
    })

    this.unsubscribeFunctions.push(unsub1, unsub2)
  }

  disconnectedCallback () {
    super.disconnectedCallback()
    this.unsubscribeFunctions.forEach(func => func())
  }

  render () {
    return html`
      <div class="avatars">
        <div class="avatar" data-tooltip=${this.user.name}>
          <img
            src=${this.user.picture}
            height="48"
            width="48"
            class="avatar_picture"
          />
        </div>
        ${this.otherUsers.map(user => 
          html`
            <div class="avatar" data-tooltip=${user.name}>
              <img
                alt=${user.name}
                src=${user.picture}
                height="48"
                width="48"
                class="avatar_picture"
              />
            </div>
          `
        )}
      </div>
    `
  }
}
