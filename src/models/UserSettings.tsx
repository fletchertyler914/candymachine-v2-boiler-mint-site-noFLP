import * as anchor from '@project-serum/anchor';

export interface WhitelistSettings {
  enabled: boolean;
  title: string;
  desc: string | undefined;
  countdown: boolean;
  startDate: anchor.BN;
  endDate: anchor.BN;
  enableCustomHTML: boolean;
}

export interface MintPanic {
  enabled: boolean;
  title: string;
  desc: string;
}

export interface PublicSaleSettings {
  title: string;
  desc: string | undefined;
  countdown: boolean;
  startDate: anchor.BN;
  endDate: anchor.BN | undefined;
  enableCustomHTML: boolean;
}

export interface WelcomeSettings {
  title: string;
  desc: string | undefined;
  countdownEnable: boolean;
  countdownTo: anchor.BN | undefined;
  showPrice: boolean;
  enableCustomHTML: boolean;
}
