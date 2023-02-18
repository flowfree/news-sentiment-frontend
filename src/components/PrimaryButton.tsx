interface Props {
  className?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  isSubmitting?: boolean
  children: React.ReactNode
}

export default function PrimaryButton({ className, onClick, children }: Props) {
  return (
    <button
      className={`flex items-center justify-center gap-1 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
