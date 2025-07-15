"use client";

import { useState, useEffect } from "react";
import { getAllCountries } from "../../lib/api";
import CountryCard from "../../components/CountryCard";
import { Country } from "@/types/country";

export default function CountryList() {
  const [allCountries, setAllCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await getAllCountries();
        const sortedData = data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        setAllCountries(sortedData);
        setFilteredCountries(sortedData);
      } catch (error) {
        console.error("Error fetching countries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const results = allCountries.filter(
      (country) =>
        country.name.common.toLowerCase().includes(lowerCaseSearchTerm) ||
        (country.capital &&
          country.capital[0]?.toLowerCase().includes(lowerCaseSearchTerm)) ||
        country.region.toLowerCase().includes(lowerCaseSearchTerm)
    );
    setFilteredCountries(results);
  }, [searchTerm, allCountries]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading countries...
      </div>
    );

  return (
    <div className="container mx-auto w-11/12 md:w-4/5 lg:w-3/4 xl:w-7/10 max-w-7xl px-4 py-2">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
        World Countries Directory
      </h1>

      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search by country, capital, or region..."
          className="w-full md:w-2/3 lg:w-1/2 p-3 border border-gray-300 rounded-lg shadow-sm
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     text-gray-800 placeholder-gray-500 text-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredCountries.length === 0 && !loading && (
        <div className="text-center text-gray-600 text-xl py-10">
          No countries found matching your search.
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
        {filteredCountries.map((country) => (
          <CountryCard key={country.name.common} country={country} />
        ))}
      </div>
    </div>
  );
}
