import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Search, MapPin, Star, ChevronDown, Filter, Phone, Calendar, Heart, CheckCircle } from 'lucide-react';
import axios from 'axios';

export default function Doctors() {
  const router = useRouter();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    location: router.query.location || 'JP Nagar',
    specialization: router.query.specialization || 'Dermatologist',
    gender: '',
    experience: '',
    sortBy: 'relevance'
  });
  const [totalCount, setTotalCount] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (router.isReady) {
      setFilters(prev => ({
        ...prev,
        location: router.query.location || 'JP Nagar',
        specialization: router.query.specialization || 'Dermatologist'
      }));
      fetchDoctors();
    }
  }, [router.isReady, router.query]);

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/api/doctors/search', {
        params: {
          location: filters.location,
          specialization: filters.specialization,
          sortBy: filters.sortBy,
          page: 0,
          size: 10
        }
      });
      setDoctors(response.data.doctors);
      setTotalCount(response.data.totalCount);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    fetchDoctors();
  };

  const handleBookAppointment = async (doctorId) => {
    try {
      const response = await axios.post('http://localhost:8080/api/doctors/book', {
        doctorId,
        appointmentDate: new Date().toISOString().split('T')[0],
        appointmentTime: '10:00'
      });
      alert('Appointment booked successfully!');
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Failed to book appointment. Please try again.');
    }
  };

  const DoctorCard = ({ doctor }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      {doctor.isAd && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
          <div className="flex items-center">
            <span className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded text-xs font-medium mr-2">AD</span>
            <span className="text-yellow-800 text-sm font-medium">{doctor.name}</span>
          </div>
          <p className="text-yellow-700 text-sm mt-1">1 Dermatologist</p>
          <p className="text-gray-600 text-sm">{doctor.experience}</p>
          <p className="text-gray-800 font-medium mt-2">{doctor.location}</p>
          <p className="text-gray-800 font-semibold">₹{doctor.consultationFee} Consultation Fees</p>
          
          <div className="flex items-center mt-3">
            <div className="flex items-center bg-green-100 px-2 py-1 rounded">
              <span className="text-green-800 font-medium text-sm">{doctor.rating}%</span>
            </div>
            <span className="text-gray-600 text-sm ml-2 underline cursor-pointer">
              {doctor.patientStories} Patient Stories
            </span>
          </div>
          
          <button
            onClick={() => handleBookAppointment(doctor.id)}
            className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Book Clinic Visit
          </button>
        </div>
      )}
      
      {!doctor.isAd && (
        <div className="flex">
          <div className="flex-shrink-0 mr-4">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <span className="text-white font-semibold text-lg">
                  {doctor.name.split(' ').slice(-1)[0].charAt(0)}
                </span>
              </div>
            </div>
            <div className="mt-2 text-center">
              <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                <Heart className="w-3 h-3 inline mr-1" />
                practo
              </div>
              <div className="text-xs text-gray-600 mt-1">Skin & Hair</div>
            </div>
          </div>
          
          <div className="flex-grow">
            <h3 className="text-lg font-semibold text-blue-600 hover:underline cursor-pointer">
              {doctor.name}
            </h3>
            <p className="text-gray-600">{doctor.specialization}</p>
            <p className="text-gray-600 text-sm">{doctor.experience}</p>
            
            <div className="mt-2">
              <p className="text-gray-800 font-medium">{doctor.clinicAddress}</p>
              <p className="text-gray-800 font-semibold">₹{doctor.consultationFee} Consultation fee at clinic</p>
            </div>
            
            <div className="flex items-center mt-3">
              <div className="flex items-center bg-green-100 px-2 py-1 rounded mr-3">
                <span className="text-green-800 font-medium text-sm">{doctor.rating}%</span>
              </div>
              <span className="text-gray-600 text-sm underline cursor-pointer">
                {doctor.patientStories} Patient Stories
              </span>
            </div>
            
            {doctor.availableToday && (
              <div className="flex items-center mt-2 text-green-600 text-sm">
                <CheckCircle className="w-4 h-4 mr-1" />
                Available Today
              </div>
            )}
          </div>
          
          <div className="flex flex-col space-y-2 ml-4">
            <button
              onClick={() => handleBookAppointment(doctor.id)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              Book Clinic Visit
              <div className="text-xs">No Booking Fee</div>
            </button>
            <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors text-sm flex items-center justify-center">
              <Phone className="w-4 h-4 mr-1" />
              Contact Clinic
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      <Head>
        <title>{totalCount} Dermatologists available in {filters.location}, Bangalore - Practo</title>
        <meta name="description" content={`Find and book appointments with the best dermatologists in ${filters.location}, Bangalore`} />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex items-center space-x-2 cursor-pointer" onClick={() => router.push('/')}>
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-blue-600 text-xl font-bold">practo</span>
                </div>
              </div>
              
              <nav className="hidden md:flex items-center space-x-8">
                <a href="#" className="text-blue-600 font-medium border-b-2 border-blue-600 pb-1">Find Doctors</a>
                <a href="#" className="text-gray-600 hover:text-blue-600">Video Consult</a>
                <a href="#" className="text-gray-600 hover:text-blue-600">Surgeries</a>
              </nav>

              <div className="flex items-center space-x-4">
                <span className="hidden md:inline-flex items-center px-3 py-1 rounded-full bg-blue-600 text-white text-sm">
                  <span className="bg-green-400 text-green-900 px-2 py-0.5 rounded-full text-xs font-medium mr-2">NEW</span>
                  For Corporates
                </span>
                <button className="text-gray-600 hover:text-blue-600">For Providers</button>
                <button className="text-gray-600 hover:text-blue-600">Login / Signup</button>
              </div>
            </div>
          </div>
        </header>

        {/* Search Bar */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Location"
                />
              </div>
              
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={filters.specialization}
                  onChange={(e) => handleFilterChange('specialization', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Search doctors, clinics, hospitals, etc."
                />
              </div>
              
              <button
                onClick={handleSearch}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Filters and Results */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Filter Bar */}
          <div className="bg-blue-800 text-white p-4 rounded-lg mb-6">
            <div className="flex flex-wrap items-center gap-4">
              <select
                value={filters.gender}
                onChange={(e) => handleFilterChange('gender', e.target.value)}
                className="bg-blue-700 text-white border border-blue-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>

              <select
                value={filters.experience}
                onChange={(e) => handleFilterChange('experience', e.target.value)}
                className="bg-blue-700 text-white border border-blue-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Patient Stories</option>
                <option value="100+">100+ Stories</option>
                <option value="500+">500+ Stories</option>
                <option value="1000+">1000+ Stories</option>
              </select>

              <select
                value={filters.experience}
                onChange={(e) => handleFilterChange('experience', e.target.value)}
                className="bg-blue-700 text-white border border-blue-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Experience</option>
                <option value="5+">5+ Years</option>
                <option value="10+">10+ Years</option>
                <option value="15+">15+ Years</option>
              </select>

              <button className="bg-blue-700 text-white border border-blue-600 rounded px-3 py-2 hover:bg-blue-600 transition-colors flex items-center">
                <Filter className="w-4 h-4 mr-2" />
                All Filters
                <ChevronDown className="w-4 h-4 ml-2" />
              </button>

              <div className="ml-auto flex items-center space-x-4">
                <span>Sort By</span>
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="bg-blue-700 text-white border border-blue-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="relevance">Relevance</option>
                  <option value="rating">Rating</option>
                  <option value="experience">Experience</option>
                  <option value="fee">Consultation Fee</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">
              {totalCount} Dermatologists available in {filters.location}, Bangalore
            </h1>
            <div className="flex items-center text-gray-600">
              <CheckCircle className="w-5 h-5 mr-2" />
              Book appointments with minimum wait-time & verified doctor details
            </div>
          </div>

          {/* Doctor Cards */}
          <div className="space-y-4">
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : doctors.length > 0 ? (
              doctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No doctors found matching your criteria.</p>
                <button
                  onClick={() => {
                    setFilters(prev => ({ ...prev, specialization: '', location: '' }));
                    handleSearch();
                  }}
                  className="mt-4 text-blue-600 hover:underline"
                >
                  Clear filters and search again
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}