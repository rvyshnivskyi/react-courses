import React from "react";
import {render, screen, waitForElementToBeRemoved} from "../../../utils/test-utils";
import {WaitersApp} from "../index";
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {URL} from "../api/server";
import {fireEvent} from "@testing-library/react";

const HEADER_COUNT = 1;

const mockWaiters = [
    {
        id: 1,
        firstName: 'John',
        phone: '1234567890',
    },
    {
        id: 2,
        firstName: 'Jane',
        phone: '0987654321',
    },
];

export const handlers = [
    rest.get(URL, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(mockWaiters)
        )
    }),
]

const server = setupServer(...handlers)

describe('<WaitersApp/>', () => {
    beforeAll(() => server.listen())

    afterEach(() => server.resetHandlers())

    afterAll(() => server.close())

    it('should render waiters list', async () => {
        render(<WaitersApp/>)

        await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

        const rows = screen.getAllByRole('row');

        expect(rows).toHaveLength(mockWaiters.length + HEADER_COUNT)

        screen.debug()
    });

    it('should render error', async () => {
        server.use(
            rest.get(URL, (req, res, ctx) => {
                return res(
                    ctx.status(500),
                    ctx.json({message: 'error'})
                )
            }),
        )

        render(<WaitersApp/>)

        await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

        expect(screen.getByText(/error/i)).toBeInTheDocument()
    });

    it('should filter waiters by name', async () => {
        render(<WaitersApp/>)

        await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

        const nameInput = screen.getByLabelText('name-input');
        fireEvent.change(nameInput, {target: {value: 'John'}})

        const rows = screen.getAllByRole('row');

        expect(rows).toHaveLength(1 + HEADER_COUNT)
    });

    it('should filter waiters by phone', async () => {
        render(<WaitersApp/>)

        await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

        const phoneInput = screen.getByLabelText('phone-input');
        fireEvent.change(phoneInput, {target: {value: '123'}})

        const rows = screen.getAllByRole('row');

        expect(rows).toHaveLength(1 + HEADER_COUNT)
    });

    it('should filter waiters by name and phone', async () => {
        render(<WaitersApp/>)

        await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

        const nameInput = screen.getByLabelText('name-input');
        fireEvent.change(nameInput, {target: {value: 'John'}})

        const phoneInput = screen.getByLabelText('phone-input');
        fireEvent.change(phoneInput, {target: {value: '123'}})

        const rows = screen.getAllByRole('row');

        expect(rows).toHaveLength(1 + HEADER_COUNT)
    });

})