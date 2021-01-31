/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { getBuddiesById } from "../../actions/profile";
import { getChats, afterPostMessage } from "../../actions/chat";
import { connect, useSelector } from "react-redux";
import moment from "moment";
import sendbutton from "../../images/sendbutton.svg";
import attach from "../../images/attach.svg";
import logo from "../../images/dummyimage.jpg";
import emoji from "../../images/emoji.svg";
import path from "../../images/path.svg";
import call from "../../images/call.png";
import videocall from "../../images/videocall.png";

const socket = io(process.env.REACT_APP_API_URL, {
  query: { token: localStorage.getItem("token") },
  transports: ["websocket"],
});

const ChatPage = ({
  auth,
  getBuddiesById,
  getChats,
  afterPostMessage,
  profile: { profile, buddies },
  chat: { chats },
}) => {
  // const buddy = useSelector(state => state.profile);
  const dummy = useRef();
  const [formValue, setFormValue] = useState("");
  const [chatStarted, setChatStarted] = useState(false);
  const [chatUser, setChatUser] = useState("");
  const [chatUserImage, setChatUserImage] = useState(logo);
  const [userUid, setUserUid] = useState(null);

  useEffect(() => {
    getBuddiesById(auth.user._id);
    getChats();
    socket.on("Output Chat Message", (messageFromBackend) => {
      afterPostMessage(messageFromBackend);
    });
  }, [afterPostMessage, getBuddiesById, getChats, auth.user._id]);

  const sendMessage = async (e) => {
    e.preventDefault();
    const chatMessage = formValue;
    const userId = auth.user._id;
    const userName = auth.user.userName;
    const userImage = auth.user.avatar;
    const nowTime = moment();
    const type = "Text";
    socket.emit("Input Chat Message", {
      chatMessage,
      userId,
      userName,
      userImage,
      nowTime,
      type,
    });
    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div id="full-chat">
      <aside id="fullchat-left">
        <div className="fullchat-lefttop">
          <div
            style={{
              background: `url(${
                auth.user.avatar ? auth.user.avatar : logo
              }) no-repeat center center/contain`,
            }}
            className="dp"
          ></div>
          <div>
            <input
              type="search"
              name="search"
              placeholder="Search People & Groups"
            />
          </div>
        </div>
        <div className="fullchat-leftcontainer">
          <div className="fullchat-leftbody">
            <div className="chats">
              <div className="chats-heading">
                <h3>
                  Chats <span className="blue">(2)</span>
                </h3>
                <a type="button" className="blue">
                  See More
                </a>
              </div>
              <div className="fullchat-chatgrid">
                <div className="dp"></div>
                <div className="flex-column-1">
                  <div className="chat-name">
                    <a href="#">Felecia Rower</a>
                  </div>
                  <div className="chat-body">
                    <p>Lorem ipsum dolor sit amet.</p>
                    <div className="bubble">
                      <p>2</p>
                    </div>
                  </div>
                </div>
              </div>
              <hr className="hori-2" />
              <div className="fullchat-chatgrid">
                <div className="dp-4"></div>
                <div className="flex-column-1">
                  <div className="chat-name">
                    <a href="#">Felecia Rower</a>
                  </div>
                  <div className="chat-body">
                    <p>Lorem ipsum dolor sit amet.</p>
                    <div className="bubble">
                      <p>2</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="fullchat-leftbody">
            <div className="chats">
              <div className="chats-heading">
                <h3>
                  Contacts <span className="blue">({buddies.length})</span>
                </h3>
                <a href="#" className="blue">
                  See More
                </a>
              </div>
              {buddies &&
                buddies.map((profile, index) => (
                  <Fragment key={index}>
                    <div
                      onClick={() => {
                        setChatStarted(true);
                        setChatUser(profile?.user?.fullName);
                        setUserUid(profile._id);
                        setChatUserImage(profile.avatar);
                      }}
                      className="fullchat-chatgrid"
                    >
                      <div
                        style={{
                          background: `url(${profile.avatar}) no-repeat center center/cover`,
                        }}
                        className="dp"
                      ></div>
                      <div className="flex-column-1">
                        <div className="chat-name">
                          <a href="#">{profile.user.fullName}</a>
                        </div>
                        <div className="chat-body">
                          <p>Lorem ipsum dolor sit amet.</p>
                          <div className="bubble">
                            <p>2</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr className="hori-2" />
                  </Fragment>
                ))}
            </div>
          </div>
        </div>
      </aside>
      <section id="fullchat-right">
        <div className="fullchat-maintop">
          <div className="fullchat-maintop-left">
            <div
              style={{
                background: `url(${chatUserImage}) no-repeat center center/cover`,
              }}
              className="dp-4"
            ></div>
            <div className="flex-column">
              <div className="chat-name">
                <a href="#">{chatUser}</a>
              </div>
              <div className="chat-body">
                <p>Active Now</p>
              </div>
            </div>
          </div>
          <div className="fullchat-maintop-right">
            <div className="m-1">
              <a href="#">
                <img src={videocall} alt="" />
              </a>
            </div>
            <div className="m-1">
              <a href="#">
                <img src={call} alt="" />
              </a>
            </div>
            <div className="m-1">
              <a href="#">
                <img src={attach} alt="" />
              </a>
            </div>
            <div>
              <a href="#">
                <img src={path} alt="" />
              </a>
            </div>
          </div>
        </div>
        <div className="fullchat-mainbody">
          <div className="fullchat-mainbody-container">
            <div className="flex-c">
              {chats &&
                chats.map((chat) => (
                  <div
                    key={chat._id}
                    className={`${
                      auth.user._id === chat.sender._id
                        ? "flex-c-r"
                        : "flex-c-2"
                    }`}
                  >
                    <div className="flex-c-r-left">
                      <p className="b-1">{chat.message}</p>
                      <small>{chat.createdAt}</small>
                    </div>
                    <span
                      style={{
                        background: `url(${chat.sender.avatar}) no-repeat center center/cover`,
                      }}
                      className={`${
                        auth.user._id === chat.sender._id
                          ? "dp-4-1 flex-c-r-right"
                          : "dp-2"
                      }`}
                    ></span>
                  </div>
                ))}
              <div ref={dummy}></div>
            </div>
          </div>
        </div>

        <div className="fullchat-type">
          <div className="form-grid">
            <div className="form-flex-left">
              <textarea
                type="text"
                name="typemessage"
                value={formValue}
                placeholder="Type your Message"
                onChange={(e) => setFormValue(e.target.value)}
                rows="1"
              ></textarea>
              <a href="#">
                <img src={emoji} alt="" />
              </a>
              <a href="#">
                <img src={attach} alt="" />
              </a>
            </div>
            <div className="form-flex-right">
              <a type="submit">
                <img src={sendbutton} onClick={sendMessage} alt="" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  chat: state.chat,
});

export default connect(mapStateToProps, {
  getBuddiesById,
  getChats,
  afterPostMessage,
})(ChatPage);
