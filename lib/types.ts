export type User = {
  name: string
  color: string
  picture: string
  status?: string
  cursor?: null | { x: number, y: number }
  video?: {
    buffering?: boolean
  }
  [key: string]: any
}

export type UserShow = 'all' | 'self' | 'others'
