import * as React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { NotesWrapper} from './';

describe('NotesWrapper', () => {
  it('should display the default message', () => {
    const renderResult: RenderResult = render(
      <NotesWrapper/>,
    );
    expect(renderResult.queryByText('Hello from NotesWrapper!')).toBeTruthy();
  });
});