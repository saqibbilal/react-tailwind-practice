import { FeatureCard } from "./FeatureCard.tsx";
import { Cpu } from 'lucide-react';

export default function App() {

    return (
        <div className="bg-gray-900 text-white flex flex-col items-center justify-center h-screen">
            <FeatureCard
              title="API-First Architecture"
              description="If you want that transition to feel 'smooth,' you can add transition-all duration-300 to the element. However, be aware that animating line-clamp (changing from 2 lines to many) is notoriously tricky for browsers to animate smoothly because the height of the element changes abruptly. Usually, a simple 'snap' or a height-based animation is used instead for high-end polish."
              icon={Cpu}
              category="Development"
            />
        </div>
    )
}