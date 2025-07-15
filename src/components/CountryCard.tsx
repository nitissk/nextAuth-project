"use client";

import { useRouter } from "next/navigation";
import { Country } from "@/types/country";

export default function CountryCard({ country }: { country: Country }) {
  const router = useRouter();

  const handleClick = () => {
    const slug = country.name.common.toLowerCase();
    router.push(`/country/${slug}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-gray-200"
    >
      <div className="w-full h-28 flex items-center justify-center p-1 bg-gray-50">
        <img
          src={country.flags.png}
          alt={`Flag of ${country.name.common}`}
          className="max-w-full max-h-full object-contain"
        />
      </div>
      <div className="p-3">
        <h3 className="text-base font-semibold text-gray-900 mb-1">
          {country.name.common}
        </h3>
        <p className="text-gray-700 text-sm mb-0.5">
          <strong className="font-medium">Capital:</strong>{" "}
          {country.capital?.[0] || "N/A"}
        </p>
        <p className="text-gray-700 text-sm">
          <strong className="font-medium">Population:</strong>{" "}
          {country.population.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
