"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { AlertCircle, Loader2 } from "lucide-react";

interface MapModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onCoordinatesSelect?: (coordinates: { lat: number; lng: number }) => void;
    initialUrl?: string;
}

const defaultCenter = {
    lat: 13.611617900521134, // Assumption University coordinates
    lng: 100.83534157630517,
};

const MapModal: React.FC<MapModalProps> = ({
    open,
    onOpenChange,
    onCoordinatesSelect,
    initialUrl = "",
}) => {
    const [mapUrl, setMapUrl] = useState(initialUrl);
    const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Google Maps API key from environment variables
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

    useEffect(() => {
        // Reset state when modal opens
        if (open) {
            setMapUrl(initialUrl);
            if (initialUrl) {
                fetchCoordinates(initialUrl);
            } else {
                setCoordinates(null);
            }
            setError(null);
        }
    }, [open, initialUrl]);

    const fetchCoordinates = async (url: string) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `/api/map?url=${encodeURIComponent(url)}`
            );
            const data = await response.json();

            if (data.success && data.coordinates) {
                setCoordinates(data.coordinates);
            } else {
                setError(data.error || "Failed to extract coordinates");
            }
        } catch (err) {
            setError("An error occurred while fetching map data");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (mapUrl) {
            fetchCoordinates(mapUrl);
        }
    };

    const handleSelectLocation = () => {
        if (coordinates && onCoordinatesSelect) {
            onCoordinatesSelect(coordinates);
            onOpenChange(false);
        }
    };

    const containerStyle = {
        width: "100%",
        height: "600px",
    };

    return (
        <div>
            {error && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            <div className="border rounded-md overflow-hidden h-[600px]">
                {apiKey ? (
                    <LoadScript googleMapsApiKey={apiKey}>
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={coordinates || defaultCenter}
                            zoom={coordinates ? 16 : 14}
                        >
                            {coordinates && (
                                <Marker position={coordinates} />
                            )}
                        </GoogleMap>
                    </LoadScript>
                ) : (
                    <div className="flex items-center justify-center h-full bg-gray-100 p-4">
                        <p className="text-center text-gray-500">
                            Google Maps API key not found.<br />
                            Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your environment variables.
                        </p>
                    </div>
                )}
            </div>

            <div className="flex justify-end gap-2 mt-4">
                <Button
                    onClick={handleSelectLocation}
                    disabled={!coordinates}
                >
                    Use This Location
                </Button>
            </div>
        </div>
    );
};

export default MapModal;