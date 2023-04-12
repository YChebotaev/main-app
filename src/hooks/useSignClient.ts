import { useState, useEffect } from 'react'
import SignClient from "@walletconnect/sign-client";

export const useSignClient = () => {
  const [signClient, setSignClient] = useState<SignClient | null>(null);

  useEffect(() => {
    SignClient.init({
      projectId: process.env["REACT_APP_WALLET_CONNECT_PROJECT_ID"]!,
    }).then((client) => {
      setSignClient(client);
    });
  }, []);

  return signClient
}
