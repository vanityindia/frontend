/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteEvent } from "../../actions/profile";
import nounPlus from "../../images/icons/noun_Plus_2310779.svg";

const GroupProfileEvent = ({
  events: { _id, event, date, description },
  deleteEvent,
}) => (
  <div className="btn-gray btn-gray-1">
    <div className="flex-1">
      <div className="prof-dp-2"></div>
      <div className="m-1">
        {event} - <Moment format="YYYY">{date}</Moment>
        <a className="cross-5" onClick={() => deleteEvent(_id)}>
          <img src={nounPlus} alt="" />
        </a>
        <br />
        <p className="font-light">{description}</p>
      </div>
    </div>
  </div>
);

GroupProfileEvent.propTypes = {
  events: PropTypes.object.isRequired,
};

export default connect(null, { deleteEvent })(GroupProfileEvent);
