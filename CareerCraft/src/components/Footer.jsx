import React from 'react';
export default function Footer(){
  return (
    <footer className="bg-light py-4 mt-5">
      <div className="container text-center">
        <small>© {new Date().getFullYear()} ResumeForge — Built with ❤️</small>
      </div>
    </footer>
  );
}
