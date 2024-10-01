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
      const response = await fetch("https://api.shaebscakes.com/image-library-urls");
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

        <section id="specialties" className="bg-white py-16 flex justify-center items-center">
          <div className="container mx-auto">
            <h3 className="text-3xl font-bold text-[#710E3E] text-center mb-12">Our Specialties</h3>
            <div style={{marginLeft: '5px', marginRight: '5px'}} className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center items-center">
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
                  <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.194 14.077c-1.248 1.231-1.35 3.54-1.057 5.674c.265 1.935 2.442 2.848 4.075 1.825c2.987-1.87 6.106-4.334 9.095-7.281c3.07-3.028 4.753-5.334 6.237-7.927c.9-1.573.478-3.67-1.344-4.136c-1.995-.509-4.58-.3-6.862 1.846m-10.144 10c-.834-3.74 2.096-8.146 8.972-4.284m-8.972 4.283c.623.013 2.024.295 3.36 1.248m.292-7.13c.063-1.94 1.977-5.19 6.492-4.117m0 0c.966.23 2.052.657 3.264 1.338" color="currentColor"/></svg>
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
            <p className="max-w-2xl mx-auto text-lg mb-2">
              We are a local home based bakery providing customized confections for any occasion. 
              With over 30 years of experience, we can create any confection for any event.
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
            <a href="/contact">
              <Button className="bg-[#710E3E] hover:bg-[#8F1150] text-white text-lg px-8 py-3">
                Contact Us
              </Button>
            </a>
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
