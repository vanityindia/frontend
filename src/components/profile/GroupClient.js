import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteClient } from '../../actions/profile';
import nounPlus from '../../images/icons/noun_Plus_2310779.svg';

const GroupClient = ({ client: { _id, client }, deleteClient }) => {
  return (
    <div className='flex-1 btn-gray'>
      <div className='prof-dp-1'>
        <img src='./images/Image 135.png' alt='' />
      </div>
      <div className='m-1'>
        <p>{client}</p>
        <a href='#!' className='cross-5' onClick={() => deleteClient(_id)}>
          <img src={nounPlus} alt='' />
        </a>
      </div>
    </div>
  );
};

GroupClient.propTypes = {
  client: PropTypes.object.isRequired,
};

export default connect(null, { deleteClient })(GroupClient);
