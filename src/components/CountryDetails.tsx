"use client";

import Link from "next/link";
import { Country } from "@/types/country";

export default function CountryDetails({ country }: { country: Country }) {
  if (!country) {
    return (
      <div className="flex justify-center items-center min-h-screen text-xl text-gray-700">
        Country data not found.
      </div>
    );
  }

  const getCurrencyDisplay = (currencies?: Record<string, any>) => {
    if (!currencies) return "N/A";
    const key = Object.keys(currencies)[0];
    const currency = currencies[key];
    return `${currency.name} (${currency.symbol || key})`;
  };

  const getLanguageDisplay = (languages?: Record<string, string>) => {
    return languages ? Object.values(languages).join(", ") : "N/A";
  };

  return (
    <div className="min-h-[calc(100vh-60px)] bg-gray-50 pt-28 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8">
        <Link
          href="/countries"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-6 font-medium"
        >
          <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          Back to all countries
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Flag Section */}
          <div className="flex justify-center items-center bg-gray-100 rounded-lg p-4">
            <img
              src={country.flags.svg}
              alt={`Flag of ${country.name.common}`}
              className="max-w-full max-h-80 object-contain rounded-md"
            />
          </div>

          {/* Details Section */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {country.name.official}
            </h1>
            <h2 className="text-xl font-semibold text-gray-600 mb-4">
              {country.name.common}
            </h2>

            <div className="space-y-2 text-gray-700 text-sm">
              <p>
                <strong>Capital:</strong> {country.capital?.[0] || "N/A"}
              </p>
              <p>
                <strong>Population:</strong>{" "}
                {country.population.toLocaleString()}
              </p>
              <p>
                <strong>Region:</strong> {country.region}
              </p>
              {country.subregion && (
                <p>
                  <strong>Subregion:</strong> {country.subregion}
                </p>
              )}
              <p>
                <strong>Area:</strong> {country.area.toLocaleString()} km²
              </p>
              <p>
                <strong>Continents:</strong> {country.continents.join(", ")}
              </p>
              <p>
                <strong>Languages:</strong>{" "}
                {getLanguageDisplay(country.languages)}
              </p>
              <p>
                <strong>Currency:</strong>{" "}
                {getCurrencyDisplay(country.currencies)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
