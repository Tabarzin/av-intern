const process = require('process');

const API = process.env.API_URL || 'http://localhost:3000';

import { Advertisment } from '../types/types';

export async function getAdvs(): Promise<Advertisment[]> {
  try {
    const response = await fetch(`${API}/advertisements`);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json: Advertisment[] = await response.json();
    return json;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('An unknown error occurred');
    }
    return [];
  }
}

export async function getAdvById(id: string): Promise<Advertisment> {
  try {
    const response = await fetch(`${API}/advertisements/${id}`);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json: Advertisment = await response.json();
    return json;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(`An unknown error occurred while fetching advertisement with id ${id}`);
    }
    return Promise.reject(new Error('Failed to fetch ad'));
  }
}
