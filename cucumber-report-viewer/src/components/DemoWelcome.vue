<template>
  <v-dialog v-model="showWelcome" max-width="600" persistent>
    <v-card class="demo-welcome">
      <v-card-title class="text-h5 text-center pa-6">
        <v-icon color="primary" size="48" class="mb-4">mdi-cucumber</v-icon>
        <div>Welcome to the Live Demo!</div>
      </v-card-title>
      
      <v-card-text class="px-6 pb-4">
        <div class="text-center mb-4">
          <h3 class="text-h6 mb-2">Cucumber Test Results Viewer</h3>
          <p class="text-body-1 text-medium-emphasis">
            Explore our professional test report visualization tool with pre-loaded sample data.
          </p>
        </div>
        
        <v-divider class="my-4"></v-divider>
        
        <div class="demo-features">
          <h4 class="text-subtitle-1 mb-3">🎯 Demo Highlights:</h4>
          <v-list density="compact" class="bg-transparent">
            <v-list-item>
              <template v-slot:prepend>
                <v-icon color="success">mdi-check-circle</v-icon>
              </template>
              <v-list-item-title>Pre-loaded sample test reports</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <template v-slot:prepend>
                <v-icon color="success">mdi-check-circle</v-icon>
              </template>
              <v-list-item-title>Interactive search and filtering</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <template v-slot:prepend>
                <v-icon color="success">mdi-check-circle</v-icon>
              </template>
              <v-list-item-title>Dark/Light theme switching</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <template v-slot:prepend>
                <v-icon color="success">mdi-check-circle</v-icon>
              </template>
              <v-list-item-title>Mobile-responsive design</v-list-item-title>
            </v-list-item>
          </v-list>
        </div>
        
        <v-alert 
          type="info" 
          variant="tonal" 
          class="mt-4"
          icon="mdi-information"
        >
          <div class="text-body-2">
            <strong>Try it out:</strong> Click on any report card below to explore detailed test results, 
            use the search bar to find specific tests, or upload your own Cucumber JSON files.
          </div>
        </v-alert>
      </v-card-text>
      
      <v-card-actions class="px-6 pb-6">
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          variant="flat"
          size="large"
          @click="startDemo"
          class="px-8"
        >
          <v-icon start>mdi-rocket-launch</v-icon>
          Start Exploring
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
      
      <div class="demo-badge">
        <v-chip
          color="primary"
          variant="flat"
          size="small"
          class="ma-2"
        >
          <v-icon start size="16">mdi-play-circle</v-icon>
          Live Demo
        </v-chip>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { demoConfig } from '@/config/demo.js';

export default {
  name: 'DemoWelcome',
  data() {
    return {
      showWelcome: false
    };
  },
  mounted() {
    // Show welcome dialog if it's the first visit or demo config enables it
    if (demoConfig.showWelcomeTour && !this.hasSeenWelcome()) {
      setTimeout(() => {
        this.showWelcome = true;
      }, 1000);
    }
  },
  methods: {
    hasSeenWelcome() {
      return localStorage.getItem('demo-welcome-seen') === 'true';
    },
    startDemo() {
      this.showWelcome = false;
      localStorage.setItem('demo-welcome-seen', 'true');
      this.$emit('demo-started');
    }
  }
};
</script>

<style scoped>
.demo-welcome {
  position: relative;
}

.demo-badge {
  position: absolute;
  top: 0;
  right: 0;
}

.demo-features .v-list {
  padding: 0;
}

.demo-features .v-list-item {
  padding-left: 0;
  min-height: 36px;
}

.v-card-title {
  background: linear-gradient(135deg, var(--v-theme-primary) 0%, var(--v-theme-secondary) 100%);
  color: white !important;
}

.v-card-title .v-icon {
  color: white !important;
}
</style>