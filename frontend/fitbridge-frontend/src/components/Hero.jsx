import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const slides = [
  { img: '/images/workout.jpg', text: 'Track workouts with precision' },
  { img: '/images/nutrition.jpg', text: 'Analyze your nutrition deeply' },
  { img: '/images/progress.jpg', text: 'Visualize your fitness journey' },
];

export default function Hero() {
  return (
    <section className="text-white">
      <Swiper loop autoplay={{ delay: 3000 }} className="h-[300px]">
        {slides.map((s, i) => (
          <SwiperSlide key={i}>
            <div
              className="h-full bg-cover bg-center flex items-center justify-center"
              style={{ backgroundImage: `url(${s.img})` }}
            >
              <h2 className="text-3xl font-bold bg-black bg-opacity-50 p-4 rounded">{s.text}</h2>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}