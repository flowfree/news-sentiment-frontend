import { useState } from 'react'
import { PrimaryButton, SecondaryButton } from '../../components/Buttons'

export default function ModelTest() {
  const [url, setUrl] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    console.log('submit')
  }

  function handleReset(e: React.MouseEvent) {
    setUrl('')
  }

  return (
    <div className="mt-10 max-w-5xl mx-auto">
      <form method="post" action="" onSubmit={handleSubmit} className="flex grow gap-3">
        <input 
          type="text" 
          name="url"
          className="block grow rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          autoComplete="off"
          value={url}
          placeholder="Enter news URL"
          onChange={e => setUrl(e.target.value)}
        />
        <PrimaryButton className="w-48">
          Check Sentiment
        </PrimaryButton>
        <SecondaryButton onClick={handleReset}>
          Reset
        </SecondaryButton>
      </form>
      <Preview />
    </div>
  )
}

function Preview() {
  return (
    <div className="group relative mt-10 flex flex-col gap-5 md:flex-row overflow-hidden rounded-lg border border-gray-200">
      <div className="aspect-w-4 aspect-h-3 bg-gray-200 sm:aspect-none sm:h-48">
        <a href="https://crypto.news/north-korean-hackers-stole-record-amount-of-crypto-in-2022/" target="_blank">
          <img src="https://crypto.news/app/uploads/2023/02/hacker-north-korea.jpeg" className="h-full w-full object-cover object-center" alt="image" />
        </a>
      </div>
      <div className="flex flex-1 flex-col space-y-3 py-3">
        <h3 className="text-2xl font-medium text-gray-900 line-clamp-2">
          <a href="https://crypto.news/north-korean-hackers-stole-record-amount-of-crypto-in-2022/" target="_blank">
            North Korean hackers stole record amount of crypto in 2022
          </a>
        </h3>
        <p className="text-base text-gray-500">
          <span className="line-clamp-2">

          Per a UN assessment, North Korean-affiliated hackers stole digital assets valued between $630 million and $1 billion last year by attacking the networks of international aerospace and defense business.
          </span>
          <span className="block text-sm font-medium text-gray-900 ">
            crypto.news
          </span>
        </p>
        <div className="flex gap-x-2 text-base">
          Sentiment: 
          <span className="inline-flex items-center border rounded bg-pink-100 text-pink-800 border-pink-200 px-2 py-0 text-sm font-medium capitalize" title="Click to edit the sentiment">
            Negative
          </span>
        </div>
      </div>
    </div>
  )
}
