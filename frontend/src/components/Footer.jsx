import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-t-gray-300 py-4 mx-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 md:block flex flex-col items-center justify-center">
            <h2 className="md:text-xl font-bold text-lg">Job Hunt</h2>
            <p className="md:text-sm text-xs">© 2025 Your Company. All rights reserved.</p>
          </div>

          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="https://www.linkedin.com/in/prasenjit-das-jucse2025/" className="hover:text-gray-400">
              <img
                src="https://www.svgrepo.com/show/521725/linkedin.svg"
                alt="linkedin icon"
                className="md:w-6 md:h-6 w-5 h-5"
              />
            </a>
            <a href="https://github.com/Prasenjit20000" className="hover:text-gray-400">
              <img
                src="https://www.svgrepo.com/show/512317/github-142.svg"
                alt="github icon"
                className="md:w-6 md:h-6 w-5 h-5"
              />
            </a>
            <a href="https://leetcode.com/u/PRASENJIT_6290/" className="hover:text-gray-400">
              <img
                src="https://www.svgrepo.com/show/341985/leetcode.svg"
                alt="leetcode icon"
                className="md:w-6 md:h-6 w-5 h-5"
              />
            </a>
            
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;