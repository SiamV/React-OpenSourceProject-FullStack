import React from 'react'

const DownloadFileFromServer = () => {

    const downloadEmployeeData = () => {
        fetch('http://localhost:8080/employees/download')
            .then(response => {
                response.blob().then(blob => {
                    let url = window.URL.createObjectURL(blob);
                    let a = document.createElement('a');
                    a.href = url;
                    a.download = 'employees.json';
                    a.click();
                });
                //window.location.href = response.url;
            });
    }

    return (
        <div>
            <h1>Download File using React App</h1>
            <h3>Download Employee Data using Button</h3>
            <button onClick={downloadEmployeeData}>Download</button>
            <p/>
        </div>
    )
}

export default DownloadFileFromServer