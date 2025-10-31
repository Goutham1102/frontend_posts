import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'All Posts' },
    { path: '/add', label: 'Add Post' },
    { path: '/calendar', label: 'Calendar' }
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header style={{
      borderBottom: '1px solid #eee',
      background: '#fff',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px 20px 0'
      }}>
        <div style={{
          marginBottom: '16px'
        }}>
          <h1 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#000',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
          }}>
            Social Media Scheduler
          </h1>
        </div>

        <nav>
          <ul style={{
            display: 'flex',
            gap: '24px',
            listStyle: 'none',
            margin: 0,
            padding: 0
          }}>
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  style={{
                    display: 'inline-block',
                    fontSize: '14px',
                    color: isActive(link.path) ? '#000' : '#666',
                    textDecoration: 'none',
                    paddingBottom: '16px',
                    borderBottom: isActive(link.path) ? '2px solid #000' : '2px solid transparent',
                    fontWeight: isActive(link.path) ? '500' : '400',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;