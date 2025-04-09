import SearchBar from '../components/SearchBar';

function Home() {
  return (
    <div>
      <div className="my-20">
        <h1 className="text-medium text-[#34466b]">
          GitHub Profile Viewer for Recruiters
        </h1>
      </div>
      <SearchBar />
    </div>
  );
}

export default Home;
