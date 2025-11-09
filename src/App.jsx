import "./App.css";

function App() {
  const projects = [
    {
      title: "AnuVeekshi",
      desc: "AnuVeekshi is a Public Affairs Intelligence AI system analyzing political promises, government schemes, and outcomes using LangGraph and RAG pipelines.",
      link: "https://anuveekshi.com/",
    },
  ];

  return (
    <>
      <div className="bg-white text-gray-900 font-sans min-h-screen flex flex-col items-center">
        {/* --- Hero Section --- */}
        <section className="flex flex-col items-center text-center py-16 px-4">
          <img
            src="/copy.jpg"
            alt="Avinash Palakurthi"
            className="w-60 h-60 rounded-full object-cover mb-6 shadow-md"
          />
          <h1 className="text-3xl font-bold mb-2">Hi, I’m Avinash 👋</h1>
          <p className="text-gray-600 mb-4">
            Building Agentic AI Systems with LangGraph | Creator of AnuVeekshi
          </p>

          {/* ✅ About Me Section */}
          <p className="text-gray-700 max-w-2xl text-center mt-4 leading-relaxed">
            I'm an independent AI developer passionate about building agentic
            systems using
            <span className="font-semibold"> LangGraph</span> and
            retrieval-augmented generation (RAG). My current focus is{" "}
            <a
              href="https://anuveekshi.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline font-medium"
            >
              AnuVeekshi
            </a>{" "}
            — a Public Affairs Intelligence platform that analyzes political
            promises, government schemes, and policy outcomes through structured
            AI reasoning.
          </p>

          <a
            href="/avinash_resume.pdf"
            download
            className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition mt-6"
          >
            Download Resume
          </a>
        </section>

        {/* --- Projects Section --- */}
        <section className="py-12 px-6 max-w-3xl w-full">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            My Project
          </h2>
          {projects.map((p, index) => (
            <div
              key={index}
              className="border rounded-xl p-5 shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-lg font-bold mb-2">{p.title}</h3>
              <p className="text-gray-600 mb-3">{p.desc}</p>
              <a
                href={p.link}
                className="text-blue-600 font-medium hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit AnuVeekshi →
              </a>
            </div>
          ))}
        </section>

        {/* --- Footer --- */}
        <footer className="text-center text-gray-500 text-sm py-6">
          © {new Date().getFullYear()} Avinash Palakurthi | AnuVeekshi Project
        </footer>
      </div>
    </>
  );
}

export default App;
