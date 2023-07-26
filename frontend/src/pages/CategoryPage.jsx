import React from 'react'

const CategoryPage = ({cat,setCat}) => {
    return (
        <div className='w-full mx-2 mb-5'>
            <div className='flex items-center gap-2 font-semibold text-black dark:text-white'>
                {
                    cat ? (<input type="radio" name='cat' value='art' checked = {cat === 'art'}  onChange={(e) => setCat(e.target.value)}/>) : (<input type="radio" name='cat' value='art'  onChange={(e) => setCat(e.target.value)} />)
                }
                
                <label htmlFor="art">Art</label>
            </div>

            <div className='flex items-center gap-2 font-semibold  text-black dark:text-white'>
                {
                    cat ? (<input type="radio" name='cat' value='design' checked = {cat === 'design'}  onChange={(e) => setCat(e.target.value)} />) : (<input type="radio" name='cat' value='design'  onChange={(e) => setCat(e.target.value)}/>)
                }
                <label htmlFor="design">Design</label>
            </div>

            <div className='flex items-center gap-2 font-semibold text-black dark:text-white'>
                {
                    cat ? (<input type="radio" name='cat' value='technology' checked = {cat === 'technology'}  onChange={(e) => setCat(e.target.value)}/>) : (<input type="radio" name='cat' value='technology'  onChange={(e) => setCat(e.target.value)}/>)
                }
                <label htmlFor="technology">Technology</label>
            </div>

            <div className='flex items-center gap-2 font-semibold text-black dark:text-white'>
                {
                    cat ? (<input type="radio" name='cat' value='dsa' checked = {cat === 'travel'}  onChange={(e) => setCat(e.target.value)}/>) : (<input type="radio" name='cat' value='travel'  onChange={(e) => setCat(e.target.value)}/>)
                }
                <label htmlFor="dsa">Travel</label>
            </div>

            <div className='flex items-center gap-2 font-semibold text-black dark:text-white'>
                {
                    cat ? (<input type="radio" name='cat' value='food' checked = {cat === 'food'}  onChange={(e) => setCat(e.target.value)}/>) : (<input type="radio" name='cat' value='food'  onChange={(e) => setCat(e.target.value)}/>)
                }
                <label htmlFor="webdevelopment">Food</label>
            </div>
        </div>
    )
}

export default CategoryPage
