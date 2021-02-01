/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, Fragment, useEffect, useContext } from "react";
import axios from "axios";
import maskGroup from "../../images/maskGroup.svg";
import searchIcon from "../../images/searchIcon.svg";
import home from "../../images/Home.svg";
import chat from "../../images/chat.svg";
import all from "../../images/noun_Friend_2987728.svg";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import { Link, useHistory } from "react-router-dom";
import { SearchContext } from "../../context/search.context";
import { ProfileContext } from "../../context/profile/profile.context";
import ArtTrackIcon from "@material-ui/icons/ArtTrack";
import { grey } from "@material-ui/core/colors";
import logo from "../../images/dummyimage.jpg";

const Navbar = ({ auth, logout }) => {
  const history = useHistory();
  const [displayMenu, toogleMenu] = useState(false);
  const { Addsearch, clearSearch } = useContext(SearchContext);
  const { img, setImg } = useContext(ProfileContext);

  useEffect(() => {
    getProfilepic();
  });

  const _onsearch = async (value) => {
    clearSearch();
    const response = await axios.get(`api/search?title=${value}`);
    console.log(response, "responseresponseresponse");
    if (response) {
      Addsearch(response?.data);
    } else {
      Addsearch([]);
    }
  };
  const getProfilepic = async () => {
    const res = await axios.get("/api/profile/me");
    setImg(res.data?.avatar);
  };

  return (
    <Fragment>
      <div className="navbar">
        <div className="s-logo">
          <a>
            <img src={maskGroup} alt="Vanity" />
          </a>
        </div>

        <div className="container">
          <div className="logo-box"></div>

          <div className="search">
            <input
              type="text"
              onChange={(e) => {
                setTimeout(() => {
                  _onsearch(e.target.value);
                }, 500);
              }}
              className="search-btn"
              placeholder="search"
            />
            <br />
            <img
              onClick={() => {
                history.push("/profiles");
              }}
              src={searchIcon}
              alt="search"
            />
          </div>

          <div className="nav-icons">
            <ul>
              <li>
                <Link className="icon" to="/feed">
                  <img src={home} className="white" alt="portfolioe" />
                </Link>
              </li>
              <li>
                <Link className="port icon" to="/portfolio">
                  <ArtTrackIcon
                    style={{ fontSize: 32, color: grey[600] }}
                    color="action"
                  />
                </Link>
              </li>
              <li>
                <Link to="/profiles" className="calendar icon">
                  <img src={all} alt="home" />
                </Link>
              </li>
              <li>
                <Link to={`/chats/${auth.user._id}`} className="chat icon">
                  <img src={chat} alt="chat" />
                </Link>
              </li>
              <li>
                <img
                  className="dis"
                  src={img ? img : logo}
                  onClick={() => {
                    toogleMenu(true);
                    setTimeout(() => {
                      toogleMenu(false);
                    }, 3000);
                  }}
                  alt=""
                />

                {displayMenu && (
                  <Fragment>
                    <ul className="no-dis" id="dis-dd">
                      <li>
                        <Link to="/profile"> View Profile</Link>
                      </li>
                      <li>
                        <Link to="/invite"> Invite Friends</Link>
                      </li>
                      <li>
                        <a onClick={logout} className="signOut" type="button">
                          Log out
                        </a>
                      </li>
                    </ul>
                  </Fragment>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
