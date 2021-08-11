import Results from '../components/results/index';
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect';


it('Should render API Result list', () => {
    const data = {
        Headers:'application header',
        count: 100,
        results: [
            { name: 'fake thing 1', url: 'http://fakethings.com/1' },
            { name: 'fake thing 2', url: 'http://fakethings.com/2' },
        ],
    };
    render(<Results data={data} />);
    const items = screen.getByTestId('testResult');

    expect(items).toHaveTextContent('Headers : "application header"""Results : [ { "name": "fake thing 1", "url": "http://fakethings.com/1" }, { "name": "fake thing 2", "url": "http://fakethings.com/2" } ]');

});

test('renders null for results before submitting Url', () => {
    render(<Results />);
    const resultsPreElement = screen.getByTestId('testResult');
    expect(resultsPreElement).toBeInTheDocument();
    expect(resultsPreElement).toHaveTextContent('Headers : ""Results : ');
  });