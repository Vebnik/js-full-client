const AlertToast = (title: string, description: string, status: "info" | "warning" | "success" | "error" | "loading" | undefined, toast: any): void => {
	toast({
		title,
		description,
		status,
		duration: 1000,
		isClosable: true,
		position: 'top'
	})
};

export default AlertToast;