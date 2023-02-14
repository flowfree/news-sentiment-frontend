import { useState } from 'react'

interface NewsCardProps {
  news: News
  onDelete?: (id: number) => void
}

export default function NewsCard({ news, onDelete }: NewsCardProps) {
  const [deleteConfirmation, setDeleteConfirmation] = useState(false)
  const [destroyed, setDestroyed] = useState(false)

  function handleDelete(id: number) {
    if (onDelete) {
      setDestroyed(true)
      onDelete(id)
    }
  }

  let sentiment = ''
  let sentimentColor = ''

  switch (news.sentiment) {
    case 'positive':
      sentiment = 'Positive'
      sentimentColor = 'bg-green-100 text-green-800'
      break
    case 'neutral':
      sentiment = 'Neutral'
      sentimentColor = 'bg-gray-100 text-gray-800'
      break
    case 'negative':
      sentiment = 'Negative'
      sentimentColor = 'bg-pink-100 text-pink-800'
      break
    default:
      break
  }

  return (
    <div className={(destroyed ? 'hidden' : '') + ` group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white`}>
      <div className="aspect-w-4 aspect-h-3 bg-gray-200 sm:aspect-none sm:h-48">
        <a href={news.url} target="_blank">
          <img
            src={news.imageUrl}
            className="h-full w-full object-cover object-center sm:h-full sm:w-full"
            alt="image"
          />
        </a>
      </div>
      <div className="flex flex-1 flex-col space-y-3 p-3">
        <div>
          <span className={`inline-flex items-center rounded ${sentimentColor} px-2 py-0.5 text-sm font-medium`}>
            {sentiment}
          </span>
        </div>
        <h3 className="text-base font-medium text-gray-900 line-clamp-2">
          <a href={news.url} title={news.title} target="_blank">
            {news.title}
          </a>
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2" title={news.description}>
          {news.description}
        </p>
          {deleteConfirmation ? (
            <DeleteConfirmation 
              onConfirm={() => handleDelete(news.id)}
              onCancel={() => setDeleteConfirmation(false)}
            />
          ) : (
            <div className="mt-4 flex flex-1">
              <p className="grow text-sm font-medium text-gray-900">
                {news.site.name}
              </p>
              <button className="text-xs text-gray-500" onClick={e => setDeleteConfirmation(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </button>
            </div>
          )}
      </div>
    </div>
  )
}

interface DeleteConfirmationProps {
  onConfirm: () => void
  onCancel: () => void
}

function DeleteConfirmation({ onConfirm, onCancel }: DeleteConfirmationProps) {
  return (
    <div className="mt-4 flex flex-row-reverse gap-x-1">
      <button className="text-sm text-green-600 hover:text-green-400" onClick={e => onCancel()}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <button className="text-sm text-red-600 hover:text-red-400" onClick={e => onConfirm() }>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      </button>
      <span className="text-red-600 text-sm font-bold">
        Delete this item?
      </span>
    </div>
  )
}
