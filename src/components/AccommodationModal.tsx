import React, { useState } from 'react';
import { X, Star, MapPin, User, ChevronLeft, ChevronRight, Wifi, Car, Utensils, Home } from 'lucide-react';
import { Accommodation } from '../data/accommodations';

interface AccommodationModalProps {
  accommodation: Accommodation;
  isOpen: boolean;
  onClose: () => void;
}

export const AccommodationModal: React.FC<AccommodationModalProps> = ({ 
  accommodation, 
  isOpen, 
  onClose 
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState<{ [key: string]: boolean }>({});

  if (!isOpen) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === accommodation.pictures.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? accommodation.pictures.length - 1 : prev - 1
    );
  };

  const handleImageError = (imageUrl: string) => {
    setImageError(prev => ({ ...prev, [imageUrl]: true }));
  };

  const getCurrentImage = () => {
    const currentImage = accommodation.pictures[currentImageIndex];
    return imageError[currentImage] ? accommodation.cover : currentImage;
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const getEquipmentIcon = (equipment: string) => {
    const lowerEquipment = equipment.toLowerCase();
    if (lowerEquipment.includes('wi-fi') || lowerEquipment.includes('wifi')) {
      return <Wifi className="h-4 w-4 text-blue-500" />;
    }
    if (lowerEquipment.includes('parking')) {
      return <Car className="h-4 w-4 text-emerald-500" />;
    }
    if (lowerEquipment.includes('cuisine')) {
      return <Utensils className="h-4 w-4 text-orange-500" />;
    }
    return <Home className="h-4 w-4 text-gray-500" />;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />
        
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200"
          >
            <X className="h-5 w-5 text-gray-700" />
          </button>

          <div className="flex flex-col lg:flex-row h-full max-h-[90vh]">
            {/* Image Section */}
            <div className="lg:w-1/2 h-64 lg:h-auto relative">
              <img
                src={getCurrentImage()}
                alt={accommodation.title}
                onError={() => handleImageError(accommodation.pictures[currentImageIndex])}
                className="w-full h-full object-cover"
              />
              
              {/* Image Navigation */}
              {accommodation.pictures.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200"
                  >
                    <ChevronLeft className="h-5 w-5 text-gray-700" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200"
                  >
                    <ChevronRight className="h-5 w-5 text-gray-700" />
                  </button>
                  
                  {/* Image Counter */}
                  <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {accommodation.pictures.length}
                  </div>
                </>
              )}

              {/* Rating Badge */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-full flex items-center space-x-1 shadow-lg">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-sm font-semibold text-gray-900">{accommodation.rating}</span>
              </div>
            </div>

            {/* Content Section */}
            <div className="lg:w-1/2 p-6 overflow-y-auto">
              {/* Header */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  {accommodation.title}
                </h2>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="h-5 w-5 mr-2 flex-shrink-0" />
                  <span>{accommodation.location}</span>
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {accommodation.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-lg border border-blue-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Rating Stars */}
                <div className="flex items-center space-x-1 mb-6">
                  {renderStars(parseInt(accommodation.rating))}
                  <span className="ml-2 text-sm text-gray-600">
                    ({accommodation.rating}/5)
                  </span>
                </div>
              </div>

              {/* Host Info */}
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl mb-6">
                <img
                  src={accommodation.host.picture}
                  alt={accommodation.host.name}
                  className="w-12 h-12 rounded-full border-2 border-gray-200"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="hidden w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-900">{accommodation.host.name}</p>
                  <p className="text-gray-600">Hôte de ce logement</p>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-700 leading-relaxed">{accommodation.description}</p>
              </div>

              {/* Equipment */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Équipements</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {accommodation.equipments.map((equipment, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                    >
                      {getEquipmentIcon(equipment)}
                      <span className="text-gray-800">{equipment}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};