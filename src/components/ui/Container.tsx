export default function Container({ children, className }: any) {
  return <div className={`px-4 md:px-8 py-4 md:py-6 ${className}`}>{children}</div>
}

