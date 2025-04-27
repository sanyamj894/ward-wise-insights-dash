
import { motion } from 'framer-motion';
import { ChartBar } from 'lucide-react';

const Header = () => {
  return (
    <motion.header 
      className="bg-primary text-primary-foreground p-4 shadow-md"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <ChartBar className="w-8 h-8" />
          <motion.h1 
            className="text-2xl font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Ward-Wise Insights Dashboard
          </motion.h1>
        </div>
        <motion.div 
          className="text-sm opacity-90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Urban Development Predictive Analytics
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;
