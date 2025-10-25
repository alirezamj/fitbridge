const features = [
  { title: "Workout Tracker", desc: "Log and monitor your workouts easily." },
  { title: "Nutrition Insights", desc: "Analyze your meals and macros." },
  { title: "Progress Charts", desc: "Visualize your fitness journey." },
];

export default function Features() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 bg-gray-50">
      {features.map((f, i) => (
        <div key={i} className="bg-white p-6 rounded shadow hover:shadow-lg transition">
          <h3 className="text-xl font-bold text-blue-600 mb-2">{f.title}</h3>
          <p className="text-gray-600">{f.desc}</p>
        </div>
      ))}
    </section>
  );
}