const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-stone-800 text-stone-300 py-6 border-t border-stone-700">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 space-y-3 md:space-y-0">
        {/* left side */}
        <p className="text-sm">WeatherLink@{currentYear}  - all rights reserved</p>
        {/* right side social icons */}
        <div className="flex space-x-4 text-stone-400">
          <a
            className="hover:text-sky-400 transition"
            href="https://twitter.com"
            aria-label="Twitter" 
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-x-twitter fa-lg" />
          </a>
          <a
            className="hover:text-pink-400 transition"
            href="https://instagram.com"
            aria-label="Instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-instagram fa-lg" />
          </a>
          <a
            className="hover:text-gray300 transition"
            href="https://github.com"
            aria-label="GitHub"
            target="_blank"
            rel="noopener"
          >
            <i className="fa-brands fa-github fa-lg" />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer;