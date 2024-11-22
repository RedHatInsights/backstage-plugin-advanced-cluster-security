import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { QueryACS } from './QueryACS';
import { ThemeProvider } from '@material-ui/core/styles';
import { lightTheme } from '@backstage/theme';
import { configApiRef, useApi } from '@backstage/core-plugin-api';

// Mock the configApiRef to provide the backend URL
jest.mock('@backstage/core-plugin-api', () => ({
  ...jest.requireActual('@backstage/core-plugin-api'),
  useApi: jest.fn(),
}));

// Set up a mock fetch response
const mockFetchResponse = (data, ok = true) => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok,
      json: () => Promise.resolve(data),
    })
  );
};


describe('Query ACS API at "/v1/export/vuln-mgmt/workloads?query=Deployment%3A${deploymentName}"', () => {
  it('displays fetched data correctly', async () => {
    mockFetchResponse({
      total: 0,
      items: [],
    });
  });
});

