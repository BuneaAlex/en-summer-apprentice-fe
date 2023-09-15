import React from 'react';
import './styling/MainNavBar.css'

export const MainNavBar = () => {
    return ( 
        <div>
            <nav className="container mx-auto px-4 py-2 flex items-center justify-between">
				<div>
					<a href="/" aria-label="Go to home page" className="text-white font-bold text-2xl">
						<img className="logo" src="assets/logo.png" alt="app logo"/>
					</a>
				</div>

				<div className="md:flex">
					<ul className="flex space-x-4">
					  <li>
						<a href="/home" className="text-[#de411b] hover:text-black text-lg font-bold link-item">Home</a>
					  </li>
					  <li>
						<a href="/orders" className="text-[#de411b] hover:text-black text-lg font-bold link-item">Orders</a>
					  </li>
					  <li>
						<button className="logout-button text-[#de411b] hover:text-black text-lg font-bold link-item">
						  Logout
						</button>
					  </li>
					</ul>
				</div>
				  
				<div className="w-16 flex justify-end pr-2">
					<div className="md:hidden">
						<button
							type="button"
							className="text-gray-700 hover:text-blue-950 focus:outline-none focus:text-blue-950"
							id="mobileMenuBtn"
							aria-label="mobile menu">
							<i className="fa-solid fa-bars text-xl"></i>
						</button>
					</div>
				</div>
			</nav>
			<div className="md:hidden hidden" id="mobileMenu">
				<ul className="bg-gray-700 rounded-md text-white">
					<li>
						<a href="/home" className="block px-4 py-2 hover:bg-gray-600"
>Home</a>
					</li>
					<li>
						<a href="/orders" className="block px-4 py-2 hover:bg-gray-600">Orders</a>
					</li>
					<li>
						<button className="logout-button text-left block px-4 py-2 hover:bg-gray-600 w-full">
							Logout
						</button>
					</li>
				</ul>
			</div>
			
        </div>
        
    );
}
 