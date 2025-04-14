const Footer = () => {
  return (
    <footer className="px-10 mx-10">
      <div className="flex border-2 rounded-lg my-4 w-full place-content-between space-x-8 px-8 py-4">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Kacper <span className="font-semibold">"DScraftPL"</span> Wiącek. All rights reserved.
        </p>
        <a href="https://github.com/DScraftPL" target="_blank" rel="noopener noreferrer">
          <img src="public/assets/github-mark.svg" alt="GitHub Logo" className="w-5 h-5" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;