import { render, screen } from '@testing-library/react';
import Chart from '../src/components/Chart';

describe('Chart Component', () => {
  test('renders without crashing', () => {
    render(<Chart />);
    const element = screen.getByTestId('chart-component');
    expect(element).toBeInTheDocument();
  });

  test('renders input fields for CSV uploads', () => {
    render(<Chart />);
    const input = screen.getByLabelText(/upload csv/i);
    expect(input).toBeInTheDocument();
  });
});