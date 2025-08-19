import React from 'react';
import { Search, Filter, Star, Wifi, Car, Utensils } from 'lucide-react';

interface SearchFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedRating: string;
  onRatingChange: (rating: string) => void;
  selectedEquipments: string[];
  onEquipmentToggle: (equipment: string) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
  resultCount: number;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  searchTerm,
  onSearchChange,
  selectedRating,
  onRatingChange,
  selectedEquipments,
  onEquipmentToggle,
  showFilters,
  onToggleFilters,
  resultCount
}) => {
  const popularEquipments = ['Wi-fi', 'Parking', 'Cuisine équipée', 'Machine à laver', 'Télévision', 'Climatisation'];

  const getEquipmentIcon = (equipment: string) => {
    if (equipment.toLowerCase().includes('wi-fi') || equipment.toLowerCase().includes('wifi')) {
      return <Wifi className="h-4 w-4" />;
    }
    if (equipment.toLowerCase().includes('parking')) {
      return <Car className="h-4 w-4" />;
    }
    if (equipment.toLowerCase().includes('cuisine')) {
      return <Utensils className="h-4 w-4" />;
    }
    return null;
  };

  return (
    <div className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col space-y-4">
          {/* Search Bar */}
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Rechercher par titre ou localisation..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
              />
            </div>
            <button
              onClick={onToggleFilters}
              className="flex items-center space-x-2 px-4 py-3 bg-gray-50 hover:bg-gray-100 border border-gray-300 rounded-xl transition-all duration-200"
            >
              <Filter className="h-5 w-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Filtres</span>
            </button>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">{resultCount}</span> logement{resultCount !== 1 ? 's' : ''} trouvé{resultCount !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Rating Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Note minimum
                  </label>
                  <div className="space-y-2">
                    {['all', '5', '4', '3', '2'].map((rating) => (
                      <label key={rating} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="rating"
                          value={rating}
                          checked={selectedRating === rating}
                          onChange={(e) => onRatingChange(e.target.value)}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <div className="flex items-center space-x-2">
                          {rating === 'all' ? (
                            <span className="text-sm font-medium text-gray-700">Toutes les notes</span>
                          ) : (
                            <>
                              <span className="text-sm font-medium text-gray-700">{rating}</span>
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="text-sm text-gray-500">et plus</span>
                            </>
                          )}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Equipment Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Équipements
                  </label>
                  <div className="space-y-2">
                    {popularEquipments.map((equipment) => (
                      <label key={equipment} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedEquipments.includes(equipment)}
                          onChange={() => onEquipmentToggle(equipment)}
                          className="text-blue-600 focus:ring-blue-500 rounded"
                        />
                        <div className="flex items-center space-x-2">
                          {getEquipmentIcon(equipment)}
                          <span className="text-sm font-medium text-gray-700">{equipment}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};