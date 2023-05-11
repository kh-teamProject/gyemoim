const handleRemoveImage = (event) => {
    event.preventDefault();
    const inputFile = document.getElementById("theFile");
    const imgPreview = document.getElementById("ImgPreview");
    inputFile.value = "";
    imgPreview.src = "";
    imgPreview.classList.remove("it");
    document.querySelector(".btn-rmv").classList.remove("rmv");
}

export default handleRemoveImage;