import { FaStar, FaCodeBranch } from 'react-icons/fa';

function RepoListCard({ repos }) {
  if (!repos || repos.length === 0) {
    return <p className="text-center mt-4">No repositories found.</p>;
  }

  return (
    <div className="grid w-1/2 m-auto gap-4 mt-6">
      <div className="my-5">
        <h1 className="text-medium text-[#34466b]">Top repositories </h1>
      </div>

      {repos.map((repo) => (
        <div
          key={repo.id}
          className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
        >
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 font-semibold text-lg hover:underline"
          >
            {repo.name}
          </a>
          <p className="text-gray-600 text-sm mt-1">
            {repo.description || 'No description'}
          </p>
          <div className="flex gap-4 mt-2 text-sm text-gray-700">
            <span className="flex items-center gap-1">
              <FaStar className="text-yellow-400" />
              {repo.stargazers_count}
            </span>
            <span className="flex items-center gap-1">
              <FaCodeBranch />
              {repo.forks_count}
            </span>
            <span className="ml-auto italic">{repo.language || 'Unknown'}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RepoListCard;
