import React from 'react';
import CallToAction from '../components/CallToAction'
const Projects = () => {
    return (
        <div className='min-h-screen max-h-2xl mx-auto flex justify-center flex-col items-center gap-6 p-3'>
            <h1>Projects</h1>
            <p className='text-md text-gray-500'>Build fun and engaging projects while learning HTML, CSS, and JavaScript</p>
            <CallToAction />
        </div>
    );
};

export default Projects;