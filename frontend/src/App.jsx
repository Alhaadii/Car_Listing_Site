import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h1 className=" font-bold  bg-red-500 text-2xl p-4 text-white text-center">Hello world!</h1>
    </div>
  )
}

export default App
