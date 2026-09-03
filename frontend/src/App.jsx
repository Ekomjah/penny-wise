import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-sm rounded-xl border border-blue-900 bg-blue-950 p-8 text-center shadow-xl">
        <h1 className="text-xl font-medium text-blue-50">Counter</h1>
        <p className="mt-2 text-sm leading-relaxed text-blue-300">
          A minimalist card styled with Tailwind CSS.
        </p>
        <div className="mt-6 text-4xl font-semibold tabular-nums text-white">{count}</div>
        <button
          type="button"
          className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-blue-950"
          onClick={() => setCount((count) => count + 1)}
        >
          Increment
        </button>
      </div>
    </main>
  )
}

export default App
