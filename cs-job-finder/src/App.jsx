import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Navigation, 
  Briefcase, 
  Code, 
  ExternalLink, 
  Loader2,
  Terminal
} from 'lucide-react';

const App = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to get current location
  const getLocation = () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setLoading(false);
      },
      (err) => {
        let errorMessage = "Unable to retrieve your location.";
        if (err.code === 1) errorMessage = "Location permission denied. Please enable location services.";
        if (err.code === 2) errorMessage = "Location unavailable.";
        if (err.code === 3) errorMessage = "Request timed out.";
        setError(errorMessage);
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  // Initial load
  useEffect(() => {
    // Optional: Auto-request location on load
    // getLocation(); 
  }, []);

  const openGoogleMaps = () => {
    if (location) {
      const url = `https://www.google.com/maps/search/homeless+shelter/@${location.lat},${location.lng},14z`;
      window.open(url, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20 md:pb-0">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-indigo-600">
            <Terminal className="fill-current text-indigo-600" size={24} />
            <span className="text-xl font-bold tracking-tight text-slate-900">CS Job Finder</span>
          </div>
          <div className="flex items-center space-x-6 text-sm font-medium text-slate-600">
            <span className="hidden sm:inline">Tech Hubs</span>
            <span className="hidden sm:inline">Startups</span>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto p-4 md:p-8 space-y-8">
        
        {/* Header Section */}
        <div className="text-center space-y-3 py-4">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            Find Your Next <span className="text-indigo-600">Tech Role</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Scout local software companies, startups, and tech hubs in your immediate vicinity.
          </p>
        </div>

        {/* Location Request State */}
        {!location && !loading && (
          <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center space-y-6 shadow-sm max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto">
              <Briefcase size={36} />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Locate Opportunities</h2>
              <p className="text-slate-500 max-w-md mx-auto">
                Grant location access to see software companies, agencies, and tech offices near you.
              </p>
            </div>
            <button 
              onClick={getLocation}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg shadow-indigo-200 flex items-center justify-center mx-auto"
            >
              <Navigation size={20} className="mr-2" />
              Scan for Jobs Nearby
            </button>
            {error && (
              <div className="inline-flex items-center text-red-500 text-sm mt-4 bg-red-50 px-4 py-2 rounded-lg">
                <MapPin size={16} className="mr-2" />
                {error}
              </div>
            )}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="bg-white border border-slate-200 rounded-2xl h-80 flex flex-col items-center justify-center space-y-4 max-w-2xl mx-auto">
            <Loader2 size={40} className="animate-spin text-indigo-600" />
            <p className="text-slate-500 font-medium">Scanning local tech sector...</p>
          </div>
        )}

        {/* Map & Results State */}
        {location && !loading && (
          <div className="space-y-6 animate-in fade-in duration-500">
            {/* Map Container */}
            <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden group">
              <div className="absolute top-4 right-4 z-10">
                <button 
                  onClick={openGoogleMaps}
                  className="bg-white text-slate-800 text-xs font-bold px-3 py-2 rounded-lg shadow-md border border-slate-200 flex items-center hover:bg-slate-50"
                >
                  Open Maps App <ExternalLink size={12} className="ml-1" />
                </button>
              </div>
              
              <iframe
                title="Tech Jobs Map"
                width="100%"
                height="500"
                className="rounded-xl bg-slate-100"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src={`https://maps.google.com/maps?q=homeless+shelters+${location.lat},${location.lng}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
              ></iframe>
              
              <div className="p-3 flex items-center justify-between text-sm text-slate-500">
                <span className="flex items-center text-indigo-600 font-medium">
                  <Code size={16} className="mr-2" />
                  Showing software & tech companies nearby
                </span>
                <button onClick={getLocation} className="text-indigo-600 hover:underline">
                  Refresh Area
                </button>
              </div>
            </div>

            {/* Primary Action */}
            <div className="flex justify-center">
              <button 
                onClick={openGoogleMaps}
                className="w-full max-w-md bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-xl font-bold text-lg shadow-lg shadow-indigo-200 transition-all flex items-center justify-center"
              >
                <Navigation size={24} className="mr-2" />
                View Full List in Google Maps
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default App;