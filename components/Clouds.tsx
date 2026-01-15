import React from 'react';

const Clouds: React.FC = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-64 z-10 pointer-events-none overflow-hidden opacity-90">
       {/* Use SVG filters for a more organic, dark cloud look */}
       <div className="relative w-full h-full">
         
         {/* Layer 1: Base Dark Clouds */}
         <div className="absolute -top-16 -left-10 w-[120%] h-48 bg-slate-800 rounded-[100%] blur-xl opacity-80 animate-float"></div>
         
         {/* Layer 2: Middle textured clouds */}
         <div className="absolute -top-10 left-1/4 w-[120%] h-40 bg-slate-700 rounded-[100%] blur-2xl opacity-70 animate-float" style={{ animationDelay: '-2s' }}></div>

         {/* Layer 3: Highlights/Depth */}
         <div className="absolute -top-20 -right-20 w-[80%] h-56 bg-gray-900 rounded-[100%] blur-xl opacity-90 animate-float" style={{ animationDelay: '-5s' }}></div>
         
         {/* Layer 4: Lower mist */}
         <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-slate-900 via-slate-800/50 to-transparent blur-sm"></div>
       </div>
    </div>
  );
};

export default Clouds;