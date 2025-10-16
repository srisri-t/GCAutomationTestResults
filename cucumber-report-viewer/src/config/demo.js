// Demo configuration for production client demo
export const demoConfig = {
  // Auto-load sample reports on startup
  autoLoadReports: true,
  
  // Show welcome tour for first-time users
  showWelcomeTour: true,
  
  // Demo branding
  branding: {
    title: 'Cucumber Test Results - Live Demo',
    subtitle: 'Professional Test Report Visualization',
    showDemoLabel: true,
    demoUrl: 'https://srisri-t.github.io/GCAutomationTestResults/'
  },
  
  // Sample data configuration
  sampleData: {
    enabled: true,
    path: '/TestResultsJsons/',
    autoRefresh: false,
    preloadOnStart: true
  },
  
  // Demo-specific features
  features: {
    enableAnalytics: false,
    showPerformanceMetrics: true,
    enableTourGuide: true,
    showDemoNotifications: true
  },
  
  // Welcome tour steps
  tourSteps: [
    {
      target: '.reports-collection',
      title: 'Welcome to the Demo!',
      content: 'This demo includes pre-loaded sample test reports. Click on any report to explore detailed results.',
      placement: 'bottom'
    },
    {
      target: '.search-bar',
      title: 'Search & Filter',
      content: 'Use the search bar to find specific tests, features, or scenarios across all reports.',
      placement: 'bottom'
    },
    {
      target: '.theme-toggle',
      title: 'Theme Switching',
      content: 'Toggle between light and dark themes to see the modern UI design.',
      placement: 'left'
    },
    {
      target: '.upload-area',
      title: 'Upload Your Own Reports',
      content: 'You can also upload your own Cucumber JSON reports to test the functionality.',
      placement: 'top'
    }
  ]
};

export default demoConfig;