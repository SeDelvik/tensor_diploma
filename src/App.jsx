import {
    BrowserRouter as Router,
    Routes,
    Route,
    useNavigate
  } from "react-router-dom";

import imgGlass from './data/images/magnifying-glass.png'
import imgLogo from './data/images/logo.png'
import { MainProps } from './props/MainProps'
import { SearchProps } from './props/SearchProps';

function App() {
    const history = useNavigate(); 
    return (
        
            <div className="main">
                <div className="head">
                    <div className="logo"><a href="/"><img src={imgLogo} /></a></div>
                    <form className="search_main" onSubmit={
                        (e) => {
                            e.preventDefault();
                            let searchText = document.getElementsByClassName('search_field')[0].value;
                            if(searchText !=''){
                                history('/search/'+searchText);
                            }
                        }
                    }>
                        <input className="search_field" />
                            <img className="search_img" src={imgGlass} onClick={() => {
                                let searchText = document.getElementsByClassName('search_field')[0].value;
                                if(searchText !=''){
                                    history('/search/'+searchText);
                                }
                            }} />
                        
                    </form>
                </div>
                <Routes>
                    <Route path="/" element={<MainProps/>}/>
                    <Route path="/search/:text" element={<SearchProps />}/>
                </Routes>
                <div className="footer">
                    <div className="footer_about">
                        <div className="footer_about_block">
                            <div className="footer_title">Company</div>
                            <a href="//" className="footer_text">About</a>
                            <a href="//" className="footer_text">Contact us</a>
                            <a href="//" className="footer_text">Jobs</a>
                        </div>
                        <div className="footer_about_block">
                            <div className="footer_title">Help</div>
                            <a href="//" className="footer_text">Track My Music</a>
                            <a href="//" className="footer_text">Community Support</a>
                            <a href="//" className="footer_text">Community Guidelines</a>
                            <a href="//" className="footer_text">Help</a>
                        </div>
                        <div className="footer_about_block">
                            <div className="footer_title">Goodies</div>
                            <a href="//" className="footer_text">Download Scrobbler</a>
                            <a href="//" className="footer_text">Developer API</a>
                            <a href="//" className="footer_text">Free Music Downloads</a>
                            <a href="//" className="footer_text">Merchandise</a>
                        </div>
                        <div className="footer_about_block">
                            <div className="footer_title">Account</div>
                            <a href="//" className="footer_text">Sign Up</a>
                            <a href="//" className="footer_text">Log In</a>
                            <a href="//" className="footer_text">Subscribe</a>
                        </div>
                        <div className="footer_about_block">
                            <div className="footer_title">Folllow us</div>
                            <a href="//" className="footer_text">Facebook</a>
                            <a href="//" className="footer_text">Twitter</a>
                            <a href="//" className="footer_text">Instagram</a>
                            <a href="//" className="footer_text">YouTube</a>
                        </div>
                    </div>
                    <div className="footer_other">
                        <div className="selected_lang"> lang</div>
                        <a href="//" className="lang"> lang</a>
                        <a href="//" className="lang"> lang</a>
                        <a href="//" className="lang"> lang</a>
                    </div>
                    <div className="footer_inf">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                        nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
                        esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum.
                    </div>
                </div>
            </div>
    );
}

export default App;
