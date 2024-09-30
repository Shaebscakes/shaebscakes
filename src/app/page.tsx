"use client"

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Menu, Cake, CakeSlice, Cookie, Croissant } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Autoplay from "embla-carousel-autoplay";

// Define the interface for pastWork images
interface PastWorkItem {
  id: number;
  name: string;
  url: string;
}

const HomePage = () => {
  const [showHeader, setShowHeader] = useState(false);
  
  // Use the PastWorkItem[] type for pastWork state
  const [pastWork, setPastWork] = useState<PastWorkItem[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setShowHeader(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    fetchPastWorkImages();
  }, []);

  const fetchPastWorkImages = async () => {
    try {
      const response = await fetch("/api/images");
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: PastWorkItem[] = await response.json(); // Add proper type annotation
      setPastWork(data);
    } catch (error) {
      console.error('Error fetching images:', error);
      // Fallback to placeholder images if API call fails
      setPastWork([
        { id: 1, name: "Wedding Cake", url: "/api/placeholder/800/600?text=Wedding Cake" },
        { id: 2, name: "Birthday Cupcakes", url: "/api/placeholder/800/600?text=Birthday Cupcakes" },
        { id: 3, name: "Anniversary Pastry", url: "/api/placeholder/800/600?text=Anniversary Pastry" },
        { id: 4, name: "Custom Cake", url: "/api/placeholder/800/600?text=Custom Cake" },
        { id: 5, name: "Holiday Cookies", url: "/api/placeholder/800/600?text=Holiday Cookies" },
      ]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className={`fixed w-full z-20 transition-all duration-300 ${showHeader ? 'top-0' : '-top-20'}`}>
        <div className="bg-[#710E3E] shadow-md">
          <div className="container mx-auto flex justify-between items-center p-4">
            <div className="flex items-center">
              <img style={{ height: '40px', marginRight: '10px' }} src="/Logo.png" alt="Logo" />
              <h1 className="text-xl md:text-2xl font-bold text-white">Shae-B&apos;s Cakes & Confections</h1>
            </div>
            <nav className="hidden md:flex">
              <a href="/"><Button variant="ghost" className="text-white hover:text-[#710E3E] hover:bg-white/80 mr-2">Home</Button></a>
              <a href="/gallery"><Button variant="ghost" className="text-white hover:text-[#710E3E] hover:bg-white/80 mr-2">Gallery</Button></a>
              <a href="/contact"><Button variant="ghost" className="text-white hover:text-[#710E3E] hover:bg-white/80">Contact</Button></a>
            </nav>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" className="md:hidden text-white">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[200px] sm:w-[300px] bg-[#710E3E]">
                <nav className="flex flex-col space-y-4 mt-8">
                  <a href="/"><Button variant="ghost" className="w-full text-white hover:text-[#710E3E] hover:bg-white/80">Home</Button></a>
                  <a href="/gallery"><Button variant="ghost" className="w-full text-white hover:text-[#710E3E] hover:bg-white/80">Gallery</Button></a>
                  <a href="/contact"><Button variant="ghost" className="w-full text-white hover:text-[#710E3E] hover:bg-white/80">Contact</Button></a>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <section className="relative h-screen flex items-center justify-center" style={{
          backgroundImage: "url('https://items-images-production.s3.us-west-2.amazonaws.com/files/0eee3f42b37667b201cc199d441b5d5e3e6a805e/original.jpeg')",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover"
        }}>
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 text-center text-white">
            <h2 className="text-5xl font-bold mb-4">Shae-B&apos;s Cakes & Confections</h2>
            <p className="text-xl">Sweets for your sweet tooth.</p>
          </div>
        </section>

        <section id="specialties" className="bg-white py-16 flex justify-center items-center min-h-screen">
          <div className="container mx-auto">
            <h3 className="text-3xl font-bold text-[#710E3E] text-center mb-12">Our Specialties</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center items-center">
              <Card className="border-[#710E3E] border-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center text-[#710E3E]">
                    <Cake className="mr-2" />
                    Custom Cakes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>We can make custom cakes for any occasion.</p>
                </CardContent>
              </Card>

              <Card className="border-[#710E3E] border-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center text-[#710E3E]">
                    <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" d="M5 22c-1.32 0-1.85-2.36-1.96-3.3a5.56 5.56 0 0 1 .32-2.7a2.5 2.5 0 0 1 1.87-1.62c1.17-.2 2 .5 3.06.74a1.21 1.21 0 0 0 1.56-1.37C9.41 12.03 6.28 12 5 12c0-1.86 2.04-2.1 3.5-1.96a10.8 10.8 0 0 1 2.54.56c.5.17 1.08.6 1.63.56c.83-.07 1-.93.64-1.56C12.44 8.12 9.97 8 8.5 8c0-2 1.73-2.38 3.39-2.08a11.6 11.6 0 0 1 2.49.79c.51.22 1.12.64 1.68.45c1.44-.44-.06-1.98-.7-2.35a6.6 6.6 0 0 0-1.42-.58c-.54-.16-1.2-.1-.71-.73a5.13 5.13 0 0 1 2.73-1.24c1.89-.44 4.5-.52 4.96 1.86a5.3 5.3 0 0 1-.85 3.58a39 39 0 0 1-6.85 8.63a36.6 36.6 0 0 1-4.6 3.99C7.62 21.04 6.3 22 5 22"/></svg>
                    Breads
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Fresh french breads, baguettes, croissants, etc.</p>
                </CardContent>
              </Card>

              <Card className="border-[#710E3E] border-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center text-[#710E3E]">
                    <Croissant className="mr-2" />
                    Pastries
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Cinnamon rolls, danishes, scones, turnovers, and more</p>
                </CardContent>
              </Card>

              <Card className="border-[#710E3E] border-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center text-[#710E3E]">
                    <Cookie className="mr-2" />
                    Cookies
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Everything from chocolate chip, to peanut butter and more!</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="about" className="bg-gray-100 py-16">
          <div className="container mx-auto text-center">
            <h3 className="text-3xl font-bold text-[#710E3E] mb-8">About Us</h3>
            <p className="max-w-2xl mx-auto text-lg mb-12">
              We are a local home based bakery providing customized confections for any occasion. With over 30 years of experience, we can create any confection for any event.
            </p>
          </div>
        </section>

        <section id="pastWork" className="bg-white-100 py-16">
          <div className="container mx-auto" style={{width: "70%"}}>
            <h3 className="text-3xl font-bold text-[#710E3E] text-center mb-12">Our Past Work</h3>
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 5000,
                }),
              ]}
              className="w-full max-w-4xl mx-auto"  // Carousel container's width is responsive
            >
              <CarouselContent>
                {pastWork.map((item, index) => (
                  <CarouselItem
                    className="basis-1/2"
                    key={index}
                    style={{
                      width: "100%",  // Carousel item takes full width
                    }}
                  >
                    <div className="p-1">
                      <Card style={{backgroundColor: "#710E3E"}}>
                        <CardContent
                          className="flex items-center justify-center p-6"
                          style={{
                            aspectRatio: '1 / 1', // Maintain 1:1 aspect ratio
                            padding: "2px"
                          }}
                        >
                          <img
                            src={item.url}
                            alt={item.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </CardContent>
                      </Card>
                      <h4 className="text-center mt-2 text-lg font-semibold text-[#710E3E]">
                        {item.name}
                      </h4>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
            <div className="text-center mt-12">
              <a href="/gallery">
              <Button className="bg-[#710E3E] hover:bg-[#8F1150] text-white text-lg px-8 py-3">
                View Full Gallery
              </Button>
              </a>
            </div>
          </div>
        </section>

        <section id="contact" className="bg-gray-100 py-16">
          <div className="container mx-auto text-center">
            <h3 className="text-3xl font-bold text-[#710E3E] mb-8">Contact Us</h3>
            <p className="max-w-2xl mx-auto text-lg mb-12">
              All of our creations are customized to your specific needs, contact us to discuss details and get a specific price.
            </p>
          </div>
        </section>
      </main>

      <footer className="bg-[#710E3E] text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <p>&copy; 2024 Shae-B&apos;s Cakes & Confections. All rights reserved.</p>
          <div className="flex space-x-4">

          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;