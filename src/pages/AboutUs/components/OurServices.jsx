import React from 'react';
import { Code, MonitorSmartphone, Paintbrush, ShieldCheck, ShoppingCart, Rocket, Database, Settings } from 'lucide-react';

const OurServices = () => {
  const services = [
    {
      id: 1,
      name: "Web Development",
      icon: <Code size={40} />,
      description: "Custom websites built with modern frameworks for performance, scalability, and beauty."
    },
    {
      id: 2,
      name: "Responsive Design",
      icon: <MonitorSmartphone size={40} />,
      description: "Mobile-first designs that look amazing on any screen size or device."
    },
    {
      id: 3,
      name: "UI/UX Design",
      icon: <Paintbrush size={40} />,
      description: "Crafting intuitive, aesthetic user experiences that keep users engaged."
    },
    {
      id: 4,
      name: "Security Optimization",
      icon: <ShieldCheck size={40} />,
      description: "Protect your website and user data with top-tier security practices."
    },
    {
      id: 5,
      name: "E-commerce Solutions",
      icon: <ShoppingCart size={40} />,
      description: "Scalable online stores with smooth user experiences and secure payment systems."
    },
    {
      id: 6,
      name: "Startup Launch",
      icon: <Rocket size={40} />,
      description: "From idea to execution — launch your startup with our expert support."
    },
    {
      id: 7,
      name: "Database Management",
      icon: <Database size={40} />,
      description: "Reliable and efficient database setup, integration, and management."
    },
    {
      id: 8,
      name: "Website Maintenance",
      icon: <Settings size={40} />,
      description: "Keep your site running smoothly with regular updates and performance checks."
    }
  ];

  return (
    <div className="container mx-auto">
      <h2 className="text-6xl md:text-8xl text-white/80 font-bold text-center">Our Services</h2>
      <div className="flex justify-center mb-10">
        <p className="max-w-2xl md:max-w-3xl text-center text-white/70">
          Some of our services are designed to truly impress you. Experience the difference by trying them out — see the quality, feel the care, and let the results speak for themselves.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {services.map(service => (
          <div
            key={service.id}
            className="bg-white/15 p-6 rounded-2xl hover:bg-white/10 transition-all duration-300 relative shadow-2xl"
          >
            <div className="mb-4 text-[#E22831] flex justify-center">{service.icon}</div>
            <h3 className="text-xl font-semibold text-white text-center mb-2">{service.name}</h3>
            <p className="text-sm text-white/70 text-center">{service.description}</p>
            <div className="absolute -bottom-1 -left-2.5 bg-black text-white rounded-full w-10 h-10 flex items-center justify-center text-sm">
              {service.id.toString().padStart(2, '0')}.
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurServices;