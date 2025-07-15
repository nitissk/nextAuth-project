import { getCountryByName } from "@/lib/api";
import CountryDetails from "@/components/CountryDetails";
import { notFound } from "next/navigation";

export default async function CountryPage({
  params,
}: {
  params: Promise<{ country: string }>;
}) {
  const { country } = await params;
  const countryName = country.toLowerCase();

  const countryData = await getCountryByName(countryName);

  if (!countryData) {
    notFound();
  }

  return <CountryDetails country={countryData} />;
}
