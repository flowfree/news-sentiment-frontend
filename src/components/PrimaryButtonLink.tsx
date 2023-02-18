import { Link } from 'react-router-dom'

interface Props {
  to: string
  className?: string
  children: React.ReactNode
}

export default function PrimaryButtonLink({ to, className, children }: Props) {
  return (
    <Link
      to={to}
      className={`flex items-center justify-center gap-1 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${className}`}
    >
      {children}
    </Link>
  )
}
