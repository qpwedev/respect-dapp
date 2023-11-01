import { ethers } from 'ethers';

export const encodeAttestation = (types: string[], values: string[]) => {
    const encodedStruct = ethers.utils.defaultAbiCoder.encode(
        types,
        values
    );
    return encodedStruct;
}
