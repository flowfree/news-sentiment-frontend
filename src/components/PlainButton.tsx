interface Props {
  className?: string
  children: React.ReactNode
  onClick?: (e: React.MouseEvent) => void
}

export default function PlainButton({ className, children, onClick }: Props) {
  return (
    <button 
      className={`rounded-md border border-gray-500 border-transparent py-2 px-4 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-100 focus:outline-none ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
