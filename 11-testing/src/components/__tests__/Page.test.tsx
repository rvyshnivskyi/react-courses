import React from "react";
import {Page} from "../Page";
import '@testing-library/jest-dom';
import {render, screen} from "@testing-library/react";

const pageTitleText = 'Page Title';
const childrenText = 'Children text';
const errorText = 'Error message';


function renderPage({error, loading}: any) {
    render(
        <Page title={pageTitleText} error={error} loading={loading}>
            {childrenText}
        </Page>
    );
}

describe('<Page/>', () => {
    it('should render title', () => {
        renderPage({});

        const title = screen.getByText(pageTitleText);

        expect(title).toBeInTheDocument();
    });

    it('should render children', () => {
        renderPage({});

        const children = screen.getByText(childrenText);

        expect(children).toBeInTheDocument();
    });

    it('should render loading', () => {
        renderPage({ loading: true });

        const loading = screen.getByText('Loading...');
        const children = screen.queryByText(childrenText);

        expect(loading).toBeInTheDocument();
        expect(children).not.toBeInTheDocument();
    });

    it('should render error', () => {
        renderPage({ error: errorText });

        const error = screen.getByText(errorText);
        const children = screen.queryByText(childrenText);

        expect(error).toBeInTheDocument();
        expect(children).not.toBeInTheDocument();
    });
});