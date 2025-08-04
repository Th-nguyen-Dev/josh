import { use, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import logo_1 from '/logo_1.svg'
import logo_2 from '/logo_2.svg'
import logo_3 from '/logo_3.svg'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,  type CarouselApi } from './components/ui/carousel'
import { Card, CardContent } from './components/ui/card'

import MetallicPaint, { parseLogoImage } from './animation/MetallicPaint/MetallicPaint'
import Iridescence from './animation/Iridescence/Iridescence'
import GlassSurface from './animations/GlassSurface/GlassSurface'
import React from 'react'
import { Button } from './components/ui/button'


const MetallicLogo_1 = () => {
  const [imageData, setImageData] = useState<ImageData | null>(null);

  useEffect(() => {
    async function loadDefaultImage() {
      try {
        const response = await fetch(logo_1);
        const blob = await response.blob();
        const file = new File([blob], "default.png", { type: blob.type });

        const parsedData = await parseLogoImage(file);
        setImageData(parsedData?.imageData ?? null);
      } catch (err) {
        console.error("Error loading default image:", err);
      }
    }

    loadDefaultImage();
  }, []);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <MetallicPaint 
        imageData={imageData ?? new ImageData(1, 1)} 
        params={{ 
          edge: 2, 
          patternBlur: 0.005, 
          patternScale: 2, 
          refraction: 0.015, 
          speed: 0.3, 
          liquid: 0.07 
        }} 
      />
    </div>
  );
};



function App() {

  const [currentLogo, setCurrentLogo] = useState(logo_1);
  const [api, setApi] = React.useState<CarouselApi>()

  useEffect(() => {
    if (!api) return;
    
    const updateCurrentLogo = () => {
      setCurrentLogo(`/logo_${api.selectedScrollSnap() + 1}.svg`);
    };
    
    // Set initial logo
    updateCurrentLogo();
    
    // Listen for carousel selection changes
    api.on("select", updateCurrentLogo);
    
    return () => {
      api.off("select", updateCurrentLogo);
    };
  }, [api]);

  return (
    <div>
    <div className='h-screen w-screen fixed top-0 left-0 -z-0'>
            <Iridescence
        color={[1, 1, 1]}
        mouseReact={false}
        amplitude={0.1}
        speed={1.0}
      />
    </div>
    <div className='h-screen w-screen flex flex-col items-center justify-start py-10'>
      <div className="w-3/4 h-12 rounded-full z-10 overflow-hidden">
        <GlassSurface width={'100%'} height={'100%'}>
          <div className='h-full w-full flex items-center justify-between p-2'>
            <div className='flex items-center gap-2 text-lg font-bold text-black'>
            <img className='h-8 w-8 aspect-square' src={currentLogo} alt="Logo" />
            <h2>Joshy Co</h2>
            </div>
            <div className='flex items-center gap-4 text-lg font-bold text-black'>
              <h2>Home</h2>
              <h2>About</h2>
              <h2>Contact</h2>
            </div>
          </div>
        </GlassSurface>
      </div>
      <div className='h-full w-full flex flex-col items-center justify-center'>
        <div className='w-48' >
          <Carousel setApi={setApi}>
            <CarouselContent>
              <CarouselItem>
                  <Card className="bg-transparent border-0 shadow-none">
                    <CardContent className="flex items-center justify-center ">
                      <img className='h-40' src={logo_1} alt="React Bits Logo" />
                    </CardContent>
                  </Card>
              </CarouselItem>
              <CarouselItem>
                <Card className="bg-transparent border-0 shadow-none">
                  <CardContent className="flex items-center justify-center ">
                    <img className='h-40' src={logo_2} alt="Logo 2" />
                  </CardContent>
                </Card>
              </CarouselItem>
              <CarouselItem>
                <Card className="bg-transparent border-0 shadow-none">
                  <CardContent className="flex items-center justify-center ">
                    <img className='h-40' src={logo_3} alt="Logo 3" />
                  </CardContent>
                </Card>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious  />
            <CarouselNext  />
          </Carousel>

        </div>
          <h1 className='text-center text-2xl font-extrabold text-black z-10 w-3/4'>
            Joshy has a company and it is called Joshy Co. This is his website demo and I am just tersting this text
          </h1>
          <h1 className='text-center text-sm font-normal w-1/2 text-black z-10 pt-10'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </h1>
      </div>
    </div>
    </div>
  )
}

export default App
