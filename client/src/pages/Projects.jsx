import CallToAction from "../components/CallToAction";

export function Projects() {
  return (
    <div className="min-h-screen max-w-2xl mx-auto flex justify-center items-center flex-col gap-6 p-3">
      <h1 className="text-3xl font-semibold">Ідеї</h1>
      <p className="text-md text-gray-500">Ділитися своїми ідеями та пропозиціями щодо покращення навчального процесу в &quot;Optima Collage&quot;</p>
      <CallToAction/>
    </div>
  )
}
