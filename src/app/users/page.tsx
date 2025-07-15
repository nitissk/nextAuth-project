
'use client';

import { useState, useEffect } from 'react';
import { getAllUsers } from "@/lib/api";
import UserCard from "@/components/UserCard";
import { UserProfile } from '@/types/user'; 

export default function UserList() {
  const [allUsers, setAllUsers] = useState<UserProfile[]>([]); 
  const [filteredUsers, setFilteredUsers] = useState<UserProfile[]>([]); 
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(''); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        const sortedData = data.sort((a, b) => 
          a.name.localeCompare(b.name)
        );
        setAllUsers(sortedData);
        setFilteredUsers(sortedData);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const results = allUsers.filter(user =>
      user.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      user.username.toLowerCase().includes(lowerCaseSearchTerm) ||
      user.email.toLowerCase().includes(lowerCaseSearchTerm) ||
      user.address.city.toLowerCase().includes(lowerCaseSearchTerm) ||
      user.company.name.toLowerCase().includes(lowerCaseSearchTerm)
    );
    setFilteredUsers(results);
  }, [searchTerm, allUsers]); 

  if (loading) return <div className="flex justify-center items-center h-screen text-xl">Loading users...</div>;

  return (
    <div className="container mx-auto w-11/12 md:w-4/5 lg:w-3/4 xl:w-7/10 max-w-7xl px-4 py-2">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">User Directory</h1>
      
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search by name, username, email, city, or company..."
          className="w-full md:w-2/3 lg:w-1/2 p-3 border border-gray-300 rounded-lg shadow-sm
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     text-gray-800 placeholder-gray-500 text-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredUsers.length === 0 && !loading && (
        <div className="text-center text-gray-600 text-xl py-10">
          No users found matching your search.
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
        {filteredUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}