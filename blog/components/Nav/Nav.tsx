import { memo } from 'react'

let render = 0

export const Nav = memo(() => {
  console.log(`render${render}`)
  render++
  return (
    <header>header</header>
  );
})