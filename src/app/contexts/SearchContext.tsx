"use client";

import { ReactNode, createContext, useState } from "react";

type SearchContextType = {
  searchAddress: string;
  setSearchAddress: React.Dispatch<React.SetStateAction<string>>;
};

export const SearchContext = createContext<SearchContextType | undefined>(
  undefined,
);

const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchAddress, setSearchAddress] = useState("");

  return (
    <SearchContext.Provider value={{ searchAddress, setSearchAddress }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
