import React, { useState } from 'react';
import { Header } from './components/Header';
import { SearchFilters } from './components/SearchFilters';
import { AccommodationCard } from './components/AccommodationCard';
import { AccommodationModal } from './components/AccommodationModal';
import { useAccommodations } from './hooks/useAccommodations';
import { Accommodation } from './data/accommodations';

function App() {
  const {
    accommodations,
    searchTerm,
    setSearchTerm,
    selectedRating,
    setSelectedRating,
    selectedEquipments,
    toggleEquipment,
    filteredCount
  } = useAccommodations();

  const [showFilters, setShowFilters] = useState(false);
  const [selectedAccommodation, setSelectedAccommodation] = useState<Accommodation | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <SearchFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedRating={selectedRating}
        onRatingChange={setSelectedRating}
        selectedEquipments={selectedEquipments}
        onEquipmentToggle={toggleEquipment}
        showFilters={showFilters}
        onToggleFilters={() => setShowFilters(!showFilters)}
        resultCount={filteredCount}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredCount === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun résultat</h3>
              <p className="text-gray-600">Aucun logement ne correspond à vos critères de recherche.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {accommodations.map((accommodation) => (
              <AccommodationCard
                key={accommodation.id}
                accommodation={accommodation}
                onClick={() => setSelectedAccommodation(accommodation)}
              />
            ))}
          </div>
        )}
      </main>

      <AccommodationModal
        accommodation={selectedAccommodation!}
        isOpen={selectedAccommodation !== null}
        onClose={() => setSelectedAccommodation(null)}
      />
    </div>
  );
}

export default App;