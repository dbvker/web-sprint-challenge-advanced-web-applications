import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MutationObserver from 'mutationobserver-shim';

import Article from './Article';

const testArticle = {
    id: '1',
    headline: "headline",
    createdOn: '2021-08-09T18:02:38-04:00 ',
    summary: "summary",
    body: "body",
    author: "Dylan Baker",
    image: "image",
}

test('renders component without errors', ()=> {
    render(<Article article={testArticle} />);
});

test('renders headline, author from the article when passed in through props', ()=> {
    render(<Article article={testArticle} />);

    const headline = screen.queryByTestId('headline');
    expect(headline).toBeInTheDocument();

    const author = screen.queryByTestId('author');
    expect(author).toBeInTheDocument();
});

test('renders "Associated Press" when no author is given', ()=> {
    const testArticleNoAuthor = {
        id: '1',
        headline: "headline",
        createdOn: '2021-08-09T18:02:38-04:00 ',
        summary: "summary",
        body: "body",
        author: null,
        image: "image",
    }
    render(<Article article={testArticleNoAuthor} />);

    const noAuthor = screen.queryByText(/associated press/i)
    expect(noAuthor).toBeInTheDocument();
});

test('executes handleDelete when the delete button is pressed', ()=> {
    const handleDelete = jest.fn();
    render(<Article article={testArticle} handleDelete={handleDelete} />);
    
    const button = screen.queryByText(/delete/i);
    userEvent.click(button);
    expect(handleDelete).toBeCalled();
});

//Task List: 
//1. Complete all above tests. Create test article data when needed.