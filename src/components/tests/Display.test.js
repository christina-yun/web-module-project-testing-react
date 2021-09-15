import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Display from './../Display';

import mockFetchShow from './../../api/fetchShow';

jest.mock('./../../api/fetchShow')

const testShow = {
    //add in approprate test data structure here.
    name: 'Stranger Things',
    image: {
        medium: "https://static.tvmaze.com/uploads/images/medium_portrait/200/501942.jpg",
        original: "https://static.tvmaze.com/uploads/images/original_untouched/200/501942.jpg"
    },
    seasons: [
        {
            id: 0, 
            name: 'Season 1',
            episodes:[{
                id:1,
                name: "Season 1 Episode 1",
                image: "http://static.tvmaze.com/uploads/images/medium_landscape/67/168918.jpg",
                season: 1,
                number: 1,
                summary: "here",
                runtime: 1
            },
            {
                id:2,
                name: "Season 1 Episode 2",
                image: "http://static.tvmaze.com/uploads/images/medium_landscape/67/168918.jpg",
                season: 1,
                number: 2,
                summary: "there",
                runtime: 234
            }]

        },
        {
            id: 1, 
            name: 'Season 2',
            episodes:[{
                id:1,
                name: "Some Name Goes Here",
                image: "http://static.tvmaze.com/uploads/images/medium_landscape/67/168918.jpg",
                season: 1,
                number: 1,
                summary: "here jeremy",
                runtime: 1
            },
            {
                id:2,
                name: "Season 2 Episode 2",
                image: "http://static.tvmaze.com/uploads/images/medium_landscape/67/168918.jpg",
                season: 1,
                number: 2,
                summary: "there",
                runtime: 234
            }]

        }
    ],
    summary: 'blah blah blah'
}

test('renders without errors', () => {
    render(<Display />)
})

test('renders show component when fetch button is pressed', async () => {
    render(<Display />)
    mockFetchShow.mockResolvedValueOnce(testShow);
    const button = screen.queryByRole('button');
    userEvent.click(button);

//find will return a promise
    const show = await screen.findByTestId('show-container');
    expect(show).toBeInTheDocument();
})

test('when fetch is pressed, there are 2 select options', async () => {
    render(<Display />)
    mockFetchShow.mockResolvedValueOnce(testShow);
    const button = screen.queryByText(/press to get show data/i);
    expect(button).toBeInTheDocument();
    userEvent.click(button);

    const select = await screen.findAllByTestId('season-option');

    expect(select).toHaveLength(2);
})

test('see that displayFunc is called when the fetch button is pressed', async ()=> {
    const displayFunc = jest.fn();
    render(<Display displayFunc={displayFunc}/>)
    mockFetchShow.mockResolvedValueOnce(testShow);
    const button = screen.queryByText(/press to get show data/i);
    expect(button).toBeInTheDocument();
    userEvent.click(button);

    await waitFor(() => {
        expect(displayFunc).toHaveBeenCalledTimes(1);
    })
    
})



///Tasks:
//1. Add in necessary imports and values to establish the testing suite.
//2. Test that the Display component renders without any passed in props.
//3. Rebuild or copy a show test data element as used in the previous set of tests.
//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.