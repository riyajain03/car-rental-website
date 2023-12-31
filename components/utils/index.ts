import { CarProps, FilterProps } from "@/types";
import { type } from "os";

export async function fetchCars( filters: FilterProps ) {
const {manufacturer,year, model, limit, fuel} = filters;

  const headers = {
    "X-RapidAPI-key": "fc649b7088mshcabc048765cd404p10ef2fjsn17323e518a1c",
    "X-rapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
  };

  const response = await fetch(
    `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year = ${year} &model=${model} &limit=${limit}
    &fuel_type=${fuel}`,
    {
      headers: headers,
    }
  );

  const result = await response.json();

  return result;
}

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50;

  const mileageFactor = 0.1;
  const ageFactor = 0.05;

  const mileageRate = city_mpg * mileageFactor;

  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  const url = new URL('https://cdn.imagin.studio/getimage');
  // const url = new URL()

const {make, year, model} = car;
url.searchParams.append('customer', 'hrjavascript-mastery')
// url.searchParams.append('customer', process.env.NEXT_PUBLIC_IMAGIN_API_KEY || '');
url.searchParams.append('make',make);
url.searchParams.append('modelFamily',model.split('')[0]);
url.searchParams.append('zoomType','fullscreen');
url.searchParams.append('modelYear',`${year}`);
url.searchParams.append('angle',`${angle}`);

return `${url}`;


}

export const updateSearchParams = (type: string, value: string) => {
  // Get the current URL search params
  const searchParams = new URLSearchParams(window.location.search);

  // Set the specified search parameter to the given value
  searchParams.set(type, value);

  // Set the specified search parameter to the given value
  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathname;
};
