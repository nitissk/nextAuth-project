import axios from "axios";
import { Country } from "@/types/country";
import { UserProfile } from "@/types/user";

const API_URL_COUNTRY = "https://restcountries.com/v3.1";
const API_URL_USER = "https://jsonplaceholder.typicode.com";

/*
! Get all countries with selected fields
 */
export async function getAllCountries(): Promise<Country[]> {
  try {
    const response = await axios.get(
      `${API_URL_COUNTRY}/all?fields=name,capital,population,flags,region`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching countries:", error);
    return [];
  }
}

/*
 ! Get a single country by full name
 */
export async function getCountryByName(name: string): Promise<Country | null> {
  try {
    const response = await axios.get(
      `${API_URL_COUNTRY}/name/${name}?fullText=true`
    );
    return response.data[0] || null;
  } catch (error) {
    console.error(`Error fetching country "${name}":`, error);
    return null;
  }
}

/*
! Get all users (mock from JSONPlaceholder)
 */
export async function getAllUsers(): Promise<UserProfile[]> {
  try {
    const response = await axios.get(`${API_URL_USER}/users`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}

/*
! Get a single user by username (manual filter)
 */
export async function getUserByName(
  username: string
): Promise<UserProfile | null> {
  try {
    const response = await axios.get(`${API_URL_USER}/users`);
    const users: UserProfile[] = response.data;
    const user = users.find(
      (u) => u.username.toLowerCase() === username.toLowerCase()
    );
    return user ?? null;
  } catch (error) {
    console.error(`Error fetching user "${username}":`, error);
    return null;
  }
}
