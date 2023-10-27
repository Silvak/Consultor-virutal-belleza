import { useState } from 'react';

function useModal() {
	const [isOpen, setIsOpen] = useState(false);
	const [item, setItem] = useState(null);

	function handleClose() {
		setIsOpen(false);
	}

	function handleOpen(item) {
		setIsOpen(true);
		setItem(item);
	}

	return {
		isOpen,
		handleOpen,
		handleClose,
		item,
	};
}

export default useModal;
