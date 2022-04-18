import { html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { SelfAndOthersClass } from './utils/SelfAndOthersClass'
import './avatar-and-fallback'

export const tagName = 'live-users'

@customElement(tagName)
class MyElement extends SelfAndOthersClass {
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

    .users {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding-left: 0.75rem;
    }
    
    .user {
      display: flex;
      align-items: center;
      margin-bottom: 0.5em;
    }
    
    .user:last-of-type {
      margin-bottom: 0;
    }
    
    .user_name {
      flex-grow: 1;
      padding-left: 0.5em;
    }

    .current_user_container {
      position: relative;
      margin-left: 2rem;
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
      <div class="users">
        <div class="user">
          <avatar-and-fallback
            size=${this.size}
            name=${this.self.name}
            color=${this.self.color}
            picture=${this.self.picture}
          ></avatar-and-fallback>
          <div part="name self" class="user_name">${this.self.name} (you)</div>
        </div>
        
        ${this.others.map(user => html`
          <div class="user">
            <avatar-and-fallback
              size=${this.size}
              name=${user.name}
              color=${user.color}
              picture=${user.picture}
            ></avatar-and-fallback>
            <div part="name" class="user_name">${user.name}</div>
          </div>
        `)}
      </div>
    `
  }
}
