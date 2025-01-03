import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { Jobs } from '@/utils/types/form-type';

interface UseMapProps {
    setFormData: React.Dispatch<React.SetStateAction<Jobs>>;
    existingMap?: string;
}

export const useMap = ({ setFormData, existingMap }: UseMapProps) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const markerRef = useRef<google.maps.Marker | null>(null);
    const [initialLocation, setInitialLocation] = useState<google.maps.LatLngLiteral | null>(null);
    const [location, setLocation] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isMapLoaded, setIsMapLoaded] = useState(false);

    const reverseGeocode = (location: google.maps.LatLngLiteral) => {
        const geocoder = new google.maps.Geocoder();
        geocoder
            .geocode({ location })
            .then((response) => {
                if (response.results && response.results.length > 0) {
                    const formattedAddress = response.results[0].formatted_address;
                    const locArr = formattedAddress.split(",").slice(-2);
                    const locationString = `${locArr[0].trim()}, ${locArr[1].trim()}`;

                    setFormData((prev: Jobs) => ({
                        ...prev,
                        location: locationString,
                        address: `${location.lat},${location.lng}`,
                    }));

                    setLocation(formattedAddress);
                } else {
                    console.error("No address found for this location.");
                }
            })
            .catch((error) => {
                console.error("Error during geocoding:", error);
            });
    };

    const checkGeolocationPermission = async () => {
        try {
            const result = await navigator.permissions.query({ name: "geolocation" });
            if (result.state === "denied") {
                setErrorMessage(
                    "Geolocation access denied. Please enable location permissions."
                );
                return false;
            }
            return true;
        } catch (error) {
            setErrorMessage("Error checking geolocation permissions.");
            return false;
        }
    };

    useEffect(() => {
        const initializeMap = async () => {
            // Ensure mapRef is available and API key is set
            if (!mapRef.current) {
                console.error("Map container is not available");
                return;
            }

            if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
                setErrorMessage("Google Maps API key is missing");
                return;
            }

            try {
                const loader = new Loader({
                    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
                    version: "quarterly",
                    libraries: ["places"]  // Add places library
                });

                // Ensure Google Maps libraries are loaded
                await loader.load();

                const { Map } = await loader.importLibrary("maps");
                const { Marker } = await loader.importLibrary("marker");

                if (!navigator.geolocation) {
                    setErrorMessage("Geolocation is not supported by this browser.");
                    return;
                }

                const hasPermission = await checkGeolocationPermission();
                if (!hasPermission) return;

                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        let userLocation: { lat: number; lng: number };
                        if (existingMap) {
                            const arrMap = existingMap.split(",");
                            userLocation = {
                                lat: parseFloat(arrMap[0]),
                                lng: parseFloat(arrMap[1]),
                            };
                        } else {
                            userLocation = {
                                lat: position.coords.latitude,
                                lng: position.coords.longitude,
                            };
                        }

                        setInitialLocation(userLocation);

                        const mapOptions: google.maps.MapOptions = {
                            center: userLocation,
                            zoom: 15,
                        };

                        // Add null check before initializing map
                        if (mapRef.current) {
                            const map = new Map(mapRef.current, mapOptions);

                            const userMarker = new Marker({
                                position: userLocation,
                                map: map,
                                title: "You are here",
                                draggable: true,
                            });

                            markerRef.current = userMarker;

                            userMarker.addListener("dragend", () => {
                                const newPosition = userMarker.getPosition();
                                if (newPosition) {
                                    const newLocation = newPosition.toJSON();
                                    reverseGeocode(newLocation);
                                }
                            });

                            await reverseGeocode(userLocation);
                            setIsMapLoaded(true);
                        }
                    },
                    (error) => {
                        console.error("Error getting current position:", error);
                        setErrorMessage(
                            "Failed to retrieve location. Please check your permissions or try again later."
                        );
                    },
                    {
                        enableHighAccuracy: true,
                        timeout: 10000,
                        maximumAge: 0,
                    }
                );
            } catch (error) {
                console.error("Error loading Google Maps:", error);
                setErrorMessage("Error initializing map. Please try again later.");
            }
        };

        initializeMap();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const resetToCurrentLocation = (e: React.MouseEvent) => {
        e.preventDefault();
        if (markerRef.current && initialLocation) {
            markerRef.current.setPosition(initialLocation);
            reverseGeocode(initialLocation);
        }
    };

    return {
        mapRef,
        location,
        errorMessage,
        isMapLoaded,
        resetToCurrentLocation,
    };
};