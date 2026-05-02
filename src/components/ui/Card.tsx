export default function Card({ children, className }: any) {
  return (
    <div className={`bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-4 ${className}`}>
      {children}
    </div>
  )
}

