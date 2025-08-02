import { useState, useEffect } from 'react';
import { apiClient } from '../utils/api';

// Custom hook for API calls with loading states
export const useApi = (apiFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiFunction();
        setData(response.data);
      } catch (err) {
        setError(err.response?.data?.detail || err.message || 'An error occurred');
        console.error('API Hook Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, dependencies);

  return { data, loading, error, refetch: () => setLoading(true) };
};

// Hook for projects
export const useProjects = (featuredOnly = false) => {
  return useApi(() => apiClient.getProjects(featuredOnly), [featuredOnly]);
};

// Hook for certifications
export const useCertifications = () => {
  return useApi(() => apiClient.getCertifications());
};

// Hook for artwork
export const useArtwork = () => {
  return useApi(() => apiClient.getArtwork());
};

// Hook for about information
export const useAbout = () => {
  return useApi(() => apiClient.getAbout());
};

// Hook for submitting contact form
export const useContactForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const submitForm = async (formData) => {
    try {
      setSubmitting(true);
      setError(null);
      await apiClient.submitContact(formData);
      setSubmitted(true);
      return true;
    } catch (err) {
      setError(err.response?.data?.detail || err.message || 'Failed to submit form');
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setError(null);
  };

  return { submitForm, submitting, submitted, error, resetForm };
};