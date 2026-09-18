import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the skills page on the /skills route', () => {
  window.history.pushState({}, '', '/skills');

  render(<App />);

  expect(screen.getByText(/Skills & Technologies/i)).toBeInTheDocument();
});
