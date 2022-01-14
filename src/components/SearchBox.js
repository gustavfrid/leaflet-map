import React, { useState } from 'react'

export const SearchBox = () => {
  const [query, setQuery] = useState('')

  const onSubmit = e => {
    e.preventDefault()
    console.log('query: ', query)
    fetch(` https://nominatim.openstreetmap.org/search?q=${query}&countrycodes=se&format=json`)
      .then(res => res.json())
      .then(res => console.log(res))
  }
  return (
    <form onSubmit={onSubmit}>
      <input
        type='text'
        placeholder='search location'
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
    </form>
  )
}
