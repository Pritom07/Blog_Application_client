export const dynamic = "force-dynamic";
const aboutPage = async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return (
    <div>
      <div className="bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl font-bold mb-6">About Us</h1>
          <p className="text-lg text-gray-600">
            Welcome to our platform! We specialize in creating modern, fast, and
            scalable web applications that help businesses grow and succeed in
            the digital world.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-8">
        <div className="p-6 border rounded-xl shadow-sm">
          <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
          <p className="text-gray-600">
            Our mission is to deliver high-quality software solutions using
            modern technologies like Next.js, React, and Node.js while ensuring
            performance, scalability, and great user experience.
          </p>
        </div>

        <div className="p-6 border rounded-xl shadow-sm">
          <h2 className="text-2xl font-semibold mb-3">Our Vision</h2>
          <p className="text-gray-600">
            We envision a future where technology simplifies life and empowers
            businesses to achieve their goals efficiently with smart digital
            solutions.
          </p>
        </div>
      </div>

      <div className="bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <h2 className="text-3xl font-bold text-center mb-10">
            What We Provide
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 border rounded-xl bg-white shadow-sm">
              <h3 className="font-semibold text-lg mb-2">Web Development</h3>
              <p className="text-gray-600">
                Modern responsive websites and applications using the latest
                frameworks and technologies.
              </p>
            </div>

            <div className="p-6 border rounded-xl bg-white shadow-sm">
              <h3 className="font-semibold text-lg mb-2">UI/UX Design</h3>
              <p className="text-gray-600">
                Clean, user-friendly interface design focused on usability and
                great user experience.
              </p>
            </div>

            <div className="p-6 border rounded-xl bg-white shadow-sm">
              <h3 className="font-semibold text-lg mb-2">Backend Solutions</h3>
              <p className="text-gray-600">
                Secure and scalable backend systems with database integration
                and API development.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default aboutPage;
