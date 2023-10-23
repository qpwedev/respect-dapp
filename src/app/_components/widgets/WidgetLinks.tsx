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

const LinkButton = ({ network }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [handle, setHandle] = useState(network);
  const wrapperRef = useRef(null); // Ref for the wrapper div

  useOutsideClickDetector(wrapperRef, () => {
    // Revert to button view if editing and clicked outside
    if (isEditing) {
      setIsEditing(false);
      setHandle(network); // reset the handle if clicked outside
    }
  });

  const handleButtonClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setHandle(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      setIsEditing(false);
      sendHandleToServer(handle); // mock sending the handle to the server
    }
  };

  const sendHandleToServer = (handle) => {
    // Simulate a network request here. You'd replace this with your actual network request in a real application.
    console.log(`Sending handle ${handle} to server...`);
  };

  return (
    <div
      className="border border-[1.5px] border-black rounded-[7px] overflow-hidden"
      ref={wrapperRef}
      style={{ margin: "0.5rem", display: "inline-block" }}
    >
      {isEditing ? (
        <input
          type="text"
          value={handle}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          style={{ width: "150px", height: "30px", padding: "5px" }} // Set width and height
        />
      ) : (
        <button
          onClick={handleButtonClick}
          style={{ width: "150px", height: "30px", padding: "5px" }} // Set width and height
        >
          {handle}
        </button>
      )}
    </div>
  );
};

const WidgetLinks = () => {
  return (
    <div className="flex">
      <LinkButton network="Twitter" />
      <LinkButton network="Farcaster" />
      <LinkButton network="Github" />
    </div>
  );
};

export default WidgetLinks;
