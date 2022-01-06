import { useCallback, useEffect, useMemo, useState } from 'react';
import logo from '../media/logo.svg';
import '../App.scss';
import tgImage from '../media/telegram-icon.svg';
import twImage from '../media/twitter-icon.svg';
import mdImage from '../media/md.svg';
import dcImage from '../media/discord-icon.svg';
import mintWorld from '../media/mint-world.svg';
import scape from '../media/scape.png';
import ImageService from '../services/ImageService';
import { css } from '@emotion/react';
import FadeLoader from 'react-spinners/FadeLoader';
import ReactGA from 'react-ga';
import IImageData from '../models/ImageData';
import { ScapesBuilder } from './ScapesBuilder';
import { useWallet } from '@solana/wallet-adapter-react';
import { useScapesElements } from '../hooks/useScapesElements';
import CandyMachine from './CandyMachine';
// import { Roadmap } from './Roadmap';

// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');

const override = css`
  display: block;
  margin: 0 auto;
  border-color: black;
`;

const DEFAULT_OPTION_INDEX = 0; // 0 = None, 1 = Random

enum ErrorTypes {
  ScapeAlreadyMinted = 'This Scape Already Exist!',
  ServerError = 'An Error Has Occured, Please Try Again.',
}

export function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorTypes | null>(null);
  const { publicKey } = useWallet();

  const [isPreseason, setIsPreseason] = useState(false);
  const [isWhitelisted, setIsWhitelisted] = useState(false);
  const [img, setImg] = useState(scape);
  const [scapeModel, setScapeModel] = useState<IImageData>();
  const [isMobileScapeVisible, setIsMobileScapeVisible] = useState(false);

  const { elementOptions } = useScapesElements();

  // Element Options Without Color Pops Option
  const availableElementOptions = useMemo(
    () => elementOptions.filter((option) => option.id !== 11), // Render Color Pop As Toggle
    [elementOptions]
  );

  const toggleMobileScape = useCallback(() => {
    setIsMobileScapeVisible(!isMobileScapeVisible);

    if (isMobileScapeVisible) {
      document.body.style.overflow = 'unset';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }, [isMobileScapeVisible]);

  const sendBuildImageRequest = useCallback(
    (randomScapeModel?: IImageData) => {
      const modelToBuild = randomScapeModel || scapeModel;
      if (modelToBuild && Object.keys(modelToBuild).length > 0) {
        setLoading(true);
        setError(null);

        if (isMobileScapeVisible) {
          toggleMobileScape();
        }

        ImageService.create(modelToBuild as IImageData)
          .then((response) => {
            const { image, isExisting } = response.data;

            if (!isExisting) {
              ReactGA.event({
                category: 'User',
                action: 'Img updated- {wallet_id} - {elements array}',
              });

              setImg('data:image/png;base64,' + image);
              setLoading(false);
            } else {
              setError(ErrorTypes.ScapeAlreadyMinted);
              setLoading(false);
              // toast.error(
              //   'This Scape Already Exist! Please Make Another Selection.'
              // );
            }
          })
          .catch((e) => {
            console.error(e);
            setError(ErrorTypes.ServerError);
            setLoading(false);
            // toast.error('An Error Has Occured, Please Refresh The Page.');
          });
      }
    },
    [scapeModel, isMobileScapeVisible, toggleMobileScape]
  );

  const updateElementValue = (elementToUpdate: Partial<IImageData>) => {
    if (elementToUpdate) {
      const { key, value } = Object.entries(elementToUpdate).map(
        ([key, value]) => ({ key, value })
      )[0];

      setScapeModel({
        ...scapeModel,
        [key]: value,
      } as IImageData);
    }
  };

  const updateElementAndBuild = (elementToUpdate: Partial<IImageData>) => {
    updateElementValue(elementToUpdate);
  };

  // const randomScapeModel = useMemo(() => {
  //   if (availableElementOptions.length > 0) {
  //     // Initialize Random Scape Model
  //     const randomScapeModel = availableElementOptions.reduce(
  //       (acc, option) => ({
  //         ...acc,
  //         [option.name]: option.elements[1].id,
  //       }),
  //       {} as IImageData
  //     );
  //     // Bubble Toogle State (On/Off)
  //     // 93 === ON / 94 === OFF
  //     randomScapeModel.ColorPops = 94;

  //     return randomScapeModel;
  //   }
  // }, [availableElementOptions]);

  const defaultScapeModel = useMemo(() => {
    if (availableElementOptions.length > 0) {
      if (!scapeModel) {
        // Initialize Random Scape Model
        const defaultModel = availableElementOptions.reduce(
          (acc, option) => ({
            ...acc,
            [option.name]: option.elements[DEFAULT_OPTION_INDEX].id,
          }),
          {} as IImageData
        );
        // Bubble Toogle State (On/Off)
        // 93 === ON / 94 === OFF
        defaultModel.ColorPops = 94;

        return defaultModel;
      }
    }
  }, [availableElementOptions, scapeModel]);

  useEffect(() => {
    if (defaultScapeModel) {
      setScapeModel(defaultScapeModel);
    }
  }, [defaultScapeModel]);

  useEffect(() => {
    if (availableElementOptions.length > 0) {
      // Update Whitelist Status
      const isWhitlisted = availableElementOptions.some((e) =>
        e.elements.some((el: any) => el.isWhitelisted)
      );
      setIsWhitelisted(isWhitlisted);

      // Update Whitelist Status
      const isPreseason = availableElementOptions.some((e) =>
        e.elements.some((el: any) => el.isPreSeason)
      );
      setIsPreseason(isPreseason);
    }
  }, [availableElementOptions]);

  useEffect(() => {
    if (scapeModel && !isMobileScapeVisible) {
      sendBuildImageRequest(scapeModel);
    }
  }, [scapeModel, isMobileScapeVisible, sendBuildImageRequest]);

  return (
    <div className='app'>
      <header>
        <div className='container'>
          <div className='header'>
            <span className='logo'>
              <img
                className='logo__img img-responsive'
                src={logo}
                alt='Scapes logo'
              />
              <span className='logo__text font-podkova'>SCAPES</span>
            </span>
            {/* <span className='flex'>
              <WalletModalProvider logo='LOGO_URL_HERE'>
                <WalletMultiButton />
              </WalletModalProvider>
            </span> */}
          </div>
        </div>
      </header>
      <div className='container hide-md'>
        <div className='sold-counter'>{/* <b>1000</b>/1000 sold */}</div>
      </div>
      <div className='top-bg-container'>
        <div className='top-bg-bg'></div>
        <div className='container'></div>
      </div>
      <div className='build-scape-container mb-16'>
        <div className='container'>
          <div className='build-scape-msg'>
            <span className='build-scape-msg__text'>
              Try out exciting combinations in our Scapes Explorer
            </span>
            <span className='build-scape-msg__btn'>
              <a href='/#buildAScape' className='btn btn-border'>
                Build a scape
              </a>
            </span>
          </div>
        </div>
      </div>
      <div className='mint-world-container'>
        <div className='container mint-world'>
          <div className='row'>
            <div className='col-md-6 col-sm-12 col-np mb-16'>
              <img
                className='mint-world-image'
                alt='Mint world'
                src={mintWorld}
              />
            </div>
            <div className='col-md-6 col-sm-12'>
              <h3 className='mint-world__h3'>Mint your world</h3>
              <div className='mint-world__txt'>
                Mint your world with fantastical wilderness scenes, familiar
                cityscapes, playful oceans, subterranean intrigue, and the
                occasional world-ending disaster.
              </div>
            </div>
            <div className='col-md-6 col-sm-12'>
              <h3 className='mint-world__h3'>Scapes Explorer</h3>
              <div className='mint-world__txt'>
                Explore all the Scapes Elements and how they would fit together
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='scape-container' id='buildAScape'>
        <div className='container scape'>
          {(isPreseason || isWhitelisted) && (
            <div className='special-user-banner'>
              {isPreseason && (
                <span style={{ display: 'flex', flexDirection: 'column' }}>
                  <span>
                    Congratulations! You made the Core Whitelist, giving you
                    exclusive access to the Solset Background element!
                  </span>
                  <span>
                    You will also get access to the OG Whitelist's benefit, with
                    exclusive access to the 7 Wonders of the World Skyline
                    elements.
                  </span>
                </span>
              )}
              {isWhitelisted && (
                <span>
                  Congratulations! You made the OG Whitelist, giving you
                  exclusive access to the 7 Wonders of the World Skyline
                  elements.
                </span>
              )}
            </div>
          )}
          <div
            className={
              'image-scape-container ' +
              (loading ? 'image-scape-container--loader-active' : '')
            }
          >
            <img alt='Scape' className='scape__image' src={img} />
            <div className='loader'>
              <FadeLoader loading={loading} css={override} />
            </div>
          </div>
          <div className='show-md'>
            <div className='scape__headline mb-16'>
              {publicKey
                ? 'Click some elements to change the Scape'
                : 'Select elements for your Scape'}
            </div>
          </div>
          <ScapesBuilder
            scapeModel={scapeModel}
            defaultOptionIndex={DEFAULT_OPTION_INDEX}
            availableElementOptions={availableElementOptions}
            isMobileScapeVisible={isMobileScapeVisible}
            sendBuildImageRequest={sendBuildImageRequest}
            openMobileScape={toggleMobileScape}
            updateElement={updateElementValue}
            updateElementAndBuild={updateElementAndBuild}
          />
          <div className='scape-mobile hide-md'>
            <div className='scape-mobile__btn'>
              <button className='btn' onClick={toggleMobileScape}>
                Change it up
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='better-horizontal mb-20 hide-md hide-landscape'>
        <div className='container'>
          On mobile, Scapes Explorer is best enjoyed in horizontal mode
        </div>
      </div>
      <div className='candy-machine'>
        <div className='container'>
          {/* {!!publicKey && (
            <CandyMachine
              wallet={(window as any).solana}
              scapeModel={scapeModel}
              hasOtherErrors={!!error}
            />
          )} */}
          <CandyMachine scapeModel={scapeModel} />
        </div>
      </div>

      {/* <Roadmap /> */}

      <footer>
        {/* <div>
          <ToastContainer
            position='bottom-center'
            autoClose={5000}
            hideProgressBar
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            toastStyle={{ backgroundColor: '#85C300' }}
          />
          <ReactTooltip />
        </div> */}

        <div className='hr'></div>
        <div className='container'>
          <div className='footer__content'>
            <div className='copyrights show-md'>© 2021 Scapes</div>
            <div className='follow-links'>
              <a href='https://discord.gg/scapes'>
                <span>
                  <img alt='Join our discord chanel' src={dcImage} />
                  Join Discord
                </span>
              </a>
              <a href='https://twitter.com/scapesnft'>
                <span>
                  <img alt='Follow us on Twitter' src={twImage} /> Follow us
                </span>
              </a>
              <a href='https://t.me/scapesnft'>
                <span>
                  <img alt='Join us on telegram channel' src={tgImage} />
                  Join channel
                </span>
              </a>
              <a href='https://scapesnft.medium.com'>
                <span>
                  <img alt='Read us on Medium' src={mdImage} /> Read
                </span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
