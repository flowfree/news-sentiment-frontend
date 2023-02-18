interface Props {
  className?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  isSubmitting?: boolean
  children: React.ReactNode
}

export default function SecondaryButton({ className, onClick, children }: Props) {
  return (
    <button
      className={`flex items-center justify-center gap-1 rounded-md border border-transparent bg-indigo-100 py-2 px-4 text-sm font-medium text-indigo-700 shadow-sm hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
