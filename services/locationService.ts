import { City } from '../types';

class LocationService {
  // Fetch list of all municipalities in Brazil from IBGE
  public async getBrazilianCities(): Promise<City[]> {
    try {
      const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/municipios?orderBy=nome');
      if (!response.ok) throw new Error('Failed to fetch cities');
      const data = await response.json();
      return data.map((city: any) => ({
        id: city.id,
        nome: city.nome
      }));
    } catch (error) {
      console.error("Error fetching cities:", error);
      return [];
    }
  }

  // Get current coordinates wrapper
  public getCurrentPosition(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation not supported"));
      } else {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout: 10000,
          maximumAge: 60000, // Cache for 1 minute
          enableHighAccuracy: false // Low accuracy is fine for city level and faster
        });
      }
    });
  }

  // Reverse Geocode using OpenStreetMap Nominatim (Free, no key required for low usage)
  public async getCityFromCoordinates(lat: number, lon: number): Promise<string | null> {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
      const data = await response.json();
      
      // Nominatim structure varies, try to find the city/town/village
      const address = data.address;
      if (address) {
        return address.city || address.town || address.municipality || address.village || address.hamlet || null;
      }
      return null;
    } catch (error) {
      console.error("Reverse geocoding failed:", error);
      return null;
    }
  }
}

export const locationService = new LocationService();
