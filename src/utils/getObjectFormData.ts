export default function getObjectFormData<IDto>(formData: FormData): IDto {
	const formDataObj = Object.create({});
	formData.forEach((value, key) => {
		formDataObj[key] = value;
	});
	return formDataObj;
}
