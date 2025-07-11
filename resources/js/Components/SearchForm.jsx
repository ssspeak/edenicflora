import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { router } from '@inertiajs/react';

export default function SearchForm() {
    const [query, setQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            router.get(route('search'), { q: query });
        }
    };

    return (
        <Form className="searchForm d-flex" onSubmit={handleSearch}>
            <Form.Control
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search what you are looking for ..."
                className="searchInput"
                style={{
                    borderRadius: '5px 0 0 5px',
                    border: '1px solid #ccc',
                    borderRight: 'none',
                    height: '50px',
                    padding: '10px',
                    width: '600px'
                }}
            />
            <Button
                className="searchBtn"
                type="submit"
                style={{
                    backgroundColor: '#9b5d24',
                    borderRadius: '0 5px 5px 0',
                    border: '1px solid #ccc',
                    borderLeft: 'none',
                    height: '50px',
                    width: '200px'
                }}
            >
                Search
            </Button>
        </Form>
    );
}
