

export default function Home() {
  return (
    <main className="min-h-[calc(100vh-60px)] flex flex-col items-center justify-center bg-gray-100 text-center px-6 py-20">
      <div className="max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6">
          Welcome to MyApp 🌍
        </h1>
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          This is a modern web application built with <span className="font-medium text-gray-800">Next.js</span>, 
          <span className="font-medium text-gray-800"> Tailwind CSS</span>, and 
          <span className="font-medium text-gray-800"> NextAuth</span> for authentication. <br />
          It allows you to explore user and country data using clean, responsive designs and dynamic routing.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="/users"
            className="px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition"
          >
            View Users
          </a>
          <a
            href="/countries"
            className="px-6 py-3 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 transition"
          >
            Explore Countries
          </a>
        </div>
      </div>
    </main>
  );
}


// nextauth | SSR | CSR | ISR | SSG |
// () | [] 

// countries => cards |  card detail => SSR (filter) =>
// users => CSR (Axios)

// header => 

// middleware