import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import add from '../../images/noun_Add Friend_2987727 (2) 2.svg';
import mail from '../../images/noun_Mail_681595.svg';
import { connect } from 'react-redux';
import { sendBuddyRequest, getProfileById } from '../../actions/profile';

const RequestButton = ({
  peerid,
  reloadid,
  sendBuddyRequest,
  getProfileById,
  profile: { profile },
  isGroup,
  user,
}) => {
  const [btn, setBtn] = useState({ text: 'Button Loading', disabled: true });

  const findRequestState = () => {
    let { requests, buddies } = profile;

    let exists;

    // Check if they're friends already
    exists = buddies.filter((buddy) => buddy === user._id);
    if (exists.length > 0) {
      return setBtn({
        text: 'friend',
        disabled: true,
      });
    }

    // Check if peer sent a request
    // exists = requests.map((request) => request === user._id);
    // if (exists.length > 0) {
    //   return setBtn({
    //     text: 'Accept request',
    //     disabled: false,
    //   });
    // }

    // Check if you have sent a request
    exists = requests.filter((request) => request === user._id);
    if (exists.length > 0) {
      return setBtn({
        text: 'requested',
        disabled: true,
      });
    }

    // Set to default
    return setBtn({
      text: 'Connect',
      disabled: false,
    });
  };

  useEffect(() => {
    findRequestState();
    //eslint-disable-next-line
  }, []);

  const sendRequest = async () => {
    await sendBuddyRequest(peerid);
    getProfileById(reloadid);
  };

  const onClick = () => {
    if (!btn.disabled) {
      sendRequest();
    }
  };

  return (
    <Fragment>
      <div className='btns'>
        <a
          href='#!'
          className={`btn-white ${btn.text}`}
          disabled={btn.disabled}
          onClick={() => onClick()}
        >
          <img className='resize' src={add} alt='' />
          {btn.text}
        </a>
        <a href='#!' className='btn-yellow'>
          <img className='resize' src={mail} alt='' />
          Message
        </a>
      </div>
    </Fragment>
  );
};

RequestButton.propTypes = {
  sendBuddyRequest: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, {
  sendBuddyRequest,
  getProfileById,
})(RequestButton);
