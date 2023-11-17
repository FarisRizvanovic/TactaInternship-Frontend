const useDragAndDrop = () => {
  const handleOnDrag = (e, itemId) => {
    e.dataTransfer.setData("itemId", itemId);
  };

  const handleOnDrop = (e, shopperId, addItemToShopper) => {
    const itemId = e.dataTransfer.getData("itemId");

    addItemToShopper(shopperId, itemId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  return { handleOnDrag, handleOnDrop, handleDragOver };
};

export default useDragAndDrop;
