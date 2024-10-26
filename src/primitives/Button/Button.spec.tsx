import render from 'test/render';
import Button from './Button';
import {act} from 'react';

describe('Button', () => {
  it('renders', async () => {
    const handler = jest.fn();
    const {getByText} = render(<Button onClick={handler} text='click me' />);

    const el = getByText('click me');

    act(() => {
      el.click();
    });

    expect(handler).toHaveBeenCalled();
  });
});
