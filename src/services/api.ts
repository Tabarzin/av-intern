const process = require('process');

const API = process.env.API_URL || 'http://localhost:3000';

import { Advertisment } from '../types/types';

export default async function getAdvs(page: number, items: number): Promise<Advertisment[]> {
  try {
    const response = await fetch(`${API}/advertisements`);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json: Advertisment[] = await response.json();
    return json;
    console.log(json);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('An unknown error occurred');
    }
    return [];
  }
}
