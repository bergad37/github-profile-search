import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import MessageCard from './MessageCard';
import UserProfileCard from './UserProfileCard';
import RepoListCard from './RepositoryListCard';

function SearchBar() {
  const { register, handleSubmit } = useForm();
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [searchType, setSearchType] = useState(null); // 'profile' or 'repos'
  const [showOptions, setShowOptions] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [data, setData] = useState(null);

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

    const username = params.searchUser.trim();
    const endpoint =
      searchType === 'profile'
        ? `https://api.github.com/users/${username}`
        : `https://api.github.com/users/${username}/repos`;

    try {
      const response = await fetch(endpoint);

      if (!response.ok) {
        setShowError(true);
        setErrorMessage('User not found or error fetching data.');
        setData(null);
        return;
      }

      const result = await response.json();

      if (searchType === 'repos') {
        // Sort by stars and limit to top 5
        const sorted = result
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
          .slice(0, 5);
        setData(sorted);
      } else {
        setData(result);
      }

      setShowError(false);
    } catch (error) {
      console.error('Failed to fetch data:', error.message);
      setShowError(true);
      setErrorMessage('Something went wrong. Try again later.');
    }
  };

  useEffect(() => {
    setUserProfile(data);
  }, [data]);

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
            className="block w-full p-4 ps-10 text-sm text-gray-900 border-[1px] border-gray-300 rounded-lg bg-gray-50 focus:border-transparent focus:ring-0 focus:border-[1px]"
            {...register('searchUser', {
              required: 'Please enter a username.'
            })}
          />

          <button
            type="button"
            className=" flex text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2"
            onClick={() => setShowOptions(!showOptions)}
          >
            <p>Search</p>
            {/* <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-white" /> */}
          </button>

          {showOptions && (
            <div className="absolute font-light text-sm z-10 right-0 mt-1 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
              <button
                type="submit"
                className="flex w-full text-left text-brand-600 px-4 py-2 hover:bg-gray-100 space-x-2"
                onClick={() => setSearchType('profile')}
              >
                <p> Search User Profile </p>
              </button>
              <button
                type="submit"
                className="block w-full text-left px-4 text-brand-600 py-2 hover:bg-gray-100"
                onClick={() => setSearchType('repos')}
              >
                <p> Search Repositories</p>
              </button>
            </div>
          )}
        </div>
      </form>
      {userProfile && searchType === 'profile' && (
        <UserProfileCard user={userProfile} />
      )}{' '}
      {searchType === 'repos' && data && <RepoListCard repos={data} />}
    </div>
  );
}

export default SearchBar;
