import React, { Fragment } from 'react';
import perry from '../../../images/perry2.png';
import volo from '../../../images/volodymy2.png';

const Page2 = () => {
  return (
    <Fragment>
      <div id='page-3' className='page3-columns page'>
        <div className='container'>
          <div className='column'>
            <div className='column-2'>
              <h1 className='ft-heading ft-heading-light'>
                Connect and Collaborate
              </h1>
              <p className='ft-para ft-para-light'>
                Stay connected & maintain your connections with industry
                professionals, college friends, aspiring talents and locate
                collaboration opportunities.
              </p>
            </div>

            <div className='column-1'>
              <img className='collobrate' src={perry} alt='collobrate' />
              <br />
              <img src={volo} alt='chat' />
            </div>
          </div>
        </div>

        {/* <div className='box-4'>
          <ul>
            <li className='item'>
              <a href='#'></a>
            </li>
            <li className='item'>
              <a href='#'></a>
            </li>
            <li className='item'>
              <a href='#'></a>
            </li>
            <li className='item'>
              <a href='#'></a>
            </li>
            <li className='item'>
              <a href='#'></a>
            </li>
            <li className='item'>
              <a href='#'></a>
            </li>
            <li className='item'>
              <a href='#'></a>
            </li>
          </ul>
        </div> */}
      </div>
    </Fragment>
  );
};

export default Page2;
