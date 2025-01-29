import './App.css'
import Articles from './components/Articles';

function App() {
  return (
    <>
      <div className="w-full flex flex-col justify-center items-center">
        <h2 className="text-6xl">News Aggregator</h2>
        <p className="text-lg py-2">Get the latest news from all around the world</p>
      </div>
      <div>
        <Articles />
      </div>
    </>
  )
}

export default App
