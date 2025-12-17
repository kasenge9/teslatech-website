import Image from 'next/image'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="bg-blue-800 text-white py-20 text-center">
        <h1 className="text-5xl font-bold mb-4">TeslaTech Investments</h1>
        <p className="text-xl max-w-2xl mx-auto mb-6">
          Electrical & Technological Innovations by Eng. Brian Mwendwa
        </p>
        <a
          href="#services"
          className="px-8 py-3 bg-yellow-400 text-blue-800 font-semibold rounded-lg hover:bg-yellow-500 transition"
        >
          Explore Our Services
        </a>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 text-center">
        <h2 className="text-4xl font-bold mb-10 text-blue-800">Our Electrical & Tech Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold mb-2">Electrical Installations</h3>
            <p>
              Safe and modern electrical wiring, home automation, and power solutions for businesses
              and residences.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold mb-2">Renewable Energy</h3>
            <p>
              Solar and hybrid energy systems, biogas integration, and sustainable power
              solutions for the future.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold mb-2">Tech Consultation</h3>
            <p>
              Smart home systems, IoT integration, and electrical innovation consulting for
              startups and enterprises.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-100 px-4 text-center">
        <h2 className="text-4xl font-bold mb-6 text-blue-800">About Eng. Brian Mwendwa</h2>
        <p className="max-w-3xl mx-auto text-lg">
          Eng. Brian Mwendwa is a visionary electrical and electronic engineer committed to
          providing innovative technology solutions. TeslaTech Investments focuses on delivering
          cutting-edge electrical installations, renewable energy solutions, and tech-driven
          consultancy services across Kenya.
        </p>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 text-center">
        <h2 className="text-4xl font-bold mb-6 text-blue-800">Contact Us</h2>
        <p className="mb-4">Email: info@teslatech.co.ke</p>
        <p className="mb-4">Phone: +254 700 000 000</p>
        <a
          href="mailto:info@teslatech.co.ke"
          className="px-6 py-3 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition"
        >
          Send Email
        </a>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-6 text-center">
        <p>&copy; {new Date().getFullYear()} TeslaTech Investments. All rights reserved.</p>
        <p>Electrical & Tech Innovations by Eng. Brian Mwendwa</p>
      </footer>
    </main>
  )
}


