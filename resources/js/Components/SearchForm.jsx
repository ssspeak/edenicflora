
import React from 'react';

import { Form, Button } from 'react-bootstrap';


export default function SearchForm() {


    return (
        <Form className='searchForm'>
            <Form.Control
                type="text"
                placeholder="Search what you are looking for ..."
                className="searchInput"
                style={{
                    borderRadius: '5px 0 0 5px',
                    border: '1px solid #ccc',
                    borderRight: 'none',
                    height: '50px',   // Increase height
                    padding: '10px',  // Increase padding for wider input
                    width: '600px'    // Adjust the width
                  }}
            />
            <Button
                className="searchBtn"
                type="submit"
                style={{
                    backgroundColor: '#9b5d24', /* Button color */
                    borderRadius: '0 5px 5px 0',
                    border: '1px solid #ccc',
                    borderLeft: 'none',
                    height: '50px',   // Increase height to match the input
                    padding: '10px',  // Increase padding for better size
                    width: '200px'    // Adjust button width to match
                  }}
                >
                Search
            </Button>
        </Form>
    );
}
