import React from 'react'
import { FaTimes } from 'react-icons/fa';
import { useGlobalContext } from './context';
import { links, social } from './data';
import logo from './logo.svg';

function Sidebar() {
    const {isSidebarOpen, closeSidebar} = useGlobalContext();
    
    return (

        <aside className={`${isSidebarOpen ? 'show-sidebar sidebar':'sidebar'}`}>
            <div className="sidebar-header">
                <img src={logo} alt="logo" className='logo' />
                <button className="close-btn" onClick={closeSidebar}>
                    <FaTimes />
                </button>
            </div>
            <ul className="links">
                {links.map(link => {
                    const { url, id, text, icon } = link;
                    return <li key={id}>
                        <a href={url}>
                            {icon}
                            {text}
                        </a>
                    </li>
                })}
            </ul>
            <ul className="social-icons">
                {social.map(item => {
                    const {id,url,icon} = item;
                    return <li key={id}>
                        <a href={url}>
                            {icon}
                        </a>
                    </li>
                })}
            </ul>
        </aside>
    )
}

export default Sidebar
