import { useState } from 'react'
import PlainButton from '../../components/PlainButton'
import PrimaryButton from '../../components/PrimaryButton'

interface Props {
  onSearch: (query: string) => void
  onRefresh: () => void
}

export default function FilterForm({ onSearch, onRefresh }: Props) {
  const [query, setQuery] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (query) {
      onSearch(query)
    }
  }

  return (
    <div className="flex gap-10">
      <form method="post" action="" onSubmit={handleSubmit} className="grow flex gap-2">
        <label htmlFor="query" className="font-bold pt-2">
          Search:
        </label>
        <input 
          type="text" 
          name="query"
          className="block grow rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="E.g: sentiment:positive"
          autoComplete="off"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <PrimaryButton>
          Search
        </PrimaryButton>
      </form>
      <div>
        <PlainButton onClick={onRefresh}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
        </PlainButton>
      </div>
    </div>
  )
}
