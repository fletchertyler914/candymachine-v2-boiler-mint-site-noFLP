import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { useEffect, useState } from 'react';
import ElementsService from '../services/ElementsService';
import {
  IScapesElement,
  IScapesElementData,
} from '../models/ElementResponseData';

export const useScapesElements = () => {
  const { publicKey } = useWallet();
  const [elementOptions, setElementOptions] = useState<IScapesElementData[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      try {
        const response = await ElementsService.fetch(
          publicKey ? new PublicKey(publicKey) : undefined
        );
        const { elementTypes }: IScapesElement =
          response.data as IScapesElement;

        setElementOptions(elementTypes);
      } catch (error: any) {
        setError(error);
      }

      setIsLoading(false);
    })();
  }, [publicKey]);

  return { elementOptions, error, isLoading };
};
