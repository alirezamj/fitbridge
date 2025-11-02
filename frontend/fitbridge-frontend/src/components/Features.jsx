const features = [
  { title: "Workout Tracker", desc: "Log and monitor your workouts easily." },
  { title: "Nutrition Insights", desc: "Analyze your meals and macros." },
  { title: "Progress Charts", desc: "Visualize your fitness journey." },
  { title: "Progress Charts", desc: "Visualize your fitness journey." },
  { title: "Progress Charts", desc: "Visualize your fitness journey." },
  { title: "Progress Charts", desc: "Visualize your fitness journey." },
  { title: "Progress Charts", desc: "Visualize your fitness journey." },
  { title: "Progress Charts", desc: "Visualize your fitness journey." },
  { title: "Progress Charts", desc: "Visualize your fitness journey." },
  { title: "Progress Charts", desc: "Visualize your fitness journey." },

];

export default function Features() {
  return (
<section className="flex overflow-x-auto snap-x snap-mandatory space-x-4 p-8 bg-gray-50">
  {features.map((f, i) => (
    <div key={i} className="min-w-[250px] snap-center bg-white p-6 rounded shadow hover:shadow-lg transition">
      <h3 className="text-xl font-bold text-blue-600 mb-2">{f.title}</h3>
      <p className="text-gray-600">{f.desc}</p>
    </div>
  ))}
</section>
  );
}