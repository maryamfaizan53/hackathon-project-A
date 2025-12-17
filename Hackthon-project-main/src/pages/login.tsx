// frontend/src/pages/login.tsx
import React, { useState } from 'react';
import { LoginData } from '../types/user';
import Layout from '@theme/Layout';
import { authService } from '../services/authService';

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<LoginData>({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError(null);
      await authService.login(formData);
      // Redirect to home page after successful login
      window.location.href = '/';
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const inputContainerStyle: React.CSSProperties = {
    position: 'relative',
    marginBottom: '24px'
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px 48px 14px 16px',
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    border: '2px solid rgba(148, 163, 184, 0.2)',
    borderRadius: '12px',
    color: '#ffffff',
    fontSize: '15px',
    transition: 'all 0.3s ease',
    outline: 'none',
    fontWeight: '400'
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: '10px',
    color: '#e2e8f0',
    fontSize: '14px',
    fontWeight: '600',
    letterSpacing: '0.3px'
  };

  const iconStyle: React.CSSProperties = {
    position: 'absolute',
    right: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '18px',
    cursor: 'pointer',
    userSelect: 'none',
    transition: 'transform 0.2s ease'
  };

  return (
    <Layout title="Login" description="Login to access your personalized content">
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{
          maxWidth: '440px',
          width: '100%',
          padding: '48px 40px',
          background: 'rgba(30, 41, 59, 0.8)',
          borderRadius: '24px',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(148, 163, 184, 0.1)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h1 style={{
              fontSize: '32px',
              fontWeight: '800',
              background: 'linear-gradient(135deg, #dc2626 0%, #f87171 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '12px',
              letterSpacing: '-0.5px'
            }}>
              Welcome Back! 👋
            </h1>
            <p style={{
              color: '#94a3b8',
              fontSize: '15px',
              fontWeight: '400'
            }}>
              Sign in to continue your learning journey
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {error && (
              <div style={{
                padding: '14px 18px',
                backgroundColor: 'rgba(127, 29, 29, 0.3)',
                border: '1px solid rgba(220, 38, 38, 0.5)',
                borderRadius: '12px',
                color: '#fecaca',
                marginBottom: '24px',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                backdropFilter: 'blur(10px)',
                animation: 'slideIn 0.3s ease'
              }}>
                <span style={{ fontSize: '20px' }}>⚠️</span>
                <span style={{ flex: 1 }}>{error}</span>
              </div>
            )}

            {/* Email */}
            <div style={inputContainerStyle}>
              <label style={labelStyle}>
                <span style={{ marginRight: '6px' }}>📧</span>
                Email Address
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                style={{
                  ...inputStyle,
                  borderColor: focusedField === 'email'
                    ? '#dc2626'
                    : formData.email
                      ? 'rgba(148, 163, 184, 0.4)'
                      : 'rgba(148, 163, 184, 0.2)',
                  boxShadow: focusedField === 'email'
                    ? '0 0 0 3px rgba(220, 38, 38, 0.1)'
                    : 'none'
                }}
                placeholder="john@example.com"
                autoComplete="email"
              />
              {formData.email && (
                <div style={{
                  ...iconStyle,
                  color: '#10b981'
                }}>
                  ✓
                </div>
              )}
            </div>

            {/* Password */}
            <div style={inputContainerStyle}>
              <label style={labelStyle}>
                <span style={{ marginRight: '6px' }}>🔒</span>
                Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                style={{
                  ...inputStyle,
                  borderColor: focusedField === 'password'
                    ? '#dc2626'
                    : formData.password
                      ? 'rgba(148, 163, 184, 0.4)'
                      : 'rgba(148, 163, 184, 0.2)',
                  boxShadow: focusedField === 'password'
                    ? '0 0 0 3px rgba(220, 38, 38, 0.1)'
                    : 'none'
                }}
                placeholder="Enter your password"
                autoComplete="current-password"
              />
              <div
                style={{
                  ...iconStyle,
                  color: showPassword ? '#dc2626' : '#64748b'
                }}
                onClick={() => setShowPassword(!showPassword)}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(-50%) scale(1)'}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '16px',
                background: isLoading
                  ? 'linear-gradient(135deg, #7f1d1d 0%, #991b1b 100%)'
                  : 'linear-gradient(135deg, #dc2626 0%, #b91c1c 50%, #991b1b 100%)',
                border: 'none',
                borderRadius: '12px',
                color: '#ffffff',
                fontSize: '16px',
                fontWeight: '700',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: isLoading
                  ? 'none'
                  : '0 10px 30px rgba(220, 38, 38, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                position: 'relative',
                overflow: 'hidden',
                letterSpacing: '0.5px',
                textTransform: 'uppercase'
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(220, 38, 38, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(220, 38, 38, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
              }}
            >
              {isLoading ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                  <span style={{ animation: 'spin 1s linear infinite' }}>⏳</span>
                  Signing In...
                </span>
              ) : (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                  <span>🚀</span>
                  Sign In
                </span>
              )}
            </button>

            <style>{`
              @keyframes slideIn {
                from {
                  opacity: 0;
                  transform: translateY(-10px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
              
              @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
            `}</style>
          </form>

          <div style={{
            marginTop: '28px',
            textAlign: 'center',
            color: '#94a3b8',
            fontSize: '14px'
          }}>
            Don't have an account?{' '}
            <a
              href="/signup"
              style={{
                color: '#dc2626',
                textDecoration: 'none',
                fontWeight: '600',
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#f87171'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#dc2626'}
            >
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;