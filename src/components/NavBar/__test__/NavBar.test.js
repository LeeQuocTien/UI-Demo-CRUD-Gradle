import { render, screen } from '@testing-library/react';
import NavBar from '../NavBar';

test('should renders Student Manager App in NavBar...', () => {
  render(<NavBar />);
  const linkElement = screen.getByText(/Student Manager Appp/i);
  expect(linkElement).toBeInTheDocument();
});
