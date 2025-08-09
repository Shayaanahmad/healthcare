'use client';

import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import {
  Search,
  MapPin,
  Calendar,
  ShoppingCart,
  FileText,
  Activity,
  Users,
  Heart
} from 'lucide-react';

export default function Home() {
  const [location, setLocation] = useState('Bangalore');
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(
        `/doctors?location=${encodeURIComponent(location)}&specialization=${encodeURIComponent(searchQuery)}`
      );
    }
  };

  const popularSearches = [
    'Dermatologist',
    'Pediatrician',
    'Gynecologist/Obstetrician',
    'Orthopedic'
  ];

  const services = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Consult with a doctor',
      desc: 'Get expert medical advice'
    },
    {
      icon: <ShoppingCart className="w-8 h-8" />,
      title: 'Order Medicines',
      desc: 'Get medicines delivered'
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: 'View medical records',
      desc: 'Access your health data'
    },
    {
      icon: <Activity className="w-8 h-8" />,
      title: 'Book test',
      desc: 'Schedule lab tests',
      badge: 'New'
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: 'Read articles',
      desc: 'Health tips and advice'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'For healthcare providers',
      desc: 'Join our platform'
    }
  ];

  return (
    <>
      <Head>
        <title>Practo - Your home for health</title>
        <meta
          name="description"
          content="Find and book appointments with the best doctors near you"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 relative overflow-hidden">
        {/* Header */}
        <header className="relative z-10 px-4 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-white text-xl font-bold">practo</span>
              </div>
            </div>

            <nav className="hidden md:flex items-center space-x-8 text-white">
              <a href="#" className="hover:text-blue-200 border-b-2 border-white pb-1">
                Find Doctors
              </a>
              <a href="#" className="hover:text-blue-200">Video Consult</a>
              <a href="#" className="hover:text-blue-200">Surgeries</a>
            </nav>

            <div className="flex items-center space-x-4">
              <span className="hidden md:inline-flex items-center px-3 py-1 rounded-full bg-blue-600 text-white text-sm">
                <span className="bg-green-400 text-green-900 px-2 py-0.5 rounded-full text-xs font-medium mr-2">
                  NEW
                </span>
                For Corporates
              </span>
              <button className="text-white hover:text-blue-200">For Providers</button>
              <button className="text-white hover:text-blue-200">Security & help</button>
              <button className="text-white hover:text-blue-200">Login / Signup</button>
            </div>
          </div>
        </header>

        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-600 rounded-full opacity-20"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-yellow-400 rounded-full opacity-30"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-blue-500 rounded-full opacity-15"></div>
          <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-green-400 rounded-full opacity-25"></div>

          {/* Animated elements */}
          <div className="absolute top-1/4 left-20 animate-pulse">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
          </div>

          <div className="absolute bottom-1/3 right-16 animate-bounce">
            <div className="w-10 h-10 bg-yellow-400 bg-opacity-30 rounded-full"></div>
          </div>
        </div>

        {/* Main content */}
        <main className="relative z-10 px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-8">
              Your home for health
            </h1>

            <div className="bg-white rounded-lg p-6 shadow-2xl mb-12">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Find and Book</h2>

              <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Location"
                  />
                </div>

                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Search doctors, clinics, hospitals, etc."
                  />
                </div>

                <button
                  type="submit"
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Search
                </button>
              </form>

              <div className="mt-6">
                <p className="text-gray-600 mb-3">Popular searches:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {popularSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => setSearchQuery(search)}
                      className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-colors text-sm"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
