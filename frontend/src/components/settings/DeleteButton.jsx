import { useState } from "react";
import { Button } from "../ui/button";

const DeleteButton = ({ handleDelete }) => {
  const [confirming, setConfirming] = useState(false);

  const handleClick = () => {
    if (confirming) {
      handleDelete(); // perform delete
      setConfirming(false); // reset
    } else {
      setConfirming(true);
      // Automatically reset if user doesn’t confirm in a few seconds
      setTimeout(() => setConfirming(false), 3000);
    }
  };

  return (
    <Button
      className={`${
        confirming ? "bg-yellow-600 hover:bg-yellow-700" : "bg-red-600 hover:bg-red-700"
      } transition-colors`}
      onClick={handleClick}
    >
      {confirming ? "Are you sure?" : "Delete Registered API"}
    </Button>
  );
};

export default DeleteButton;