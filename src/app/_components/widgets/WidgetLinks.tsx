import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

// Custom hook to detect clicks outside of the provided ref
function useOutsideClickDetector(ref, onOutsideClick) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onOutsideClick();
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onOutsideClick]);
}

const LinkButton = ({
  linkData,
  disabled,
  myself,
}: {
  linkData: LinkData;
  disabled: boolean;
  myself: boolean;
}) => {
  const {
    network,
    defaultText,
    img,
    baseUrl,
    handle: linkHandle,
    disabledText,
  } = linkData;
  const [isEditing, setIsEditing] = useState(false);
  const [handle, setHandle] = useState(linkHandle || "");
  const wrapperRef = useRef(null);

  const inputRef = useRef(null);

  useEffect(() => {
    // If isEditing is true, focus on the input
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  useOutsideClickDetector(wrapperRef, () => {
    if (isEditing) {
      setIsEditing(false);
      // Keep the input empty if the user didn't enter a handle
      if (!handle.trim()) {
        setHandle(""); // Maintain an empty state
      }
    }
  });

  const handleEditSignClick = (e) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleButtonClick = () => {
    if (handle) {
      // If a handle is set, open the URL in a new tab
      window.open(`${baseUrl}${handle}`, "_blank");
    }
  };

  const handleInputChange = (e) => {
    setHandle(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      if (!handle.trim()) {
        setHandle(""); // Maintain an empty state
        setIsEditing(false); // End editing mode
      } else {
        setIsEditing(false);
        sendHandleToServer(handle); // Send the handle to the server if it's not empty
      }
    }
  };

  const sendHandleToServer = (handle) => {
    // Placeholder for a server request
    console.log(`Sending handle ${handle} to server...`);
  };

  if (disabled) {
    return (
      <div
        className="overflow-hidden rounded-[7px] border-[1.5px] border-[#818181] text-[#818181"
        ref={wrapperRef}
        style={{ display: "inline-block" }}
      >
        <button
          disabled
          className="flex h-[30px] w-[150px] items-center justify-center p-2 "
        >
          <Image
            src={"/" + "gray." + img.replace("/", "")}
            alt={network}
            width={20}
            height={20}
          />
          <div className="flex-1 overflow-clip">{disabledText}</div>{" "}
        </button>
      </div>
    );
  }

  return (
    <div
      className={
        "overflow-hidden rounded-[7px] border border-[1.5px] border-black"
      }
      ref={wrapperRef}
      style={{ display: "inline-block" }}
    >
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={handle}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          className="h-[30px] w-[150px] bg-spink px-2 focus:outline-none"
        />
      ) : (
        <button
          onClick={handleButtonClick}
          className={twMerge(
            "flex h-[30px] w-[150px] items-center justify-center p-2",
            handle ? "cursor-pointer" : "cursor-default",
          )}
        >
          <Image src={img} alt={network} width={20} height={20} />
          <div className="flex-1 overflow-clip">
            {handle || defaultText}
          </div>{" "}
          {myself && (
            <Image
              className="cursor-pointer"
              onClick={handleEditSignClick}
              src={"/addlink.svg"}
              alt={network}
              width={20}
              height={20}
            />
          )}
        </button>
      )}
    </div>
  );
};

interface LinkData {
  network: string;
  defaultText: string;
  disabledText: string;
  img: string;
  baseUrl: string;
  handle?: string;
}

const Links: LinkData[] = [
  {
    network: "twitter",
    defaultText: "add handle",
    img: "/x.svg",
    baseUrl: "https://twitter.com/",
    disabledText: "No link yet",
  },
  {
    network: "farcaster",
    defaultText: "add handle",
    img: "/farcaster.svg",
    baseUrl: "https://farcaster.xyz/",
    disabledText: "No link yet",
  },
  {
    network: "github",
    defaultText: "add handle",
    img: "/github.svg",
    baseUrl: "https://github.com/",
    disabledText: "No link yet",
  },
];

const WidgetLinks = ({
  userLinks,
  myself,
}: {
  userLinks: any;
  myself: boolean;
}) => {
  return (
    <div className="flex w-full flex-wrap gap-4">
      {Links.map((linkData, index) => {
        let disabled = false;

        if (userLinks[linkData.network]) {
          linkData.handle = userLinks[linkData.network];
        }

        if (!myself && !linkData.handle) {
          disabled = true;
        }

        return (
          <LinkButton
            key={index}
            myself={myself}
            disabled={disabled}
            linkData={linkData}
          />
        );
      })}
    </div>
  );
};

export default WidgetLinks;
