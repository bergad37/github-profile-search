function UserProfileCard({ user }) {
  if (!user) return null;

  return (
    <div className="max-w-md mx-auto mt-8 bg-white shadow-xl rounded-xl overflow-hidden">
      <div className="p-6 flex flex-col items-center text-center">
        <img
          src={user.avatar_url}
          alt="Avatar"
          className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-md"
        />
        <h2 className="mt-4 text-xl font-semibold text-gray-800">
          {user.name || 'User'}
        </h2>
        <p className="text-sm text-gray-500">@{user.login}</p>
        {user.location && (
          <p className="text-sm mt-1 text-gray-600">{user.location}</p>
        )}
        {user.bio && (
          <p className="text-sm mt-3 text-gray-700 italic px-4">“{user.bio}”</p>
        )}

        <div className="flex justify-center gap-6 mt-4 text-sm text-gray-700">
          <div className="text-center">
            <p className="font-bold">{user.followers}</p>
            <p>Followers</p>
          </div>
          <div className="text-center">
            <p className="font-bold">{user.following}</p>
            <p>Following</p>
          </div>
        </div>

        <a
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md shadow"
        >
          View GitHub Profile
        </a>
      </div>
    </div>
  );
}

export default UserProfileCard;
