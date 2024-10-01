"use client"

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const ContactForm = () => {
    const [showHeader, setShowHeader] = useState(false);
  
    useEffect(() => {
      const handleScroll = () => {
        setShowHeader(window.scrollY > 0);
      };
  
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
    <div className="container mx-auto p-6">
        <header className={`fixed w-full z-20 transition-all duration-300 ${showHeader ? 'top-0' : '-top-20'}`}>
        <div className="bg-[#710E3E] shadow-md">
          <div className="container mx-auto flex justify-between items-center p-4">
            <h1 className="text-2xl font-bold text-white">Shae-B&apos;s Cakes & Confections</h1>
            <nav>
              <a href="/"><Button variant="ghost" className="text-white hover:text-[#710E3E] hover:bg-white/80 mr-2">Home</Button></a>
              <a href="/about"><Button variant="ghost" className="text-white hover:text-[#710E3E] hover:bg-white/80 mr-2">About</Button></a>
              <a href="/gallery"><Button variant="ghost" className="text-white hover:text-[#710E3E] hover:bg-white/80 mr-2">Gallery</Button></a>
              <a href="/contact"><Button variant="ghost" className="text-white hover:text-[#710E3E] hover:bg-white/80">Contact</Button></a>
            </nav>
          </div>
        </div>
      </header>
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
    </div>
  );
};

export default ContactForm;
