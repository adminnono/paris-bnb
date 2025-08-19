import React, { useState } from 'react';
import { Star, MapPin, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { Accommodation } from '../data/accommodations';

interface AccommodationCardProps {
  accommodation: Accommodation;
  onClick: () => void;
}

export const AccommodationCard: React.FC<AccommodationCardProps> = ({ accommodation, onClick }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState<{ [key: string]: boolean }>({});

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === accommodation.pictures.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
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
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group border border-gray-100 hover:border-blue-200 hover:-translate-y-1"
    >
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={getCurrentImage()}
          alt={accommodation.title}
          onError={() => handleImageError(accommodation.pictures[currentImageIndex])}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Image Navigation */}
        {accommodation.pictures.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200"
            >
              <ChevronLeft className="h-4 w-4 text-gray-700" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200"
            >
              <ChevronRight className="h-4 w-4 text-gray-700" />
            </button>
            
            {/* Image Indicators */}
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {accommodation.pictures.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    i === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Rating Badge */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1 shadow-lg">
          <Star className="h-4 w-4 text-yellow-400 fill-current" />
          <span className="text-sm font-semibold text-gray-900">{accommodation.rating}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Title and Location */}
        <div className="mb-3">
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
            {accommodation.title}
          </h3>
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
            <span className="truncate">{accommodation.location}</span>
          </div>
        </div>

        {/* Tags */}
        {accommodation.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {accommodation.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-md border border-blue-100"
              >
                {tag}
              </span>
            ))}
            {accommodation.tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs font-medium rounded-md border border-gray-200">
                +{accommodation.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Host and Rating */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-3">
            <img
              src={accommodation.host.picture}
              alt={accommodation.host.name}
              className="w-8 h-8 rounded-full border-2 border-gray-200"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <div className="hidden w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{accommodation.host.name}</p>
              <p className="text-xs text-gray-500">Hôte</p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            {renderStars(parseInt(accommodation.rating))}
          </div>
        </div>

        {/* Equipment Preview */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex flex-wrap gap-1">
            {accommodation.equipments.slice(0, 4).map((equipment, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-50 text-gray-700 text-xs rounded-md border border-gray-200"
              >
                {equipment}
              </span>
            ))}
            {accommodation.equipments.length > 4 && (
              <span className="px-2 py-1 bg-orange-50 text-orange-700 text-xs rounded-md border border-orange-200">
                +{accommodation.equipments.length - 4} équipements
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};