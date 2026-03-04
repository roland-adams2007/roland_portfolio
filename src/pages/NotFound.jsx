import { Helmet } from "react-helmet-async";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";

function NotFound() {
    return (
        <>
            <Helmet>
                <title>404 | Page Not Found - Roland Adams</title>
                <meta
                    name="description"
                    content="The page you're looking for doesn't exist. Return to Roland Adams' portfolio homepage."
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500;600;700;800&display=swap"
                    rel="stylesheet"
                />
            </Helmet>


            <main>
                <div className="not-found-container text-center font-['Urbanist'] py-20">
                    <h1 className="not-found-title text-7xl font-extrabold">404</h1>
                    <p className="not-found-message mt-4 text-gray-600 text-lg">
                        Oops! The page you're looking for doesn't exist.
                    </p>
                    <Link
                        to="/"
                        className="not-found-button mt-6 inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow hover:bg-indigo-700 transition"
                    >
                        <Home size={20} />
                        Go Back Home
                    </Link>
                </div>
            </main>

        </>
    );
}

export default NotFound;
