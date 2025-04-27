
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChartBar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow flex items-center justify-center">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 flex justify-center"
            >
              <ChartBar className="h-16 w-16 text-primary" />
            </motion.div>
            
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Ward-Wise Insights Dashboard
            </motion.h1>
            
            <motion.p
              className="text-xl text-muted-foreground mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Interactive analytics to visualize and optimize urban development across city wards
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button asChild size="lg" className="gap-2">
                <Link to="/dashboard">
                  Launch Dashboard <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-16 grid gap-8 md:grid-cols-3"
          >
            <div className="bg-card rounded-lg p-6 shadow-sm border">
              <h3 className="text-lg font-medium mb-2">Data Visualization</h3>
              <p className="text-muted-foreground">
                Upload and compare historical data against predictive models with interactive charts.
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-sm border">
              <h3 className="text-lg font-medium mb-2">Scenario Planning</h3>
              <p className="text-muted-foreground">
                Adjust development parameters to simulate different futures and optimize resources.
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-sm border">
              <h3 className="text-lg font-medium mb-2">Analytical Insights</h3>
              <p className="text-muted-foreground">
                Identify outliers, trends, and optimization opportunities across wards.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      
      <footer className="py-4 px-6 bg-muted text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Ward-Wise Insights Dashboard</p>
      </footer>
    </div>
  );
};

export default Index;
