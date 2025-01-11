import { useState } from 'preact/hooks'
// import preactLogo from './assets/preact.svg'
// import viteLogo from '/vite.svg'
import pillHubLogo from '/pill-hub-logo.svg'
import axios from 'axios'
import './app.css'

const apiCall = () => {
  axios.get('http://localhost:3000/hello')
    .then((data) => console.log(data))
    .catch((error) => console.error('Error:', error));
}

const categories = [
  'Men', 'Women', 'Children',
  'Mood', 'Sleep', 'Energy',
  'Brain', 'Immune', 'Digestive',
  'Skin', 'Hair', 'Weight', 'Pain'
]

export function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <img src={pillHubLogo} alt="pillHub logo" />
        {/* <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} class="logo" alt="Vite logo" />
        </a>
        <a href="https://preactjs.com" target="_blank">
          <img src={preactLogo} class="logo preact" alt="Preact logo" />
        </a> */}
      </div>
      <h1>pillhub</h1>
      <h2>the #1 way to find your supplements.</h2>
      <div class="card">
        <div>
        <label for="search">Search or select your categories</label>
        <input type="text" style={{ width: '100%' }} placeholder="Search for a supplement" />
        </div>
        <div class="categories">
          {categories.map((category) => (
            <button>{category}</button>
          ))}
        </div>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={apiCall}>
          api call
        </button>
        {/* <p>
          Edit <code>src/app.tsx</code> and save to test HMR
        </p> */}
      </div>
      <p class="read-the-docs">
        browse supplements by name, brand, or category
      </p>
    </>
  )
}
