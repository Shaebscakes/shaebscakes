"use client"

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from 'lucide-react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      const response = await fetch('https://shaebscakes.com/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen">
      <header className="fixed top-0 w-full z-20 bg-[#710E3E] shadow-md">
        <div className="container mx-auto flex justify-between items-center p-4">
          <h1 className="text-xl md:text-2xl font-bold text-white">
            Shae-B&apos;s Cakes & Confections
          </h1>
          <nav className="hidden md:flex space-x-2">
            {['Home', 'Gallery', 'Contact'].map((item) => (
              <a key={item} href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}>
                <Button 
                  variant="ghost" 
                  className="text-white hover:text-[#710E3E] hover:bg-white/80"
                >
                  {item}
                </Button>
              </a>
            ))}
          </nav>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" className="md:hidden text-white">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[200px] sm:w-[300px] bg-[#710E3E]">
              <nav className="flex flex-col space-y-4 mt-8">
                {['Home', 'Gallery', 'Contact'].map((item) => (
                  <a key={item} href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}>
                    <Button variant="ghost" className="w-full text-white hover:text-[#710E3E] hover:bg-white/80">
                      {item}
                    </Button>
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      
      <main className="container mx-auto p-6 pt-24">
        <h3 className="text-3xl font-bold text-[#710E3E] text-center mb-8">Contact Us</h3>
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <div className="mb-4">
            <label htmlFor="name" className="block text-[#710E3E] font-semibold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none"
              placeholder='John Doe'
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-[#710E3E] font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none"
              placeholder='johndoe@gmail.com'
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="subject" className="block text-[#710E3E] font-semibold mb-2">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none"
              placeholder='Custom cake'
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-[#710E3E] font-semibold mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none"
              rows={4}
              required
            ></textarea>
          </div>
          <div className="text-center">
            <Button type="submit" className="bg-[#710E3E] hover:bg-[#8F1150] text-white text-lg px-8 py-3">
              Send Message
            </Button>
          </div>
          {status && <p className="text-center mt-4 text-lg">{status}</p>}
        </form>
      </main>
    </div>
  );
};

export default ContactForm;
