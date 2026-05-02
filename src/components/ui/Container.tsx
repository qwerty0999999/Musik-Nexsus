export default function Container({ children, className }: any) {
  return <div className={`px-8 py-6 ${className}`}>{children}</div>
}
