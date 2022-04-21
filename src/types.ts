export type User = {
  name: string
  color: string
  picture: string
  status?: string
  cursor?: null | { x: number, y: number }
  [key: string]: any
}
