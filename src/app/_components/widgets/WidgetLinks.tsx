import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

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

const LinkButton = ({ linkData }) => {
  const { network, defaultText, img, baseUrl, handle: linkHandle } = linkData;
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
    } else {
      // If no handle is set, switch to editing mode
      setIsEditing(true);
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

  return (
    <div
      className="border border-[1.5px] border-black rounded-[7px] overflow-hidden"
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
          className="w-[150px] h-[30px] bg-spink px-2 focus:outline-none"
        />
      ) : (
        <button
          onClick={handleButtonClick}
          className="flex items-center justify-center w-[150px] h-[30px] p-2"
        >
          <Image src={img} alt={network} width={20} height={20} />
          <div className="flex-1 overflow-clip">
            {handle || defaultText}
          </div>{" "}
          <Image
            onClick={handleEditSignClick}
            src={"/addlink.svg"}
            alt={network}
            width={20}
            height={20}
          />
        </button>
      )}
    </div>
  );
};

const Links = [
  {
    network: "twitter",
    defaultText: "add handle",
    img: "/x.svg",
    baseUrl: "https://twitter.com/",
  },
  {
    network: "farcaster",
    defaultText: "add handle",
    img: "/farcaster.svg",
    baseUrl: "https://farcaster.xyz/",
    handle: "",
  },
  {
    network: "github",
    defaultText: "add handle",
    img: "/github.svg",
    baseUrl: "https://github.com/",
    handle: "qpwedev",
  },
];
const WidgetLinks = () => {
  return (
    <div className="flex gap-4 w-full flex-wrap">
      {Links.map((linkData, index) => (
        <LinkButton key={index} linkData={linkData} />
      ))}
    </div>
  );
};

export default WidgetLinks;
