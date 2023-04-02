import { createContext, useContext, type ReactNode } from "react";
import { createApiClient } from "../utils";

const context = createContext<ReturnType<typeof createApiClient> | null>(null);

export const useApiClient = () => {
  return useContext(context)!;
};

useApiClient.Provider = ({
  client,
  children,
}: {
  client: ReturnType<typeof createApiClient>;
  children: ReactNode;
}) => <context.Provider value={client}>{children}</context.Provider>;
