import { html, css, svg } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'
import { LiveObjectClass } from './utils/LiveObjectClass'
import { getStroke } from 'perfect-freehand'

export const tagName = 'live-canvas'

const options = {
  /*
  size: 32,
  thinning: 0.5,
  smoothing: 0.5,
  streamline: 0.5,
  easing: (t) => t,
  start: {
    taper: 0,
    easing: (t) => t,
    cap: true
  },
  end: {
    taper: 100,
    easing: (t) => t,
    cap: true
  }
  */
}

@customElement(tagName)
export class LiveCanvas extends LiveObjectClass {
  @property({ reflect: true })
  name

  @property()
  points: [x: number, y: number, pressure: number][] = []

  @property()
  pathData: []

  @query('svg')
  svgElement

  @property()
  visible = false

  static styles = css`
    svg {
      touch-action: none;
      width: 100%;
      aspect-ratio: 16 / 9;
      position: relative;
      border: 1px solid #E5E7EB;
    }
  `

  connectedCallback () {
    super.connectedCallback()
  }

  whenLiveObjectReady () {
    super.whenLiveObjectReady()
    this.visible = true
  }

  _pointerDownHandler (e: PointerEvent) {
    const rect = this.svgElement.getBoundingClientRect()
    this.svgElement.setPointerCapture(e.pointerId)
    this.LiveObject.set('points', [[e.clientX - rect.left, e.clientY - rect.top, e.pressure]])
  }

  _pointerMoveHandler (e: PointerEvent) {
    if (e.buttons !== 1) return
    const rect = this.svgElement.getBoundingClientRect()
    this.LiveObject.set('points', { points: [...this.points, [e.clientX - rect.left, e.clientY - rect.top, e.pressure]]})
  }

  render () {
    return null
    if (!this.visible) {
      return null
    }
    console.log('render', this.LiveObject.get('points'))

    const stroke = getStroke(this.LiveObject.get('points'), options)
    const pathData = getSvgPathFromStroke(stroke)

    return html`
      <svg
        @pointerdown=${this._pointerDownHandler}
        @pointermove=${this._pointerMoveHandler}
      >
        ${this.LiveObject.get('points') ? svg`<path fill="#000" d=${pathData}></path>` : null}
      </svg>
    `

  }
}

function getSvgPathFromStroke(stroke) {
  if (!stroke.length) return ''

  const d = stroke.reduce(
    (acc, [x0, y0], i, arr) => {
      const [x1, y1] = arr[(i + 1) % arr.length]
      acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2)
      return acc
    },
    ['M', ...stroke[0], 'Q']
  )

  d.push('Z')
  return d.join(' ')
}
