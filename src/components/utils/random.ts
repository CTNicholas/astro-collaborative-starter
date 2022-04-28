const names = [
  'Alfred',
  'Becca',
  'Christine',
  'Declan',
  'Eduardo',
  'Faye',
  'Gregg',
  'Harriet',
  'Indira',
  'James',
  'Kimberley',
  'Leonardo'
]

const statuses = [
  'Online',
  'Busy',
  'Away',
  'On Holiday',
  'Partying',
  'Working',
  'Studying',
  'Available',
  'Collaborating',
  'In a call'
]

const lightColors = [
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

const colors = [
  '#c45a5a',
  '#c77430',
  '#c7a210',
  '#6fa611',
  '#38ab62',
  '#28b8a5',
  '#1aa5ba',
  '#5081c7',
  '#9969c9',
  '#cc649a',
]

export function randomName () {
  return names[Math.floor(Math.random() * names.length)]
}

export function randomStatus () {
  return statuses[Math.floor(Math.random() * statuses.length)]
}

export function randomColor () {
  return colors[Math.floor(Math.random() * colors.length)]
}

// `/public/avatars/X.png`
export function randomPicture () {
  return `/avatars/${Math.floor(Math.random() * 10)}.png`
}
