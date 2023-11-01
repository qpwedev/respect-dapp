import * as React from "react";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import WidgetContainer from "./WidgetContainer";
import { twMerge } from "tailwind-merge";
import { toast } from "react-toastify";

type WidgetRespectButtonProps = {
  subject: string;
};

export const WidgetRespectButton: React.FC<WidgetRespectButtonProps> = (
  props,
) => {
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    chainId: 59140,
    address: "0x156f783Dc61167939EAd6F711c6A6c030F2f718e",
    abi: [
      {
        inputs: [
          {
            components: [
              {
                internalType: "bytes32",
                name: "schemaId",
                type: "bytes32",
              },
              {
                internalType: "uint64",
                name: "expirationDate",
                type: "uint64",
              },
              {
                internalType: "bytes",
                name: "subject",
                type: "bytes",
              },
              {
                internalType: "bytes",
                name: "attestationData",
                type: "bytes",
              },
            ],
            internalType: "struct AttestationPayload",
            name: "attestationPayload",
            type: "tuple",
          },
          {
            internalType: "bytes[]",
            name: "validationPayload",
            type: "bytes[]",
          },
        ],
        name: "attest",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
    ],
    functionName: "attest",
    args: [
      [
        "0x7644469043E6CE9F4D288DCF021AA6F9022075E15F6746FDFED8C8EBEED558EE",
        7777777777,
        props.subject,
        "0x000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000007726573706563740000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000234c6f76656c79207265737065637420666f72206120667269656e64206f66206d696e650000000000000000000000000000000000000000000000000000000000",
      ],
      [],
    ],
  });
  const { data, error, isError, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  React.useEffect(() => {
    if (isPrepareError || isError) {
      if (error?.name === "TransactionExecutionError") {
        toast.error(`Transaction was rejected`);
      } else {
        toast.error(
          `Error: ${(prepareError || error)?.message.slice(0, 70)}...`,
        );
      }
    }
  }, [isPrepareError, isError, prepareError, error]);

  return (
    <button
      className="w-full transition"
      disabled={!write || isLoading || isSuccess}
      onClick={write}
    >
      <WidgetContainer
        className={twMerge(
          "cursor-pointer border-spink p-3 text-[24px] font-light transition hover:bg-spink hover:text-black",
          isLoading ? "animate-pulse" : "",
          isSuccess
            ? "hover:-translate-y-[0px] hover:bg-black hover:text-white "
            : "",
        )}
      >
        {isLoading ? (
          "RESPECTING..."
        ) : isSuccess ? (
          <a
            className="underline"
            href={`https://testnet.lineascan.build/tx/${data?.hash}`}
            target="_blank"
          >
            Check your attestation on Lineascan
          </a>
        ) : (
          "GIVE RESPECT"
        )}
      </WidgetContainer>
    </button>
  );
};
