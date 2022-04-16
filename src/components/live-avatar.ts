import { html, css, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { User } from '../types'

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
      min-width: 56px;
      width: 56px;
      height: 56px;
      margin-left: -0.75rem;
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
      margin-top: 10px;
      margin-left: 52px;
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
  }

  render () {
    return html`
      <div class="avatar" data-tooltip=${this.user.name}>
      <img
        alt=${this.user.name}
        src=${this.user.picture}
        height="48"
        width="48"
        class="avatar_picture"
      />
    </div>
    `
  }
}
