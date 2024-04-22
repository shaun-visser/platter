const Home = () => {
  return (
    <main className="container my-10">
      <ul className="flex flex-col gap-5 text-blue underline">
        <li>
          <p>
            <a href="https://nextjs.org/" target="_blank">
              Next JS
            </a>
          </p>
        </li>
        <li>
          <p>
            <a href="https://tailwindcss.com/" target="_blank">
              Tailwind CSS
            </a>
          </p>
        </li>
        <li>
          <p>
            <a href="https://react.dev/" target="_blank">
              React JS
            </a>
          </p>
        </li>
      </ul>
    </main>
  );
};

export default Home;
