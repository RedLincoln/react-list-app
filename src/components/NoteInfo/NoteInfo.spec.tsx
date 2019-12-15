import * as React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { NoteInfo} from './';

describe('NoteInfo', () => {
  it('should display the default message', () => {
    const renderResult: RenderResult = render(
      <NoteInfo/>,
    );
    expect(renderResult.queryByText('Hello from NoteInfo!')).toBeTruthy();
  });
});