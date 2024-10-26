import render from 'test/render';
import Text from './Text';

describe('Text', () => {
  it('renders raw text', async () => {
    const {getByText} = render(<Text text='Hello!' />);

    getByText('Hello!');
  });
});
