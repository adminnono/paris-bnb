import { useMemo, useState } from 'react';
import { accommodations, Accommodation } from '../data/accommodations';

export const useAccommodations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRating, setSelectedRating] = useState('all');
  const [selectedEquipments, setSelectedEquipments] = useState<string[]>([]);

  const filteredAccommodations = useMemo(() => {
    return accommodations.filter((accommodation) => {
      // Search filter
      const matchesSearch = searchTerm === '' || 
        accommodation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        accommodation.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        accommodation.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      // Rating filter
      const matchesRating = selectedRating === 'all' || 
        parseInt(accommodation.rating) >= parseInt(selectedRating);

      // Equipment filter
      const matchesEquipments = selectedEquipments.length === 0 || 
        selectedEquipments.every(equipment => 
          accommodation.equipments.some(accEquipment => 
            accEquipment.toLowerCase().includes(equipment.toLowerCase())
          )
        );

      return matchesSearch && matchesRating && matchesEquipments;
    });
  }, [searchTerm, selectedRating, selectedEquipments]);

  const toggleEquipment = (equipment: string) => {
    setSelectedEquipments(prev => 
      prev.includes(equipment) 
        ? prev.filter(e => e !== equipment)
        : [...prev, equipment]
    );
  };

  return {
    accommodations: filteredAccommodations,
    searchTerm,
    setSearchTerm,
    selectedRating,
    setSelectedRating,
    selectedEquipments,
    toggleEquipment,
    totalCount: accommodations.length,
    filteredCount: filteredAccommodations.length
  };
};