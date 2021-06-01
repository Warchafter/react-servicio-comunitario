// import React, { useRef } from 'react';

// const FileUploader = ({ onFileSelect }) => {
//     const fileInput = useRef(null)

//     const handleFileInput = (e) => {
//         // handle validations
//         const file = e.target.files[0];
//         if (file.size > 1024) {
//             onFileSelectorError({ error: "El tamaño del archivo no puede exceder más de 1MB" });
//         } else {
//             onFileSelectSuccess(file);
//         }

//         onFileSelect(e.target.file[0])
//     }

//     return (
//         <div className="file-uploader">
//             <input type="file" onChange={handleFileInput} />
//             <button onClick={e => fileInput.current && fileInput.current.click()} className="btn btn-primary" />
//         </div>
//     );
// };