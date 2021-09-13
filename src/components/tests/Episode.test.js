import React from 'react';
import { render, screen } from '@testing-library/react';
import Episode from './../Episode';

const testEpisode = {
    id:1,
    name: "that one episode",
    image: "http://static.tvmaze.com/uploads/images/medium_landscape/67/168918.jpg",
    season: 1,
    number: 1,
    summary: "here",
    runtime: 1
}

const testEpisodeWithoutImage = {
    //Add in approprate test data structure here.
    id:9,
    name: "dfd",
    image: null,
    season: 90,
    number: 54,
    summary: "",
    runtime: 30
}

const imgsrc = testEpisodeWithoutImage.image || './stranger_things.png'

test("renders without error", () => {
    render(<Episode episode={testEpisode}/>)
});

test("renders the summary test passed as prop", ()=>{
//Arrange: Render the component
    render(<Episode episode={testEpisode}/>)
//Act: find the summary from the testData
    const summary = screen.queryByText(/here/i);

//Assert: it's in the document
    expect(summary).toBeInTheDocument();
    expect(summary).not.toBeNull();
    expect(summary).toBeTruthy();

});

test("renders default image when image is not defined", ()=>{
    render(<Episode episode={testEpisodeWithoutImage} imgsrc={imgsrc}/>)

    const image = testEpisodeWithoutImage.image;

    const defaultImgText = screen.queryByAltText('./stranger_things.png')

    expect(image).not.toBeInTheDocument();
    expect(defaultImgText).toBeInTheDocument();
    console.log(defaultImgText)

})

//Tasks
//1. Complete a test that shows the Episode component renders. Pass in the provided example episode data as a test prop.
//2. Modify the test data to display a specific summary statement. Complete a test that shows that the summary value passed in to the Episode component displays as expected. Use no more than 3 different expect statements to test the the existence of the summary value.
//3. The episode component displays a default value ('./stranger_things.png') when a image url is not provided. Create a new piece of test data with the image property set to null. Test that the alt tag of the image displayed is set to './stranger_things.png'.