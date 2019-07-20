import React, { useState } from 'react';

const SearchTags = (props) => {


    return (
        <React.Fragment>
            <div className="searchTagIcon" onClick={props.ShowSearchTags}>
                <span  className="icon-M-1lY">
                    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="currentColor"  className="Icon">
                        <path fill-rule="evenodd" d="M19.976 11.421l-1.074-6.322-6.323-1.075a1.69 1.69 0 0 0-1.482.474l-6.599 6.61a1.694 1.694 0 0 0-.004 2.396l6.002 6.003c.66.66 1.735.656 2.397-.005l6.609-6.6c.403-.4.563-.96.474-1.481zM17 9.499a2.501 2.501 0 0 1-5 0 2.5 2.5 0 0 1 5 0z">
                        </path>
                    </svg>
                </span>

                <div>
                <div className="search-tag-ul" onMouseLeave={(e) => this.onCloseSearchTags(e)}>
                                    <ul onMouseOver={props.onShowSearchTags}>
                                        <li onMouseOver={props.onShowSearchTags}>test</li>
                                        <li onMouseOver={props.onShowSearchTags}>test2</li>
                                    </ul>
                                </div>
                </div> 
                





            </div>
        </React.Fragment>
    );
}

export default SearchTags;