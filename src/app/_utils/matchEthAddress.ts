export const matchEthAddress = (address: string) => {
    return address.toLowerCase().match(/(\b0x[a-f0-9]{40}\b)/g);
  };
  