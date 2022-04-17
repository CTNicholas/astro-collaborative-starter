const names = [
  'Alfred',
  'Becca',
  'Christine',
  'Declan',
  'Eduardo',
  'Faye',
  'Gregg'
]

const colors = [
  '#f87171',
  '#fb923c',
  '#facc15',
  '#92da15',
  '#4ade80',
  '#34ead2',
  '#22d3ee',
  '#60a5fa',
  '#c084fc',
  '#ff7dc0',
]

export function randomName () {
  return names[Math.floor(Math.random() * names.length)]
}

export function randomColor () {
  return colors[Math.floor(Math.random() * colors.length)]
}

export function randomPicture () {
  return `/avatars/${Math.floor(Math.random() * 10)}.png`
}
