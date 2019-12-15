import * as React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { NoteDetail} from './';

describe('NoteDetail', () => {
  it('should display the default message', () => {
    const renderResult: RenderResult = render(
      <NoteDetail/>,
    );
    expect(renderResult.queryByText('Hello from NoteDetail!')).toBeTruthy();
  });
});