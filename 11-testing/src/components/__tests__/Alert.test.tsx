
import {Alert} from "../Alert";
import '@testing-library/jest-dom';
import {render, screen} from "@testing-library/react";

const messageText = 'Message text';

function renderAlert({message}: any) {
    render(<Alert message={message}/>);
}

describe('<Alert/>', () => {
    it('should render message', () => {
        renderAlert({message: messageText});

        const message = screen.getByText(messageText);

        expect(message).toBeInTheDocument();
    });

    it('should render message with red color', () => {
        renderAlert({message: messageText});

        const message = screen.getByText(messageText);

        expect(message).toHaveStyle('color: red');
    });
});