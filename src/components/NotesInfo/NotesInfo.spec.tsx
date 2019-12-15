import * as React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { NotesInfo} from './';

describe('NotesInfo', () => {
  it('should display the default message', () => {
    const renderResult: RenderResult = render(
      <NotesInfo/>,
    );
    expect(renderResult.queryByText('Hello from NotesInfo!')).toBeTruthy();
  });
});