import React from 'react'

export default () => {
  const handleRequest = () => {
    window.shell.openExternal("http://localhost:54332/")
  }
  return (
    <div>
      <h1>App</h1>
      <button onClick={handleRequest}>테스트</button>
    </div>
  )
}
