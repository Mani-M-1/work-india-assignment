import { useContext, useState } from 'react';
import './index.css';
import { Link } from 'react-router-dom';


import movieContext from '../../context/movieContext';


const tabs = [
    {
        id: "1",
        tabName: "Popular",
        path: "/"
    },
    {
        id: "2",
        tabName: "Top Rated",
        path: "/top-rated"
    },
    {
        id: "3",
        tabName: "Upcoming",
        path: "/upcoming-movies"
    },
]



const Header = () => {

    const movieDetailsFromContext = useContext(movieContext);

    const [activeTabId, setActiveTabId] = useState(tabs[0].id)


    const [searchValue, setSearchValue] = useState("")

    const TabItem = (props) => {
        const {tab, isTabActive} = props;
        const {id, tabName, path} = tab;



        return (
            <li className='header-nav-items' onClick={() => setActiveTabId(id)}>
                <Link to={path} className={isTabActive ? "active-tab" :'header-nav-links'}>
                    {tabName} 
                </Link>
            </li>
        )
    }

    const handleOnclickSearchBtn = () => {
        movieDetailsFromContext.setState(searchValue)
    }

    return (
        <nav className='header-section'>
            <h1 className='header-title'>
                MovieDb
            </h1>
            <ul className='header-nav-links-card'>
                {tabs.map(tab => <TabItem key={tab.id} tab={tab} isTabActive={tab.id === activeTabId}/>)}
               
                <li className='header-nav-items'>
                    <input type='search' className='header-search-input' placeholder='Movie Name' onChange={(event) => setSearchValue(event.target.value)}/>
                </li>
                <li className='header-nav-items'>
                    <button className='header-search-btn' onClick={handleOnclickSearchBtn}>
                        Search 
                    </button>
                </li>
            </ul>
            
        </nav>
    )
}


export default Header;