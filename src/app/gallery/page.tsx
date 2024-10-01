"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


// Define the type for the image object
interface Image {
  id: number;
  name: string;
  url: string;
}

const ImageGallery = () => {
  // Set the state to be an array of Image objects
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://api.shaebscakes.com/image-library-urls");
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: Image[] = await response.json(); // Ensure data is typed as an array of Image objects
      setImages(data);
    } catch (error) {
      console.error('Error fetching images:', error);
      setError('Failed to load images. Please try again later.');
      // Fallback to placeholder images if API call fails
      setImages([
        { id: 1, name: "Wedding Cake", url: "/api/placeholder/800/600?text=Wedding Cake" },
        { id: 2, name: "Birthday Cupcakes", url: "/api/placeholder/800/400?text=Birthday Cupcakes" },
        { id: 3, name: "Anniversary Pastry", url: "/api/placeholder/800/1000?text=Anniversary Pastry" },
        { id: 4, name: "Custom Cake", url: "/api/placeholder/800/700?text=Custom Cake" },
        { id: 5, name: "Holiday Cookies", url: "/api/placeholder/800/500?text=Holiday Cookies" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="fixed w-full z-20 bg-[#710E3E] shadow-md">
        <div className="container mx-auto flex justify-between items-center p-4">
          <h1 className="text-xl md:text-2xl font-bold text-white">Shae-B&apos;s Cakes & Confections</h1>
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
      </header>

      <main className="flex-grow pt-20">
        <div className="container mx-auto py-8">
          <h2 className="text-3xl font-bold text-[#710E3E] text-center mb-8">Image Gallery</h2>
          {isLoading && <div className="text-center py-8">Loading images...</div>}
          {error && <div className="text-center py-8 text-red-500">{error}</div>}
          {!isLoading && !error && (
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
              {images.map((image) => (
                <Card key={image.id} className="mb-4 break-inside-avoid">
                  <CardContent className="p-2 h-full flex flex-col">
                    <Dialog>
                      <DialogTrigger>                          
                        <img
                            src={image.url}
                            alt={image.name}
                            className="w-full h-auto object-cover"
                            style={{borderRadius: "10px"}}
                          />
                      </DialogTrigger>
                      <DialogContent style={{ padding: '5px' }}>
                        <DialogHeader>
                          <img
                            src={image.url}
                            alt={image.name}
                            className="w-full h-auto object-cover"
                            style={{borderRadius: "5px"}}
                          />
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                    <div className="mt-2">
                      <h3 className="text-lg font-semibold text-[#710E3E]">{image.name}</h3>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ImageGallery;
