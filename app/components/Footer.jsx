import React from 'react';
import logo from '/public/assets/lws-kitchen.png'
import Image from 'next/image';

const Footer = () => {
    return (
        <footer className="bg-gray-100 py-8">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-8">
                    <div>
                        <a href="/index.html" className="text-3xl font-bold">
                            <Image src={logo} className="w-24" alt='logo' />
                        </a>
                        <p className="text-gray-600 mt-2 text-sm">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">LWS Kitchen</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-600 hover:text-orange-500">About us</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-orange-500">Careers</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-orange-500">Contact us</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-orange-500">Feedback</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-600 hover:text-orange-500">Terms</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-orange-500">Conditions</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-orange-500">Cookies</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-orange-500">Copyright</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Follow</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-600 hover:text-orange-500">Facebook</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-orange-500">Twitter</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-orange-500">Instagram</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-orange-500">Youtube</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;