import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFetchArtistDetails } from '../../../hooks/useArtistQuery';

const ArtistDetailPage = () => {
  const params = useParams();
  const userId = params.id;
  const { data: artistDetails, isLoading, isError } = useFetchArtistDetails(Number(userId));
  useEffect(() => {
    console.log('id:', userId);
  }, [userId]);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching artist details.</div>;
  }

  return (
    <div>
      <h2>{artistDetails?.title}</h2>
      <p>Artist: {artistDetails?.artist}</p>
      <p>Location: {artistDetails?.location}</p>
      <p>Field: {artistDetails?.field}</p>
      {/* Add other details you want to display */}
    </div>
  );
};

export default ArtistDetailPage;
