'use client';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100">
      <header className="bg-white shadow">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-3xl font-bold text-indigo-600">IdeaBridge</h1>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <section className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to IdeaBridge
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Connecting ideas, building bridges, creating innovation
          </p>
          <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
            Get Started
          </button>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Collaborate</h3>
            <p className="text-gray-600">
              Work together with teams to bring ideas to life
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Innovate</h3>
            <p className="text-gray-600">
              Transform your concepts into reality with our tools
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Connect</h3>
            <p className="text-gray-600">
              Build meaningful connections with innovators worldwide
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}