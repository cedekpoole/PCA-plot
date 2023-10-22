import { render, screen, fireEvent } from '@testing-library/react';
import UserInput from '../src/components/UserInput';

describe('User Input Component', () => {
  it('renders without crashing', () => {
    render(<UserInput />);
    const element = screen.getByTestId('user-input');
    expect(element).toBeInTheDocument();
  });

  it('renders input fields for CSV uploads', () => {
    render(<UserInput />);
    const input = screen.getByLabelText(/upload csv/i);
    expect(input).toBeInTheDocument();
  });

  test('handles file uploads', () => {
    render(<UserInput />);
    
    const input1 = screen.getByLabelText(/upload data/i);
    const input2 = screen.getByLabelText(/upload sample info/i);
    
    const file1 = new File(['gene_count'], 'data.csv', { type: 'text/csv' });
    const file2 = new File(['sample_info'], 'info.csv', { type: 'text/csv' });

    // Simulate file upload for input1
    fireEvent.change(input1, { target: { files: [file1] } });
    
    // Assertions for input1
    expect(input1.files[0]).toBe(file1);
    expect(input1.files.item(0)).toBe(file1);
    expect(input1.files).toHaveLength(1);

    // Simulate file upload for input2
    fireEvent.change(input2, { target: { files: [file2] } });
    
    // Assertions for input2
    expect(input2.files[0]).toBe(file2);
    expect(input2.files.item(0)).toBe(file2);
    expect(input2.files).toHaveLength(1);
});

  it('renders checkboxes for principal components', () => {
    render(<UserInput />);
    expect(screen.getByLabelText(/pc1/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/pc2/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/pc3/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/pc4/i)).toBeInTheDocument();
  });

  test('handles checkbox selection', () => {
    render(<UserInput />);
    const checkbox = screen.getByLabelText(/pc1/i);
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });  
});