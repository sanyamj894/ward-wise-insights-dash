
import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-auto py-4 px-6 bg-secondary text-secondary-foreground text-sm text-center">
      <div className="container mx-auto">
        <p>© {new Date().getFullYear()} Ward-Wise Insights Dashboard</p>
      </div>
    </footer>
  );
};

export default Footer;
