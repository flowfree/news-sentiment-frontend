import { useState } from 'react'

interface SentimentLabelProps {
  sentiment: 'positive' | 'neutral' | 'negative'
  className?: string
  onUpdate?: (newSentiment: string) => void
  children?: React.ReactNode
}

export default function SentimentLabel({ 
  sentiment, 
  className,
  onUpdate,
  children
}: SentimentLabelProps) {
  const [currentSentiment, setCurrentSentiment] = useState<string>(sentiment)
  const [otherSentiments, setOtherSentiments] = useState<string[]>([])
  const SENTIMENTS = ['positive', 'neutral', 'negative']

  function getColor(sentiment: string) {
    if (sentiment === 'positive') {
      return 'bg-green-100 text-green-800 border-green-200'
    } else if (sentiment === 'neutral') {
      return 'bg-gray-100 text-gray-800 border-gray-200'
    } else if (sentiment === 'negative') {
      return 'bg-pink-100 text-pink-800 border-pink-200'
    }
  }

  function handleEdit(e: React.MouseEvent) {
    e.preventDefault()
    if (otherSentiments.length === 0) {
      setOtherSentiments(SENTIMENTS.filter(s => s !== currentSentiment))
    } else {
      setOtherSentiments([])
    }
  }

  function handleUpdate(e: React.MouseEvent, newSentiment: string) {
    e.preventDefault()
    if (onUpdate) {
      setCurrentSentiment(newSentiment)
      setOtherSentiments([])
      onUpdate(newSentiment)
    }
  }

  return (
    <>
      <button 
        className={`inline-flex items-center border rounded px-2 py-0 text-sm font-medium ${ children ? '' : 'capitalize' } ${className} ${getColor(currentSentiment)}`}
        onClick={handleEdit}
        title="Click to edit the sentiment"
      >
        {children ? children : currentSentiment}
      </button>
      {otherSentiments.map(s => (
        <button 
          key={s}
          className={`inline-flex items-center border rounded ${getColor(s)} px-2 py-0 text-sm font-medium capitalize`}
          onClick={e => handleUpdate(e, s)}
        >
          {s}
        </button>
      ))}
      {otherSentiments.length > 0 && (
        <button 
          className="text-sm" 
          onClick={e => setOtherSentiments([])} 
          title="Cancel"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.0} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </>
  )
}