import React, {useState} from 'react';

const useForm = (callback) => {
	const [inputs, setInputs] = useState({});
	const handleSubmit = (event) => {
		if (event) {
			event.preventDefault();
		}
		return callback();
	}
	const handleInputChange = (event) => {
		console.log(inputs);
		event.persist();
		setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
	}
	const handleCheckboxChange = (event) => {
		console.log(inputs);
		event.persist();
		setInputs(inputs => ({...inputs, [event.target.name]: event.target.checked}));
	}
	return {
		handleSubmit,
		handleInputChange,
		handleCheckboxChange,
		inputs
	};
}
export default useForm;
