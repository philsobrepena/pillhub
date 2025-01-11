import { useState, useEffect } from 'preact/hooks'
// import preactLogo from './assets/preact.svg'
// import viteLogo from '/vite.svg'
import pillHubLogo from '/pill-hub-logo.svg'
import axios from 'axios'
import './app.css'

// const apiCall = () => {
//   axios.get('http://localhost:3000/hello')
//     .then((data) => console.log(data))
//     .catch((error) => console.error('Error:', error));
// }

const categories = [
  "Anti-Aging",
  "Antioxidants",
  "Beauty",
  "Brain",
  "Children",
  "Digestion",
  "Energy",
  "Fitness",
  "Focus",
  "General",
  "Gut",
  "Hair",
  "Hormones",
  "Immune",
  "Inflammation",
  "Joints",
  "Men",
  "Minerals",
  "Mood",
  "Muscle",
  "Nootropics",
  "Pain",
  "Performance",
  "Protein",
  "Recovery",
  "Skin",
  "Sleep",
  "Strength",
  "Stress",
  "Vitamins",
  "Weight",
  "Wellness",
  "Women"
]

interface Supplement {
  name: string;
  category: string;
  description: string;
}

export function App() {
  const [supplements, setSupplements] = useState<Supplement[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string[]>([])

  useEffect(() => {
    getSupplements()
  }, [])

  const getSupplements = () => {
    axios.get('http://localhost:3000/supplements')
      .then((response) => setSupplements(response.data))
      .catch((error) => console.error('Error:', error));
  }

  return (
    <>
      <div>
        <img src={pillHubLogo} alt="pillHub logo" />
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
            <button
              onClick={() =>  setSelectedCategory(prev => prev.includes(category)
                ? prev.filter(cat => cat !== category) // remove if already selected
                : [...prev, category])} // add if not selected
              style={{ backgroundColor: selectedCategory.includes(category) ? 'navy' : undefined }}
            >{category}</button>
          ))}
        </div>
      </div>
      {/* build a table of supplements */}
      <table class="supplements-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {supplements
            .filter(supplement =>
               selectedCategory.length === 0 ||
               selectedCategory.some(category =>
                Array.isArray(supplement.category)
                ? supplement.category.includes(category)
                : supplement.category.split(',').includes(category)
              )
            )
            .map((supplement) => (
            <tr>
              <td>{supplement.name}</td>
              <td>{Array.isArray(supplement.category)
              ? supplement.category.join(', ')
              : supplement.category}</td>
              <td>{supplement.description}</td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p class="read-the-docs">
        browse supplements by name, brand, or category
      </p>
    </>
  )
}
