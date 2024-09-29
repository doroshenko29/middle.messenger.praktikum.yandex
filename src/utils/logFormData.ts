export default function LogFormData(formData: FormData): void {
	const formDataObj = Object.create({});
	formData.forEach((value, key) => {
		formDataObj[key] = value;
	});
	console.log(formDataObj);
}
