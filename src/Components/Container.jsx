import React, { useEffect } from 'react'
import { useState } from 'react'
import config from '../config/config'
import Button from './Button'

function Container() {
  const [visibleArticles, setVisibleArticles] = useState([])
  const [allArticles, setAllArticles] = useState([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [sortBy, setSortBy] = useState("publishedAt")
  const [category, setCategory] = useState("general")
  const [error, setError] = useState('')
  const [articlesCount, setArticlesCount] = useState(10)
  const [searchMode, setSearchMode] = useState(false)

  const myApiKey = config.apiKey

  useEffect(() => {
    fetchBreaking()
    setArticlesCount(10)
  }, [category])

  const fetchBreaking = async () => {
    setSearchMode(false)
    setLoading(true)
    try {
      const res = await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${myApiKey}`)
      const data = await res.json()
      setVisibleArticles(data.articles.slice(0, 10))
      setAllArticles(data.articles)
    } catch (error) {
      setError("Failed to fetch Breaking news")
    } finally {
      setLoading(false)
    }
  }


  const handleSearch = async () => {
    setSearchMode(true)
    setSortBy("publishedAt")
    setCategory("general")
    if (query.trim().length === 0) {
      alert("please Enter the Search!")
      return;
    }

    setLoading(true)
    try {
      const res = await fetch(`https://newsapi.org/v2/everything?q=${query}&sortBy=${sortBy}&apiKey=${myApiKey}`)
      const data = await res.json()
      setAllArticles(data.articles)
      setVisibleArticles(data.articles.slice(0, 10))

      if (data.articles.length === 0 || !data.articles) {
        setError("No news found for this Search.")
      } else {
        setError('')
      }

    } catch (error) {
      setError("Failed to fetch news. Please check your internet connection.");
      console.error("Error fetching news:", error)
    } finally {
      setLoading(false)
      setQuery('')
    }
  }

  const handleClear = () => {
    fetchBreaking()
    setQuery('')
    setError('')
    setArticlesCount(10)
    setSortBy("publishedAt")
    setSearchMode(false)
    setCategory("general")
  }

  const handleLoad = () => {
    const nextArticles = articlesCount + 10;
    setVisibleArticles(allArticles.slice(0, nextArticles))
    setArticlesCount(nextArticles)
  }

  return (
    <>
      <div className='flex flex-col justify-center items-center p-2 my-10 text-white'>
        <h1 className='m-2 font-bold text-2xl text-cyan-600'>
          Stay informed with the latest news from around the world
        </h1>
        <div className='my-4'>
          <input
            className='p-4 bg-cyan-400 text-black rounded-3xl w-full m-2'
            type="text"
            placeholder='Search News..'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="p-2 bg-cyan-400 rounded-2xl text-black m-2">
            <option value="" disabled>Select Sort</option>
            <option value="publishedAt">Latest</option>
            <option value="popularity">Popularity</option>
            <option value="relevancy">Relevency</option>

          </select>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 bg-cyan-400 rounded-2xl text-black m-2">
            <option value="" disabled>Select Category</option>
            <option value="general">General</option>
            <option value="business">Business</option>
            <option value="health">Health</option>
            <option value="entertainment">Entertainment</option>
            <option value="sports">Sports</option>
            <option value="technology">Technology</option>
            <option value="science">Science</option>
          </select>
          <Button
            onClick={handleSearch}>
            Search
          </Button>
        </div>
        {loading && (
          <div className="flex justify-center items-center my-4">
            <div className="w-8 h-8 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
          </div>
        )}
        {error ?
          <p className='text-lg text-red-500'>
            {error}
          </p>
          : ""}
        {visibleArticles.length > 0 && (<h2 className='text-cyan-600 m-4 text-2xl font-bold'>{searchMode === true ? "Search News" : "Breaking News"}</h2>)}
        {visibleArticles.map((article, index) =>
          <div
            key={index}
            className='flex justify-between items-center w-[70vw] m-2 p-2 min-h-[40vh] bg-cyan-950 rounded-lg flex-wrap gap-2'>
            <li className='list-none flex flex-col items-center md:flex-row'>
              <img className='w-44 h-44 rounded-2xl' src={article.urlToImage || "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=600&q=80"} alt="image" />
              <div className='flex flex-col gap-1 p-1'>
                <p className='sm:text-xl text-lg font-black'>
                  {article.title || "No title available"}
                </p>
                <p >
                  {article.description || "No description available"}
                </p>
                <div>
                  <p>
                    <span className='font-bold'>Published By: </span>
                    {article.author || "No authentic author available"}
                  </p>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline mt-2"
                  >
                    Read More
                  </a>
                </div>
              </div>
            </li>

          </div>
        )}
        <div className='flex flex-row gap-2 my-2'>
          {visibleArticles.length > 0 &&
            <Button onClick={handleLoad}>
              Load More
            </Button>}
          {visibleArticles.length > 0 &&
            <Button onClick={handleClear} >
              Clear
            </Button>}
        </div>
      </div>
    </>
  )
}

export default Container

