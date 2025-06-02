import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-gray-300 py-6 mt-12">
            <div className="container mx-auto px-4 text-center">
                <p>&copy; {new Date().getFullYear()} Dev Match. All rights reserved.</p>
                <div className="mt-2">
                    <a href="#" className="mx-2 hover:text-white">Privacy Policy</a>
                    <a href="#" className="mx-2 hover:text-white">Terms of Service</a>
                    <a href="#" className="mx-2 hover:text-white">Contact</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
