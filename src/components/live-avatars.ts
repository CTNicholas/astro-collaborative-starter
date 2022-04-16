import { html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { SelfAndOthers } from './utils/SelfAndOthers'

export const tagName = 'live-avatars'

@customElement(tagName)
class MyElement extends SelfAndOthers {
  @property({ reflect: true })
  size: number = 40

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
      flex-direction: row-reverse;
      justify-content: flex-end;
      padding-left: 0.75rem;
    }

    .current_user_container {
      position: relative;
      margin-left: 2rem;
    }

    .avatar {
      border-radius: 9999px;
      position: relative;
      box-shadow: 2px 0 0 #fff;
      margin-left: -6px;
    }

    .avatar::before {
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
      transform: translate(100%, -50%);
      pointer-events: none;
    }

    .avatar:hover::before {
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

  render () {
    return html`
      <div class="avatars">
        <div class="avatar" data-tooltip=${this.self.name}>
          <img
            alt=${this.self.name}
            src=${this.self.picture}
            height=${this.size}
            width=${this.size}
            class="avatar_picture"
          />
        </div>
        ${this.others.map(user => 
          html`
            <div class="avatar" data-tooltip=${user.name}>
              <img
                alt=${user.name}
                src=${user.picture}
                height=${this.size}
                width=${this.size}
                class="avatar_picture"
              />
            </div>
          `
        )}
      </div>
    `
  }
}
