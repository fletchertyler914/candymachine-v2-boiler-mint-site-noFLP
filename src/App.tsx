import { useCallback, useMemo } from 'react';
import './App.scss';
import ReactGA from 'react-ga';
import { clusterApiUrl } from '@solana/web3.js';
import 'react-toastify/dist/ReactToastify.css';
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork, WalletError } from '@solana/wallet-adapter-base';
import {
  getPhantomWallet,
  getSlopeWallet,
  getSolflareWallet,
  getLedgerWallet,
  getSolletWallet,
  getSolletExtensionWallet,
} from '@solana/wallet-adapter-wallets';
import { Home } from './components/Home';

import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';

const TRACKING_ID = 'UA-211792149-1';

ReactGA.initialize(TRACKING_ID);

ReactGA.event({
  category: 'User',
  action: 'Site visited',
});

const App = () => {
  const network = process.env.REACT_APP_SOLANA_NETWORK as WalletAdapterNetwork;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
  // Only the wallets you configure here will be compiled into your application, and only the dependencies
  // of wallets that your users connect to will be loaded
  const wallets = useMemo(
    () => [
      getPhantomWallet(),
      getSlopeWallet(),
      getSolflareWallet(),
      getLedgerWallet(),
      getSolletWallet({ network }),
      getSolletExtensionWallet({ network }),
    ],
    [network]
  );

  const onError = useCallback((error: WalletError) => {
    console.log('Wallet error:', error.message, error);
  }, []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} onError={onError} autoConnect>
        <WalletModalProvider>
          <Home />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default App;
