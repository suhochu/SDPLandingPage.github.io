
import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ children, className = '' }) => {
  return (
    <section className={`py-14 px-5 mb-5 bg-alpaka-card-bg border border-alpaka-border rounded-xl backdrop-blur-lg shadow-accent-lg ${className}`}>
      {children}
    </section>
  );
};

export default Section;
