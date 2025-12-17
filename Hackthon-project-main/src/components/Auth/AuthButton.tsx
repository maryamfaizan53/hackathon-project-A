// frontend/src/components/Auth/AuthButton.tsx
import React, { useEffect, useState } from 'react';
import { authService } from '../../services/authService';
import { User } from '../../types/user';
import Link from '@docusaurus/Link';
import { useHistory } from '@docusaurus/router';

const AuthButton: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const checkAuthStatus = async () => {
      setIsLoading(true);

      // Add a timeout to prevent infinite loading
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Auth check timed out")), 5000)
      );

      try {
        const user = authService.getUser();
        if (user) {
          // Race between the API call and the timeout
          const verifiedUser = await Promise.race([
            authService.getMe(),
            timeoutPromise
          ]) as User;

          setCurrentUser(verifiedUser);
        } else {
          setCurrentUser(null);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        // If it was a timeout or error, we might want to clear the session or just show login
        if (error instanceof Error && error.message === "Auth check timed out") {
          console.warn("Backend not responding fast enough, showing login buttons");
        } else {
          authService.logout();
        }
        setCurrentUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();

    const handleStorageChange = () => {
      checkAuthStatus();
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
    setShowDropdown(false);
    history.push('/');
  };

  if (isLoading) {
    return (
      <div className="navbar__item" style={{
        padding: '6px 12px',
        color: 'var(--ifm-color-emphasis-600)'
      }}>
        ⏳ Loading...
      </div>
    );
  }

  return (
    <>
      {currentUser ? (
        <div style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          {/* User Info Button */}
          <button
            className="navbar__item"
            onClick={() => setShowDropdown(!showDropdown)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 12px',
              borderRadius: '6px',
              border: '1px solid var(--ifm-color-emphasis-300)',
              backgroundColor: 'var(--ifm-background-surface-color)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              fontWeight: 500,
              color: 'var(--ifm-font-color-base)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--ifm-color-emphasis-100)';
              e.currentTarget.style.borderColor = 'var(--ifm-color-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--ifm-background-surface-color)';
              e.currentTarget.style.borderColor = 'var(--ifm-color-emphasis-300)';
            }}
          >
            {/* User Avatar Circle */}
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: 'var(--ifm-color-primary)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: '14px'
            }}>
              {currentUser.name.charAt(0).toUpperCase()}
            </div>

            {/* Username */}
            <span style={{
              fontSize: '14px',
              maxWidth: '120px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              {currentUser.name}
            </span>

            {/* Dropdown Arrow */}
            <span style={{
              fontSize: '10px',
              transition: 'transform 0.2s ease',
              transform: showDropdown ? 'rotate(180deg)' : 'rotate(0deg)'
            }}>
              ▼
            </span>
          </button>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              marginTop: '8px',
              backgroundColor: 'var(--ifm-background-surface-color)',
              border: '1px solid var(--ifm-color-emphasis-300)',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              minWidth: '200px',
              zIndex: 1000,
              padding: '8px 0'
            }}>
              {/* User Info Section */}
              <div style={{
                padding: '12px 16px',
                borderBottom: '1px solid var(--ifm-color-emphasis-200)'
              }}>
                <div style={{
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: 'var(--ifm-font-color-base)',
                  marginBottom: '4px'
                }}>
                  {currentUser.name}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: 'var(--ifm-color-emphasis-600)'
                }}>
                  {currentUser.email}
                </div>
                <div style={{
                  fontSize: '11px',
                  color: 'var(--ifm-color-primary)',
                  marginTop: '6px',
                  padding: '4px 8px',
                  backgroundColor: 'var(--ifm-color-primary-lightest)',
                  borderRadius: '4px',
                  display: 'inline-block'
                }}>
                  Level: {currentUser.preferences.level}
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                style={{
                  width: '100%',
                  padding: '10px 16px',
                  border: 'none',
                  backgroundColor: 'transparent',
                  color: 'var(--ifm-color-danger)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '14px',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--ifm-color-danger-lightest)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <span>🚪</span>
                Logout
              </button>
            </div>
          )}

          {/* Overlay to close dropdown when clicking outside */}
          {showDropdown && (
            <div
              onClick={() => setShowDropdown(false)}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 999
              }}
            />
          )}
        </div>
      ) : (
        <div className="AuthButton-container">
          <Link
            className="AuthButton-btn AuthButton-login"
            to="/login"
          >
            Login
          </Link>
          <Link
            className="AuthButton-btn AuthButton-signup"
            to="/signup"
          >
            Sign Up
          </Link>
        </div>
      )}
    </>
  );
};

export default AuthButton;