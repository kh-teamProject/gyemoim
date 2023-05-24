const handleFileChange = (event) => {
    const imgControlName = "#ImgPreview";
    const input = event.target;

    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.querySelector(imgControlName).src = e.target.result;
        }
        reader.readAsDataURL(input.files[0]);
    }

    return (
        <>
        </>
    );
}

export default handleFileChange;