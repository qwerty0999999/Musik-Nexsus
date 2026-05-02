export default function ProjectPage({ params }: { params: { id: string } }) {
  return (
    <div className="p-8">
      <h1 className="text-white text-3xl font-bold">Project: {params.id}</h1>
      <p className="text-gray-400 mt-2">Detail proyek sedang dikembangkan...</p>
    </div>
  )
}
