import React from 'react'
import "./Header.css"
import { MenuItem, TextField } from '@mui/material'
import categories from '../../data/category'

const Header = ({setCategory, category, word, setWord, lightMode}) => {

    const handleChange = (language) => {
        setCategory(language);
        setWord("")
    }

    return (
    <div className='header'>
        <span className='title'>Word Hunt</span>
        <div className='inputs'>
            <TextField
                className='search'
                id='standard-basic' 
                label="Search a Word"
                value={word}
                onChange={(e) => setWord(e.target.value)}
            />
            <TextField
                className='select'
                select
                value={category}
                onChange={(e) => handleChange(e.target.value)}
                label="Language"
            >
                {categories.map((option) => (
                    <MenuItem key={option.label} value={option.label}>{option.value}</MenuItem>
                ))}
            </TextField>
        </div>
    </div>
    );
}

export default Header