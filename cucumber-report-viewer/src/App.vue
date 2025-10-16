<template>
  <v-app :theme="currentTheme">
    <div id="app" :class="{ 'dark-theme': isDark }">
      <!-- Demo Banner -->
      <DemoBanner />
      
      <!-- Main Application -->
      <router-view />
      
      <!-- Demo Welcome Dialog -->
      <DemoWelcome @demo-started="onDemoStarted" />
    </div>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
import DemoBanner from '@/components/DemoBanner.vue';
import DemoWelcome from '@/components/DemoWelcome.vue';
import { demoConfig } from '@/config/demo.js';
import DemoErrorHandler from '@/utils/DemoErrorHandler.js';

export default {
  name: 'App',
  
  components: {
    DemoBanner,
    DemoWelcome
  },
  
  computed: {
    ...mapGetters('theme', ['isDark', 'currentTheme'])
  },
  
  watch: {
    isDark: {
      handler(newVal) {
        // Ensure body class is updated
        if (newVal) {
          document.body.classList.add('dark-theme');
        } else {
          document.body.classList.remove('dark-theme');
        }
      },
      immediate: true
    }
  },
  
  async mounted() {
    // Set demo title if configured
    if (demoConfig.branding.title) {
      document.title = demoConfig.branding.title;
    }
    
    // Validate demo data on startup
    try {
      const validation = await DemoErrorHandler.validateDemoData();
      console.log(`✅ Demo data validated: ${validation.valid}/${validation.total} reports available`);
    } catch (error) {
      console.error('❌ Demo data validation failed:', error);
      DemoErrorHandler.handleFeatureUnavailable('Demo Data', () => {
        console.log('Continuing without pre-loaded demo data');
      });
    }
  },
  
  methods: {
    onDemoStarted() {
      // Handle demo started event
      console.log('Demo tour started');
    }
  }
}
</script>

<style lang="scss">
@import './styles/vuetify.scss';
@import './styles/responsive.scss';
@import './styles/branding.scss';

#app {
  font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  transition: background-color 0.3s ease, color 0.3s ease;
  
  // Apply responsive and accessibility classes
  @extend .mobile-optimized;
  @extend .touch-friendly;
  @extend .accessibility-enhanced;
  @extend .responsive-text;
  @extend .responsive-spacing;
  @extend .demo-responsive;
}

// Let Vuetify handle the theme colors
.v-application {
  font-family: inherit !important;
}

// Theme-aware scrollbar
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: var(--theme-surface);
}

::-webkit-scrollbar-thumb {
  background: var(--theme-text-secondary);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--theme-text-primary);
}

[data-theme="dark"] ::-webkit-scrollbar-track {
  background: var(--theme-surface-variant);
}

[data-theme="dark"] ::-webkit-scrollbar-thumb {
  background: var(--theme-text-secondary);
}

[data-theme="dark"] ::-webkit-scrollbar-thumb:hover {
  background: var(--theme-text-primary);
}
</style>