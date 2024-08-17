'use client';

import fetchWrapper from '@/utils/fetch/fetchWrapper';

const fetchPets = async (petId: number) => {
  const url = `/api/pets?petId=${petId}`;

  try {
    return await fetchWrapper(url);
  } catch (error) {
    return error;
  }
}

export const HomeCarousel = () => {
  return (
    <div></div>
  )
}
