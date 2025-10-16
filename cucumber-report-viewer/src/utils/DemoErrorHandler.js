// Demo-specific error handling and validation
import { demoConfig } from '@/config/demo.js';

class DemoErrorHandler {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.setupGlobalErrorHandling();
  }

  setupGlobalErrorHandling() {
    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled promise rejection:', event.reason);
      this.logError('Promise Rejection', event.reason);
      
      // Prevent default browser error handling in demo
      if (demoConfig.features.showDemoNotifications) {
        event.preventDefault();
        this.showUserFriendlyError('Something went wrong. Please refresh the page or try again.');
      }
    });

    // Handle JavaScript errors
    window.addEventListener('error', (event) => {
      console.error('JavaScript error:', event.error);
      this.logError('JavaScript Error', event.error);
      
      if (demoConfig.features.showDemoNotifications) {
        this.showUserFriendlyError('An unexpected error occurred. The demo will continue to work.');
      }
    });
  }

  logError(type, error) {
    const errorInfo = {
      type,
      message: error?.message || error,
      stack: error?.stack,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent
    };
    
    this.errors.push(errorInfo);
    
    // In demo mode, don't send errors to external services
    if (process.env.NODE_ENV === 'development') {
      console.group(`🚨 Demo Error: ${type}`);
      console.error('Error:', error);
      console.info('Error Info:', errorInfo);
      console.groupEnd();
    }
  }

  logWarning(type, message) {
    const warningInfo = {
      type,
      message,
      timestamp: new Date().toISOString(),
      url: window.location.href
    };
    
    this.warnings.push(warningInfo);
    
    if (process.env.NODE_ENV === 'development') {
      console.warn(`⚠️ Demo Warning: ${type}`, message);
    }
  }

  showUserFriendlyError(message) {
    // Create a simple toast notification for demo
    const toast = document.createElement('div');
    toast.className = 'demo-error-toast';
    toast.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        right: 20px;
        background: #f44336;
        color: white;
        padding: 12px 16px;
        border-radius: 4px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        z-index: 9999;
        max-width: 300px;
        font-family: inherit;
        font-size: 14px;
      ">
        ${message}
        <button onclick="this.parentElement.remove()" style="
          background: none;
          border: none;
          color: white;
          float: right;
          margin-left: 8px;
          cursor: pointer;
        ">×</button>
      </div>
    `;
    
    document.body.appendChild(toast);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (toast.parentElement) {
        toast.remove();
      }
    }, 5000);
  }

  // Validate demo data loading
  async validateDemoData() {
    try {
      const response = await fetch('/TestResultsJsons/index.json');
      if (!response.ok) {
        throw new Error(`Failed to load demo data index: ${response.status}`);
      }
      
      const index = await response.json();
      if (!Array.isArray(index) || index.length === 0) {
        throw new Error('Demo data index is empty or invalid');
      }
      
      // Validate each report file exists
      const validationPromises = index.map(async (report) => {
        try {
          const reportResponse = await fetch(`/TestResultsJsons/${report.filename}`);
          if (!reportResponse.ok) {
            this.logWarning('Missing Demo Data', `Report file not found: ${report.filename}`);
            return false;
          }
          return true;
        } catch (error) {
          this.logWarning('Demo Data Validation', `Failed to validate ${report.filename}: ${error.message}`);
          return false;
        }
      });
      
      const results = await Promise.all(validationPromises);
      const validCount = results.filter(Boolean).length;
      
      if (validCount === 0) {
        throw new Error('No valid demo data files found');
      }
      
      if (validCount < index.length) {
        this.logWarning('Partial Demo Data', `Only ${validCount}/${index.length} demo reports are available`);
      }
      
      return { valid: validCount, total: index.length };
      
    } catch (error) {
      this.logError('Demo Data Validation', error);
      throw error;
    }
  }

  // Handle network connectivity issues
  handleNetworkError(error) {
    if (!navigator.onLine) {
      this.showUserFriendlyError('You appear to be offline. Some features may not work properly.');
      return;
    }
    
    if (error.message.includes('fetch')) {
      this.showUserFriendlyError('Network error occurred. Please check your connection and try again.');
      return;
    }
    
    this.logError('Network Error', error);
  }

  // Graceful fallback for missing features
  handleFeatureUnavailable(featureName, fallbackAction) {
    this.logWarning('Feature Unavailable', `${featureName} is not available in this demo`);
    
    if (fallbackAction) {
      fallbackAction();
    } else {
      this.showUserFriendlyError(`${featureName} is not available in the demo version.`);
    }
  }

  // Get error summary for debugging
  getErrorSummary() {
    return {
      errors: this.errors.length,
      warnings: this.warnings.length,
      recentErrors: this.errors.slice(-5),
      recentWarnings: this.warnings.slice(-5)
    };
  }

  // Clear error history
  clearErrors() {
    this.errors = [];
    this.warnings = [];
  }
}

// Create singleton instance
const demoErrorHandler = new DemoErrorHandler();

export default demoErrorHandler;