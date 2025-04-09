import { useState } from 'react';
import { useForm } from 'react-hook-form';
import MessageCard from './MessageCard';

function SearchBar() {
  const { register, handleSubmit } = useForm();
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [searchType, setSearchType] = useState(null); // 'profile' or 'repos'
  const [showOptions, setShowOptions] = useState(false);

  const handleResetState = () => {
    setShowError(false);
    setErrorMessage(null);
    setSearchType(null);
  };

  const fetchSearchResults = async (params) => {
    if (!searchType) {
      setShowError(true);
      setErrorMessage('Please choose a search option.');
      return;
    }

    const endpoint =
      searchType === 'profile'
        ? `https://api.github.com/users/${params.searchUser}`
        : `https://api.github.com/users/${params.searchUser}/repos`;

    try {
      const response = await fetch(endpoint, { method: 'GET' });

      if (!response.ok) {
        setShowError(true);
        setErrorMessage(response.statusText);
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      console.log(`#### Result for ${searchType}:`, result);
    } catch (error) {
      console.error('Failed to fetch profile:', error.message);
    }
  };

  return (
    <div className="relative">
      <MessageCard
        isVisible={showError}
        message={errorMessage || 'Error fetching GitHub info'}
        type="error"
        handleReset={handleResetState}
      />

      <form
        onSubmit={handleSubmit(fetchSearchResults)}
        className="max-w-md mx-auto"
      >
        <label htmlFor="default-search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <input
            type="search"
            id="default-search"
            name="searchUser"
            placeholder="Search GitHub profiles or repositories..."
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            {...register('searchUser', {
              required: 'Please enter a username.'
            })}
          />

          <button
            type="button"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2"
            onClick={() => setShowOptions(!showOptions)}
          >
            Search
          </button>

          {showOptions && (
            <div className="absolute font-light text-sm z-10 right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
              <button
                type="submit"
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => setSearchType('profile')}
              >
                Search User Profile
              </button>
              <button
                type="submit"
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => setSearchType('repos')}
              >
                Search Repositories
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
