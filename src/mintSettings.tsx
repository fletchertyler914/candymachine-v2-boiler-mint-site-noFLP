import * as anchor from '@project-serum/anchor';
import React from 'react';

import {
  WhitelistSettings,
  PublicSaleSettings,
  WelcomeSettings,
} from './models/UserSettings';

const WHITELIST_START_DATE = date(
  process.env.REACT_APP_WHITELIST_START_DATE as string
);
const WHITELIST_END_DATE = date(
  process.env.REACT_APP_WHITELIST_END_DATE as string
);

const WHITELIST_ENABLED = !!WHITELIST_START_DATE
  ? process.env.REACT_APP_WHITELIST_ENABLED === 'true'
  : false;

const PUBLIC_START_DATE = date(
  process.env.REACT_APP_PUBLIC_START_DATE as string
);

function date(date: string) {
  let f = new anchor.BN(new Date(date).getTime() / 1000);
  return f;
}

export const mintPanic = {
  enabled: false,
  title: 'Minting Paused',
  desc: 'We have dectected and issue while minting. Standby for an update',
};

///                             ///
///      Welcome Settings       ///
///                             ///

const beforeWhitelistStart = WHITELIST_ENABLED
  ? new Date().getTime() / 1000 <
    new Date(process.env.REACT_APP_WHITELIST_START_DATE as string).getTime() /
      1000
  : false;

const welcomeDescription =
  WHITELIST_ENABLED && beforeWhitelistStart
    ? 'Hang tight, the whitelist sale will begin soon!'
    : 'Hang tight, the public sale will begin soon!';

export const welcomeSettings: WelcomeSettings = {
  //Title and Description
  title: 'Welcome!',
  desc: welcomeDescription,

  // Countdown Timer
  countdownEnable: true,
  countdownTo: WHITELIST_ENABLED ? WHITELIST_START_DATE : PUBLIC_START_DATE,

  // showprice
  showPrice: true,

  //Enable Custom HTML
  enableCustomHTML: false,
};

export class MintWelcomeCustomHTML extends React.Component {
  render() {
    return (
      <div className='custom-mint-container'>
        {/* Add Custom HTML code for Welcome Here! */}

        <p>Test 1</p>

        {/* End */}
      </div>
    );
  }
}

///                             ///
///   Whitelist Sale Settings   ///
///                             ///

// The white list does NOTHING to the candy machine itself. It just enables the mint button
// on the site so people can purchase as long as you have the SLP token's set up for you
// whitelist. If your candy machine is not set up for SLP token whitelist purchasing then
// all transations will fail, all transactions will fail for people who also do not hold the
// SLP token. This also does not stop people minting directly from the program.
export const whitelistSettings: WhitelistSettings = {
  //If you want to use the whitelist feature enable it.
  enabled: true,

  startDate: WHITELIST_START_DATE,
  endDate: WHITELIST_END_DATE,
  countdown: true,

  //Wallet Title and Description
  title: 'Whitelist Sale',
  desc: 'Whitelist Sale Active!',

  //Enable Custom HTML Below
  enableCustomHTML: false,
};

export class MintWhitelistCustomHTML extends React.Component {
  render() {
    return (
      <div className='custom-mint-container'>
        {/* Add Custom HTML code for Whitelist Stage Here! */}

        <p>Test 2</p>

        {/* End */}
      </div>
    );
  }
}

///                             ///
///     Public Sale Settings    ///
///                             ///

export const publicSaleSettings: PublicSaleSettings = {
  //start date and end date must match your Candy Machine Config for public launch!

  startDate: PUBLIC_START_DATE,
  endDate: undefined,
  countdown: !WHITELIST_ENABLED,
  //Example date below
  // date('29 2021 00:00:00 GMT')

  //Title and Description
  title: 'Public Sale',
  desc: 'Sale is now live. Mint your NFT below',

  //Enable Custom HTML
  enableCustomHTML: false,
};

export class MintPublicSaleCustomHTML extends React.Component {
  render() {
    return (
      <div className='custom-mint-container'>
        {/* Add Custom HTML code for Public Minting Here! */}

        <p>Test 3</p>

        {/* End */}
      </div>
    );
  }
}
