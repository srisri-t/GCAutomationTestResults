<template>
  <v-banner
    v-if="showBanner"
    color="primary"
    icon="mdi-information"
    class="demo-banner"
    sticky
  >
    <template v-slot:text>
      <div class="d-flex align-center">
        <v-icon class="me-2">mdi-play-circle</v-icon>
        <span class="text-body-2">
          <strong>Live Demo:</strong> You're viewing the Cucumber Test Results Viewer with sample data. 
          <a 
            href="https://github.com/srisri-t/GCAutomationTestResults" 
            target="_blank" 
            class="text-white text-decoration-underline"
          >
            View on GitHub
          </a>
        </span>
      </div>
    </template>
    
    <template v-slot:actions>
      <v-btn
        variant="text"
        color="white"
        size="small"
        @click="hideBanner"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-banner>
</template>

<script>
import { demoConfig } from '@/config/demo.js';

export default {
  name: 'DemoBanner',
  data() {
    return {
      showBanner: true
    };
  },
  mounted() {
    // Only show banner if demo notifications are enabled
    this.showBanner = demoConfig.features.showDemoNotifications && !this.hasDismissedBanner();
  },
  methods: {
    hasDismissedBanner() {
      return localStorage.getItem('demo-banner-dismissed') === 'true';
    },
    hideBanner() {
      this.showBanner = false;
      localStorage.setItem('demo-banner-dismissed', 'true');
    }
  }
};
</script>

<style scoped>
.demo-banner {
  z-index: 1000;
}

.demo-banner a {
  color: white !important;
}

.demo-banner a:hover {
  opacity: 0.8;
}
</style>