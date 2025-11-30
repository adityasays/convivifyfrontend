// src/layout/AppLayout.jsx
import React from 'react';
import Navbar from '../components/navbar'
import Footer from '../components/footer';

export default function AppLayout({ children, hideNavFooter = false }) {
  return (
    <>
      {!hideNavFooter && <Navbar />}
      <main>{children}</main>
      {!hideNavFooter && <Footer />}
    </>
  );
}