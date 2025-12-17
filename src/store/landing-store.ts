import { create } from 'zustand';

interface ContactFormData {
  name: string;
  email: string;
  community: string;
  phone?: string;
  message: string;
  source?: string;
}

interface DemoFormData {
  name: string;
  email: string;
  community: string;
  preferredDate: string;
  preferredTime: string;
  communitySize?: number;
}

interface LandingPageState {
  // UI State
  isMenuOpen: boolean;
  activeSection: string;
  isLoading: boolean;
  
  // Form State
  contactForm: ContactFormData;
  demoForm: DemoFormData;
  newsletterEmail: string;
  
  // Animation State
  animationsEnabled: boolean;
  scrollProgress: number;
  
  // Actions
  setMenuOpen: (open: boolean) => void;
  setActiveSection: (section: string) => void;
  submitContactForm: (data: ContactFormData) => Promise<void>;
  scheduleDemo: (data: DemoFormData) => Promise<void>;
  subscribeNewsletter: (email: string) => Promise<void>;
  updateScrollProgress: (progress: number) => void;
  setLoading: (loading: boolean) => void;
}

export const useLandingStore = create<LandingPageState>((set, get) => ({
  // Initial state
  isMenuOpen: false,
  activeSection: 'hero',
  isLoading: false,
  
  contactForm: {
    name: '',
    email: '',
    community: '',
    phone: '',
    message: '',
    source: 'landing_page'
  },
  
  demoForm: {
    name: '',
    email: '',
    community: '',
    preferredDate: '',
    preferredTime: '',
    communitySize: 0
  },
  
  newsletterEmail: '',
  animationsEnabled: true,
  scrollProgress: 0,
  
  // Actions
  setMenuOpen: (open: boolean) => set({ isMenuOpen: open }),
  
  setActiveSection: (section: string) => set({ activeSection: section }),
  
  setLoading: (loading: boolean) => set({ isLoading: loading }),
  
  submitContactForm: async (data: ContactFormData) => {
    set({ isLoading: true });
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to submit contact form');
      }
      
      console.log('Contact form submitted successfully:', result);
      
      // Reset form
      set({
        contactForm: {
          name: '',
          email: '',
          community: '',
          phone: '',
          message: '',
          source: 'landing_page'
        }
      });
      return result;
    } catch (error) {
      console.error('Error submitting contact form:', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  
  scheduleDemo: async (data: DemoFormData) => {
    set({ isLoading: true });
    try {
      const response = await fetch('/api/demo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to schedule demo');
      }
      
      console.log('Demo scheduled successfully:', result);
      
      // Reset form
      set({
        demoForm: {
          name: '',
          email: '',
          community: '',
          preferredDate: '',
          preferredTime: '',
          communitySize: 0
        }
      });
      return result;
    } catch (error) {
      console.error('Error scheduling demo:', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  
  subscribeNewsletter: async (email: string) => {
    set({ isLoading: true });
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to subscribe to newsletter');
      }
      
      console.log('Newsletter subscription successful:', result);
      
      set({ newsletterEmail: '' });
      return result;
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  
  updateScrollProgress: (progress: number) => set({ scrollProgress: progress }),
}));

export type { ContactFormData, DemoFormData, LandingPageState };