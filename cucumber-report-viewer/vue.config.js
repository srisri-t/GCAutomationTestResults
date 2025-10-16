const { defineConfig } = require('@vue/cli-service');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = defineConfig({
  transpileDependencies: true,
  
  // GitHub Pages deployment configuration
  publicPath: process.env.NODE_ENV === 'production' 
    ? '/GCAutomationTestResults/' 
    : '/',
    
  // Output directory
  outputDir: 'dist',
  
  // Production optimizations
  productionSourceMap: false,
  
  // PWA configuration
  pwa: {
    name: 'Cucumber Test Results Viewer',
    themeColor: '#1976D2',
    msTileColor: '#1976D2',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'default',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/sw.js',
      swDest: 'sw.js'
    }
  },
  
  // Webpack configuration
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
          vuetify: {
            test: /[\\/]node_modules[\\/]vuetify[\\/]/,
            name: 'vuetify',
            chunks: 'all',
          }
        }
      }
    },
    plugins: process.env.NODE_ENV === 'production' ? [
      new CompressionPlugin({
        algorithm: 'gzip',
        test: /\.(js|css|html|svg)$/,
        threshold: 8192,
        minRatio: 0.8
      })
    ] : []
  },
  
  // Development server configuration
  devServer: {
    port: 8080,
    host: 'localhost',
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false
      }
    }
  },
  
  // CSS configuration
  css: {
    extract: process.env.NODE_ENV === 'production',
    sourceMap: false,
    loaderOptions: {
      sass: {
        additionalData: `@import "@/styles/variables.scss";`
      }
    }
  },
  
  // Plugin options
  pluginOptions: {
    vuetify: {
      theme: {
        dark: false,
        themes: {
          light: {
            primary: '#1976D2',
            secondary: '#424242',
            accent: '#82B1FF',
            error: '#FF5252',
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FFC107'
          },
          dark: {
            primary: '#2196F3',
            secondary: '#424242',
            accent: '#FF4081',
            error: '#FF5252',
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FB8C00'
          }
        }
      }
    }
  }
});